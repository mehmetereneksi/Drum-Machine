const drumPads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');
const powerSwitch = document.getElementById('power-switch');
const powerLabel = document.getElementById('power-label');
const volumeSlider = document.getElementById('volume-slider');
const allAudios = document.querySelectorAll('.clip');

let isPowerOn = true;

allAudios.forEach(audio => {
  audio.volume = volumeSlider.value;
});

powerSwitch.addEventListener('change', function() {
  isPowerOn = this.checked;

  if (isPowerOn) {
    powerLabel.innerText = 'Power: On';
  } else {
    powerLabel.innerText = 'Power: Off';
    display.innerText = '';
  }
});

drumPads.forEach(pad => {
  pad.addEventListener('click', function() {
    if (!isPowerOn) return;

    const audio = this.querySelector('.clip');
    audio.currentTime = 0;
    audio.play();
    display.innerText = this.id;
  });
});

document.addEventListener('keydown', function(event) {
  if (!isPowerOn) return;

  const key = event.key.toUpperCase();  
  const audio = document.getElementById(key);
  
  if (audio) {
    audio.currentTime = 0;
    audio.play();
    const parentPad = audio.parentElement;
    display.innerText = parentPad.id;
  }
});

volumeSlider.addEventListener('input', function() {
  const currentVolume = this.value;

  allAudios.forEach(audio => {
    audio.volume = currentVolume;
  });

  if (isPowerOn) {
    display.innerText = `Volume: ${Math.round(currentVolume * 100)}`;
  }
});

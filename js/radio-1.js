/* Copywrite Dominik Honzak 2023 */

const socket = io();
const player = document.getElementById('player');
const joinButton = document.getElementById('joinButton');
const bg = document.getElementById('bg');
const musicName = document.getElementById('Music');
const artistName = document.getElementById('Artist');
const listener = document.getElementById('listen');
const center = document.getElementById('center');
const audio = document.getElementById('audio');
const audioControl = document.getElementById('audioControl');
const loadSpeed = document.getElementById('loadSpeed');
let playerIs = false;
let volumeOpen = false;
let timer = 0;
let refreshInterval = setInterval(function(){timer++;}, 1);

socket.emit('retrieveMusic');

const volume = function() {
  let vol = document.getElementById("slide").value;
  localStorage.setItem('Volume',''+vol+'');
  player.volume = (vol/100);
};
const openVolume = function() {
  if(volumeOpen) {
    center.style.display = "block";
    audioControl.style.display = "none";
    audio.innerHTML = '<i class="fa fa-volume-up"></i>';
    volumeOpen = false;
  }
  else {
    center.style.display = "none";
    audioControl.style.display = "block";
    audio.innerHTML = "Go Back";
    volumeOpen = true;
  }
};
const loadMusic = function({ currentSong, currentSongTime, currentSongName, currentSongArtist, currentSongImg }) {
  player.src = currentSong;
  if (player.duration > (currentSongTime+Math.round((timer/1000)))) {
    player.currentTime = currentSongTime+Math.round((timer/1000));
  }
  else {
    player.currentTime = currentSongTime;
  }
  bg.style.background = "url('"+currentSongImg+"') fixed no-repeat center center";
  bg.style.backgroundSize = "cover";
  bg.style.filter = "blur(15px)";
  joinButton.innerHTML = '<i class="fa fa-pause"></i>';
  artistName.innerHTML = currentSongArtist;
  musicName.innerHTML = currentSongName;
  player.play();
  playerIs = true;
  
};
const pauseMusic = function() {
  bg.style.filter = "blur(15px) grayscale(100%)";
  joinButton.innerHTML = '<i class="fa fa-play"></i>';
  player.pause();
  playerIs = false;
};
socket.on('songMusic', ({ currentSong, currentSongTime, currentSongName, currentSongArtist, currentSongImg }) => {
  if (!playerIs) {
    loadMusic({ currentSong, currentSongTime, currentSongName, currentSongArtist, currentSongImg });
  }
});
socket.on('nextMusic', ({ currentSong, currentSongTime, currentSongName, currentSongArtist, currentSongImg }) => {
  if (playerIs) {
    loadMusic({ currentSong, currentSongTime, currentSongName, currentSongArtist, currentSongImg });
  }
});
socket.on('retrieveMusic', ({ currentSong, currentSongTime, currentSongName, currentSongArtist, currentSongImg }) => {
    player.src = currentSong;
    player.currentTime = currentSongTime;
    bg.style.background = "url('"+currentSongImg+"') fixed no-repeat center center";
    bg.style.backgroundSize = "cover";
    bg.style.filter = "blur(15px) grayscale(100%)";
    if (!(localStorage.getItem('Volume') === null)) {
      let vol = parseInt(localStorage.getItem('Volume'));
      document.getElementById("slide").value = vol;
      volume();
    }
    clearInterval(refreshInterval);
    loadSpeed.innerHTML = timer;
});
socket.on('listenMusic', (listeners) => {
    listener.innerHTML = listeners+' visitors'
});

joinButton.addEventListener('click', () => {
  if (playerIs) {
    pauseMusic();
  }
  else { 
    socket.emit('joinMusic');
  }
});

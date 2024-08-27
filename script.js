// Initialize variables
let songIndex = 0;
let audioElement = new Audio(); // Audio element
let masterPlay = document.getElementById("masterPlay"); // Master play/pause button
let myProgressBar = document.getElementById("myProgressBar"); // Progress bar
let volumeSlider = document.getElementById("volumeSlider"); // Volume slider
let gif = document.getElementById("gif"); // Placeholder for gif
let masterSongName = document.getElementById("masterSongName"); // Display song name
let songItems = Array.from(document.getElementsByClassName("songItem")); // Array of song items
let volumeIcon = document.getElementById("volumeIcon"); // Volume icon element
let shuffleButton = document.getElementById("shuffle"); // Shuffle button
let isShuffle = false; // Shuffle mode flag
let currentTimeElem = document.getElementById("currentTime"); // Current time display
let totalDurationElem = document.getElementById("totalDuration"); // Total duration display

// Array of songs
let songs = [
  { songName: "Bhole Shankar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Cheques - Shubh", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Chorni - Sidhu", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Soulmate", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Suniyan Suniyan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "God Damn - Karan Aujla", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "One-Love-Blue", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Panchayat Title", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Tu Hai - Darshan Raval", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Tauba Tauba - Bad Newz", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// Function to initialize song items
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Function to format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to play a song
function playSong(index) {
  songIndex = index;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  gif.style.opacity = 1;

  // Update icons for all songs
  songItems.forEach((item, idx) => {
    if (idx === songIndex) {
      item.getElementsByClassName("songItemPlay")[0].classList.remove("fa-circle-play");
      item.getElementsByClassName("songItemPlay")[0].classList.add("fa-circle-pause");
      item.classList.add("active"); // Add active class to current song item
    } else {
      item.getElementsByClassName("songItemPlay")[0].classList.remove("fa-circle-pause");
      item.getElementsByClassName("songItemPlay")[0].classList.add("fa-circle-play");
      item.classList.remove("active"); // Remove active class from other song items
    }
  });
}

// Function to pause the current song
function pauseSong() {
  audioElement.pause();
  masterPlay.classList.remove("fa-circle-pause");
  masterPlay.classList.add("fa-circle-play");
  gif.style.opacity = 0;
  songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove("fa-circle-pause");
  songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add("fa-circle-play");
  songItems[songIndex].classList.remove("active"); // Remove active class from current song item
}

// Function to play next song
function playNextSong() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  playSong(songIndex);
}

// Function to play previous song
function playPreviousSong() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
  }
  playSong(songIndex);
}

// Function to shuffle the playlist
function shuffleSongs() {
  isShuffle = !isShuffle;
  shuffleButton.classList.toggle("active", isShuffle);
}

// Event listeners for song item play buttons
songItems.forEach((element, i) => {
  element.addEventListener("click", () => {
    if (i === songIndex && !audioElement.paused) {
      pauseSong();
    } else {
      playSong(i);
    }
  });
});

// Event listener for master play/pause button
masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    playSong(songIndex);
  } else {
    pauseSong();
  }
});

// Event listener for next song button
document.getElementById("next").addEventListener("click", () => {
  playNextSong();
});

// Event listener for previous song button
document.getElementById("previous").addEventListener("click", () => {
  playPreviousSong();
});

// Event listener for shuffle button
shuffleButton.addEventListener("click", shuffleSongs);

// Update progress bar and time display based on audio current time
audioElement.addEventListener("timeupdate", () => {
  if (!isNaN(audioElement.duration)) {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;

    // Update time displays
    currentTimeElem.innerText = formatTime(audioElement.currentTime);
    totalDurationElem.innerText = formatTime(audioElement.duration);
  }
});

// Change audio current time based on progress bar change
myProgressBar.addEventListener("input", () => {
  if (!isNaN(audioElement.duration)) {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
  }
});

// Volume control
volumeSlider.addEventListener("input", () => {
  audioElement.volume = volumeSlider.value / 100;
  if (audioElement.volume === 0) {
    audioElement.muted = true;
  } else {
    audioElement.muted = false;
  }
  updateVolumeIcon(); // Update the icon based on slider position
});

// Function to update the volume icon
function updateVolumeIcon() {
  if (audioElement.muted || audioElement.volume === 0) {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.remove("fa-volume-down");
    volumeIcon.classList.add("fa-volume-xmark"); // Mute icon
  } else if (audioElement.volume <= 0.5) {
    volumeIcon.classList.remove("fa-volume-high");
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.add("fa-volume-down"); // Low volume icon
  } else {
    volumeIcon.classList.remove("fa-volume-xmark");
    volumeIcon.classList.remove("fa-volume-down");
    volumeIcon.classList.add("fa-volume-high"); // High volume icon
  }
}

// Event listener for volume icon click
volumeIcon.addEventListener("click", () => {
  if (audioElement.muted) {
    audioElement.muted = false;
    volumeSlider.value = audioElement.volume * 100;
  } else {
    audioElement.muted = true;
    volumeSlider.value = 0;
  }
  updateVolumeIcon(); // Update the icon based on mute state
});

// Initial setup
updateVolumeIcon(); // Set

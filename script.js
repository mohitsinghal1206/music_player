// Initialize variables
let songIndex = 0;
let audioElement = new Audio(); // Audio element
let masterPlay = document.getElementById('masterPlay'); // Master play/pause button
let myProgressBar = document.getElementById('myProgressBar'); // Progress bar
let gif = document.getElementById('gif'); // Placeholder for gif
let masterSongName = document.getElementById('masterSongName'); // Display song name
let songItems = Array.from(document.getElementsByClassName('songItem')); // Array of song items

// Array of songs
let songs = [
  { songName: "Bhole Shankar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Cheques - Shubh", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Chorni - Sidhu MooseWala", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Soulmate", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Suniyan Suniyan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "God Damn - Ek Tha Raja", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "One-Love-Blue", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Panchayat Title", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Tu Hai - Darshan Raval", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Tauba Tauba - Bad Newz", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

// Function to initialize song items
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

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
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

// Event listener for previous song button
document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

// Update progress bar based on audio current time
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Change audio current time based on progress bar change
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

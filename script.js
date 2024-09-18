document.addEventListener("DOMContentLoaded", function () {
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
  let totalDurationElem = document.getElementById("durationTime"); // Total duration display

  // Array of songs
  let songs = [
      { songName: "Bhole Shankar", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
      { songName: "Cheques - Shubh", filePath: "songs/2.mp3", coverPath: "covers/1.jpg" },
      { songName: "Chorni - Sidhu MooseWala", filePath: "songs/3.mp3", coverPath: "covers/1.jpg"},
      { songName: "Soulmate", filePath: "songs/4.mp3", coverPath: "covers/1.jpg" },
      { songName: "Suniyan Suniyan", filePath: "songs/5.mp3", coverPath: "covers/1.jpg"},
      { songName: "God Damn - Ek Tha Raja", filePath: "songs/6.mp3", coverPath: "covers/1.jpg"},
      { songName: "One-Love-Blue", filePath: "songs/7.mp3", coverPath: "covers/1.jpg"},
      { songName: "Panchayat Title", filePath: "songs/8.mp3", coverPath: "covers/1.jpg"},
      { songName: "Tu Hai - Darshan Raval", filePath: "songs/9.mp3", coverPath: "covers/1.jpg"},
      { songName: "Tauba Tauba - Bad Newz", filePath: "songs/10.mp3", coverPath: "covers/1.jpg"}
  ];

  // Initialize song items
  songItems.forEach((element, i) => {
      element.getElementsByTagName("img")[0].src = songs[i].coverPath;
      element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
      element.getElementsByClassName("timestamp")[0].innerText = formatTime(songs[i].duration || 0);
  });

  // Format time in MM:SS format
  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Load and play song
  function loadSong(index) {
      songIndex = index;
      audioElement.src = songs[songIndex].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      gif.style.opacity = 1;

      songItems.forEach((item, idx) => {
          if (idx === songIndex) {
              item.getElementsByClassName("songItemPlay")[0].classList.remove("fa-circle-play");
              item.getElementsByClassName("songItemPlay")[0].classList.add("fa-circle-pause");
              item.classList.add("active");
          } else {
              item.getElementsByClassName("songItemPlay")[0].classList.remove("fa-circle-pause");
              item.getElementsByClassName("songItemPlay")[0].classList.add("fa-circle-play");
              item.classList.remove("active");
          }
      });
  }

  // Play/pause functionality
  function playPause() {
      if (audioElement.paused) {
          loadSong(songIndex);
      } else {
          audioElement.pause();
          masterPlay.classList.remove("fa-circle-pause");
          masterPlay.classList.add("fa-circle-play");
          gif.style.opacity = 0;
          songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove("fa-circle-pause");
          songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add("fa-circle-play");
          songItems[songIndex].classList.remove("active");
      }
  }

  // Play next song
  function playNextSong() {
      if (isShuffle) {
          songIndex = Math.floor(Math.random() * songs.length);
      } else {
          songIndex = (songIndex + 1) % songs.length;
      }
      loadSong(songIndex);
  }

  // Play previous song
  function playPreviousSong() {
      if (isShuffle) {
          songIndex = Math.floor(Math.random() * songs.length);
      } else {
          songIndex = (songIndex - 1 + songs.length) % songs.length;
      }
      loadSong(songIndex);
  }

  // Shuffle functionality
  function shuffleSongs() {
      isShuffle = !isShuffle;
      shuffleButton.classList.toggle("active", isShuffle);
  }

  // Update progress bar and time displays
  function updateProgress() {
      if (!isNaN(audioElement.duration)) {
          let progress = (audioElement.currentTime / audioElement.duration) * 100;
          myProgressBar.value = progress;
          currentTimeElem.innerText = formatTime(audioElement.currentTime);
          totalDurationElem.innerText = formatTime(audioElement.duration);
      }
  }

  // Seek functionality
  function seek(event) {
      const seekTime = (event.target.value / 100) * audioElement.duration;
      audioElement.currentTime = seekTime;
  }

  // Volume control
  function changeVolume() {
      audioElement.volume = volumeSlider.value / 100;
      audioElement.muted = audioElement.volume === 0;
      updateVolumeIcon();
  }

  // Update volume icon
  function updateVolumeIcon() {
      if (audioElement.muted || audioElement.volume === 0) {
          volumeIcon.classList.remove("fa-volume-high", "fa-volume-down");
          volumeIcon.classList.add("fa-volume-xmark");
      } else if (audioElement.volume <= 0.5) {
          volumeIcon.classList.remove("fa-volume-high", "fa-volume-xmark");
          volumeIcon.classList.add("fa-volume-down");
      } else {
          volumeIcon.classList.remove("fa-volume-xmark", "fa-volume-down");
          volumeIcon.classList.add("fa-volume-high");
      }
  }

  // Event listeners
  songItems.forEach((element, i) => {
      element.addEventListener("click", () => {
          if (i === songIndex && !audioElement.paused) {
              playPause();
          } else {
              loadSong(i);
          }
      });
  });

  masterPlay.addEventListener("click", playPause);
  document.getElementById("next").addEventListener("click", playNextSong);
  document.getElementById("previous").addEventListener("click", playPreviousSong);
  shuffleButton.addEventListener("click", shuffleSongs);

  myProgressBar.addEventListener("input", seek);
  volumeSlider.addEventListener("input", changeVolume);

  volumeIcon.addEventListener("click", () => {
      audioElement.muted = !audioElement.muted;
      volumeSlider.value = audioElement.muted ? 0 : audioElement.volume * 100;
      updateVolumeIcon();
  });

  audioElement.addEventListener("timeupdate", updateProgress);
  audioElement.addEventListener("ended", playNextSong);

  // Initial setup
  updateVolumeIcon();
});

console.log("Welcome to spotify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
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
  { songName: "Tauba Tauba - Bad Newz", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];
songItems.forEach((element, i) => {
  console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// audioElement.play();

//handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");

  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgressBar.value = progress;
});
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
  //formula created from upper line
});

console.log("Welcome to spotify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  { songName: "prada1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "prada2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "prada3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "prada4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "prada5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "prada6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "prada7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "prada8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "prada9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "prada10", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
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

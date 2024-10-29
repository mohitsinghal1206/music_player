document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables
    let songIndex = 0;
    let audioElement = new Audio();
    let masterPlay = document.getElementById("masterPlay");
    let volumeSlider = document.getElementById("volumeSlider");
    let masterSongName = document.getElementById("masterSongName");
    let songItems = Array.from(document.getElementsByClassName("songItem"));
    let volumeIcon = document.getElementById("volumeIcon");
    let shuffleButton = document.getElementById("shuffle");
    let repeatButton = document.getElementById("repeat");
    let repeatState = 0; // 0 = no repeat, 1 = repeat current song, 2 = repeat playlist
    let isShuffle = false;
    let previousButton = document.getElementById("previous");
    let nextButton = document.getElementById("next");
    let backgroundVideo = document.getElementById("bgVideo");
    let toggleVideoButton = document.getElementById("toggleVideo");
    let videoPlayIcon = document.getElementById("videoPlayIcon");
    let videoPauseIcon = document.getElementById("videoPauseIcon");
    let progressBar = document.getElementById("progressBar");
    let progressContainer = document.getElementById("progressContainer");
    let currentTimeElement = document.getElementById("currentTime");
    let totalDurationElement = document.getElementById("totalDuration");

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

    function loadSong(index) {
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;

        // Only reset currentTime if loading a new song
        audioElement.currentTime = 0;
        audioElement.play();
        updatePlayButtonStyles();
        updateActiveSong();

        // Scroll to the active song item
        songItems[songIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Update total duration here after loading the song
        audioElement.addEventListener("loadedmetadata", function () {
            let totalDuration = formatTime(audioElement.duration);
            totalDurationElement.innerText = totalDuration;
        });
    }

    // Format time from seconds to MM:SS
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }

    masterPlay.addEventListener("click", function () {
        if (audioElement.paused) {
            loadSong(songIndex); // Load song only if it's paused
        } else {
            audioElement.pause();
            updatePlayButtonStyles();
        }
    });

    // Update current time and progress bar as the song plays
    audioElement.addEventListener("timeupdate", function () {
        let currentTime = formatTime(audioElement.currentTime);
        currentTimeElement.innerText = currentTime;

        let progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.style.width = progressPercent + "%";
    });

    // Seek functionality for progress bar
    progressContainer.addEventListener("click", function (event) {
        const width = progressContainer.clientWidth;
        const clickX = event.offsetX;
        const duration = audioElement.duration;

        audioElement.currentTime = (clickX / width) * duration;
    });

    // Play the next song
    function playNextSong() {
        if (isShuffle) {
            songIndex = Math.floor(Math.random() * songs.length);
        } else {
            songIndex = (songIndex + 1) % songs.length;
        }
        loadSong(songIndex);
    }

    // Play the previous song
    function playPreviousSong() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songIndex);
    }

    // Event listeners for next and previous buttons
    nextButton.addEventListener("click", playNextSong);
    previousButton.addEventListener("click", playPreviousSong);

    // Shuffle functionality
    shuffleButton.addEventListener("click", function () {
        isShuffle = !isShuffle;
        shuffleButton.classList.toggle("active", isShuffle);
        shuffleButton.classList.toggle("shuffled", isShuffle);
        console.log("Shuffle state:", isShuffle);
    });

    // Cycle repeat states
    repeatButton.addEventListener("click", function () {
        repeatState = (repeatState + 1) % 3;
        updateRepeatButton();
        console.log("Repeat state changed:", repeatState);
    });

    // Update repeat button icon based on repeat state
    function updateRepeatButton() {
        repeatButton.classList.remove("no-repeat", "repeat-one", "repeat-all");
        if (repeatState === 1) {
            repeatButton.classList.add("repeat-one");
        } else if (repeatState === 2) {
            repeatButton.classList.add("repeat-all");
        } else {
            repeatButton.classList.add("no-repeat");
        }
    }

    // Volume control
    volumeSlider.addEventListener("input", function () {
        audioElement.volume = volumeSlider.value / 100;
        audioElement.muted = audioElement.volume === 0;
        updateVolumeIcon();
    });

    // Update volume icon based on volume
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

    // Handle song end event based on repeat state
    audioElement.addEventListener("ended", function () {
        console.log("Song ended, repeatState:", repeatState);
        if (repeatState === 1) {
            loadSong(songIndex);
        } else if (repeatState === 2) {
            playNextSong();
        } else {
            playNextSong();
        }
    });

    // Toggle background video play/pause functionality
    toggleVideoButton.addEventListener("click", function () {
        if (backgroundVideo.paused) {
            backgroundVideo.play();
            videoPlayIcon.style.display = "none";
            videoPauseIcon.style.display = "inline";
            toggleVideoButton.style.backgroundColor = "#28a745"; // Green background when playing
            toggleVideoButton.style.color = "#fff"; // White text when playing
            toggleVideoButton.innerText = "Pause BG Effect";
        } else {
            backgroundVideo.pause();
            videoPlayIcon.style.display = "inline";
            videoPauseIcon.style.display = "none";
            toggleVideoButton.style.backgroundColor = "#dc3545"; // Red background when paused
            toggleVideoButton.style.color = "#fff"; // White text when paused
            toggleVideoButton.innerText = "Play BG Effect";
        }
    });

    // Event listener for song items
    songItems.forEach((element, index) => {
        element.addEventListener("click", () => {
            loadSong(index);
            updatePlayButtonStyles();
        });
    });

    // Function to update play button styles
    function updatePlayButtonStyles() {
        const playButtonIcon = audioElement.paused ? "fa-play" : "fa-pause";
        masterPlay.classList.toggle("fa-play", playButtonIcon === "fa-play");
        masterPlay.classList.toggle("fa-pause", playButtonIcon === "fa-pause");
    }

    // Function to highlight the active song
    function updateActiveSong() {
        songItems.forEach((item, index) => {
            item.classList.toggle("active", index === songIndex);
        });
    }
});

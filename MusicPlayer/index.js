// getting the array of musiclist
let allMusic = [
  {
    name: "Broken-Hearted-Girl",
    artist: "Beyonce",
    img: "beyonce.PNG",
    src: "Broken-Hearted Girl.mp3",
  },
  {
    name: "AirPlane",
    artist: "Fireboy_DML",
    img: "fireboy.PNG",
    src: "fireboy.mp3",
  },
  {
    name: "Angel",
    artist: "Halle",
    img: "halle.PNG",
    src: "halle.mp3",
  },
  {
    name: "Journey of our lives",
    artist: "Johnny_Drille",
    img: "johnny.PNG",
    src: "jonny.mp3",
  },
];

const container = document.querySelector(".main_container");
const musicImage = document.querySelector(".music_image img");
const musicTittle = document.querySelector(".song-section .name");
const musicArtist = document.querySelector(".song-section .artist");
const audio = document.querySelector("#audio-play");
const playB = document.querySelector(".play");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");
const progressBar = document.querySelector(".control_progress");
const progressArea = document.querySelector(".progress-area");
let musicI = 1;

// loading song details into the dom
sondLoads(musicI);

// creating a function of sondLoads and also updating song details

function sondLoads(musicNumb) {
  musicTittle.innerText = allMusic[musicNumb - 1].name;
  musicArtist.innerText = allMusic[musicNumb - 1].artist;
  musicImage.src = `images/${allMusic[musicNumb - 1].img}`;
  audio.src = `music/${allMusic[musicNumb - 1].src}`;
}

playB.addEventListener("click", () => {
  const isPlaying = container.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
  // console.log("i love coding")
  // alert("i love coding")
});

// function pauseSong(){
//     container.classList.add('play');
//     playB.querySelector(i.fas).classList.remove('fa-play')
//     playB.querySelector(i.fas).classList.add('fa-pause')

//     audio.play()
// }
function playSong() {
  container.classList.add("play");
  // playB.querySelector('i').innerText = "fa-pause"
  playB.querySelector("i").classList.remove("fa-play");
  playB.querySelector("i").classList.add("fa-pause");
  audio.play();
}
function pauseSong() {
  container.classList.remove("play");
  playB.querySelector("i").classList.add("fa-play");
  playB.querySelector("i").classList.remove("fa-pause");
  audio.pause();
}

// function nextSong(){
//     // musicI++;
//     // musicI > allMusic.length ? musicI = 1 : musicI = musicI
//     // playSong()
// }
function nextSong() {
  musicI++;
  musicI > allMusic.length ? (musicI = 1) : (musicI = musicI);
  sondLoads(musicI);
  playSong();
}

function nextSong() {
  musicI--;
  musicI < 1 ? (musicI = allMusic.length) : (musicI = musicI);
  sondLoads(musicI);
  playSong();
}
nextButton.addEventListener("click", () => {
  // console.log("i love to code")
  nextSong();
});
prevButton.addEventListener("click", () => {
  // console.log("i love to code")
  // prevSong()
  nextSong();
});

audio.addEventListener("timeupdate", (e) => {
//   console.log(audio);
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width =`${progressWidth}%`;

let musicCurrentTime = container.querySelector(".current-time");
 musicDuration = container.querySelector(".max-duration");
  audio.addEventListener("loadeddata", () => {
    let musicLengthDuration = audio.duration;
    let totalMin = Math.floor(musicLengthDuration / 60);
    let totalSec = Math.floor(musicLengthDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText =`${totalMin}:${totalSec}`;
    console.log(totalSec)
    // console.log(musicDuration)
  });
    
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);

  if(currentSec < 10){
      currentSec = `0${currentSec}`
  }
  musicCurrentTime.innerText =`${currentMin}:${currentSec}`
});

progressArea.addEventListener("click", (e) =>{
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = audio.duration;
    audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playSong();
})
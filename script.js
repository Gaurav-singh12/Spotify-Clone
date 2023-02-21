console.log("Welcome to Spotify")
// Initialize variables
let SongIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [   
    {songName: 'Let me Love You', filepath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: 'Bhula Dena Mujhe', filepath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: 'Tera  Hi Bas Hona', filepath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: 'Tum Ho Mera Pyaar', filepath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: 'Sanam Teri Kasam', filepath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: 'Blue  Eyes', filepath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: 'Baarish', filepath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: 'Ek Raat', filepath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: 'Tere Sang Yara', filepath: "songs/9.mp3", coverPath: "covers/9.jpg"},
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate',()=>{
    //Update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        SongIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${SongIndex+1}.mp3`;
        masterSongName.innerText = songs[SongIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(SongIndex>=8){
        SongIndex = 0;
    }
    else{
        SongIndex +=1;
    }
    audioElement.src = `songs/${SongIndex+1}.mp3`;
    masterSongName.innerText = songs[SongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(SongIndex<=0){
        SongIndex = 0;
    }
    else{
        SongIndex -=1;
    }
    audioElement.src = `songs/${SongIndex+1}.mp3`;
    masterSongName.innerText = songs[SongIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

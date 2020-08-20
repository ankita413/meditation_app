/*jslint es6
*/
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    const sound = document.querySelectorAll(".sound-picker button");
    const timeDisplay = document.querySelector(".time-display");
    const outlineLength = outline.getTotalLength();
const timeselect  = document.querySelectorAll(".time-select");

    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    

// select diff sounds

sound.forEach(sound =>{
    sound.addEventListener('click',function(){
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkifPlaying(song);
    });
});
// for playing sound when clicking the button
play.addEventListener('click',() => {
checkifPlaying(song); 
    
});

//select diff sounds
timeselect.forEach(option =>{
    option.addEventListener('click',function(){
        duration = this.getAttribute("data-time");
        timeDisplay.textContent = `${Math.floor(duration/60)}:${Math.floor(duration%60)}`;
        
    });
});
// function to play and pause the music
const checkifPlaying = song =>{
  if(song.paused)
      {
          song.play();
          video.play();
          play.src='./svg/pause.svg';
      }
    else
        {
            song.pause();
            video.pause();
            play.src='./svg/play.svg';
        }
};
//Animating the circlefun
song.ontimeupdate = function() {
let currTime = song.currentTime;
    console.log(currTime);
let elapsed = duration - currTime;
let second = Math.floor(elapsed %60);
let minute = Math.floor(elapsed / 60);
    timeDisplay.textContent = `${minute}:${second}`;
    let progress = outlineLength - (currTime/duration)*outlineLength;
    outline.style.strokeDashoffset = progress;
    
    //countdown animation
  if(currTime >= duration)
      {
          song.pause();
          song.currentTime = 0;
          play.src = './svg/pause.svg';
          video.pause();
      }
};
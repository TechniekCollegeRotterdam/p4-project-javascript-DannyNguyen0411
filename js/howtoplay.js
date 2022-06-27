const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

/* Creating a rectangle that is the size of the canvas. */
c.fillRect(0, 0, canvas.width, canvas.height)


/* Setting the gravity of the game. */
const gravity = 0.7

//background music
/* Creating a new audio object and setting the volume to 0.9. It is also playing the audio. */


let bg_SOUND=new Audio('music/japaneseSans-Theme.mp3');
bg_SOUND.volume=0.7;

bg_SOUND.play();


let back = document.querySelector("#back");

back.addEventListener('click', quit);

function quit(){
    window.location.href = "start.html";
  }
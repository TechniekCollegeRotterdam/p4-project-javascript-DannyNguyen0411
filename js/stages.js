const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

/* Creating a rectangle that is the size of the canvas. */
c.fillRect(0, 0, canvas.width, canvas.height)

//startscreen background music
let bg_SOUND=new Audio('music/Great-Japanese-Empire.mp3');
bg_SOUND.volume=0.7;

bg_SOUND.play();

/* A function that is checking if the player's attack box is colliding with the enemy's attack box. */
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
      rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
  }
  
/**
 * If the player's health is equal to the enemy's health, then display a tie. If the player's health is
 * greater than the enemy's health, then display player 1 wins. If the player's health is less than the
 * enemy's health, then display player 2 wins.
 */
  function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if (player.health < enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }
  }
  
/* This is a function that is decreasing the timer by 1 every second. */
  let timer = 90
  let timerId
  function decreaseTimer() {
    if (timer > 0) {
      timerId = setTimeout(decreaseTimer, 1000)
      timer--
      document.querySelector('#timer').innerHTML = timer
    }
  
    /* Calling the determineWinner function. */
    if (timer === 0) {
      determineWinner({ player, enemy, timerId })
    }
  }

    //This is for the pause screen 3:14 start programming pause screen
setTimeout(function(){ window.scrollTo(0, 0); }, 500);


/* Creating a new variable called world and setting it to the element with the id of boxDiv. */
let world = document.querySelector("#boxDiv");
let stage1 = document.querySelector("#stage1");
let stage2 = document.querySelector("#stage2");
let stage3 = document.querySelector("#stage3");
let stage4 = document.querySelector("#stage4");
let stage5 = document.querySelector("#stage5");
let back = document.querySelector("#back");
let x;
let y;
let isPaused = false;
let isPlay = true;

document.addEventListener('mousemove', runGame);
stage1.addEventListener('click', level1);
stage2.addEventListener('click', level2)
stage3.addEventListener('click', level3);
stage4.addEventListener('click', level4);
stage5.addEventListener('click', level5);
back.addEventListener('click', quit);



function level1()
{
  window.location.href = "index.html";
}

/**
 * It resumes the game by setting the isPaused variable to false, hiding the cursor, hiding the pause
 * menu, and calling the hidePauseMenu function.
 */
/**
 * It resumes the game by setting the isPaused variable to false, hiding the cursor, hiding the pause
 * menu, and calling the hidePauseMenu function.
 */
function level2()
{
  window.location.href = "start.html";
}

/**
 * When the user clicks the button, the page will reload.
 */
function level3(){
  window.location.href = "start.html";
}

/* Playing the sound. */
function level4(){
  window.location.href = "start.html";
}

function level5(){
  window.location.href = "start.html";
}

function quit(){
  window.location.href = "start.html";
}



/* Making the player and enemy move. */
function runGame(e)
{}


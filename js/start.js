const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

/* Creating a rectangle that is the size of the canvas. */
c.fillRect(0, 0, canvas.width, canvas.height)

//startscreen background music
let bg_SOUND=new Audio('music/kokushibo-theme.mp3');
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
let pauseMenu = document.querySelector("#pauseMenu");
let resumeButton = document.querySelector("#resumeButton");
let refreshButton = document.querySelector("#refreshButton");
let amongus = document.querySelector("#amongus");
let playsound = document.querySelector("#playsound");
let x;
let y;
let isPaused = false;
let isPlay = true;

document.addEventListener('mousemove', runGame);
resumeButton.addEventListener('click', resumeGame);
refreshButton.addEventListener('click', reloadGame)
amongus.addEventListener('click', playSound);
playsound.addEventListener('click', playSound2);



function pauseGame()
{
  isPaused = true;
  document.body.style.cursor = "context-menu";
  pauseMenu.style.visibility = "visible";
  showPauseMenu();
}

/**
 * It resumes the game by setting the isPaused variable to false, hiding the cursor, hiding the pause
 * menu, and calling the hidePauseMenu function.
 */
/**
 * It resumes the game by setting the isPaused variable to false, hiding the cursor, hiding the pause
 * menu, and calling the hidePauseMenu function.
 */
function resumeGame()
{
    window.location.href = "index.html";
}

/**
 * When the user clicks the button, the page will reload.
 */
function reloadGame(){
  window.location.href = "stages.html";
}

/* Playing the sound. */
function playSound(){
  let bg_SOUND=new Audio('music/amongus.mp3');
  bg_SOUND.volume=0.9;
                         
  bg_SOUND.play();
}


/**
 * When the user clicks on the button, the browser will go to the xedni.html page.
 */
function playSound2(){
  let bg_SOUND=new Audio('music/amongus.mp3');
  bg_SOUND.volume=0.9;
                         
  bg_SOUND.play();
}




/* Making the player and enemy move. */
function runGame(e)
{}


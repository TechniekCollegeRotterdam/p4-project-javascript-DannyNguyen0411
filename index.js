const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

/* Setting the gravity of the game. */
const gravity = 0.7

//background music
/* Creating a new audio object and setting the volume to 0.5. It is also playing the audio. */
let bg_SOUND=new Audio('music/bigchungus.mp3');
bg_SOUND.volume=0.5;
                       
bg_SOUND.play();


/* Creating a new sprite object for the background. */
const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/japanautumn.png' 
})

/* Creating a new sprite object for the shop */
const shop = new Sprite({
  position: {
    x: 400,
    y: 128
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6
})


const player = new Fighter({
/* Setting the position, velocity, and offset of the player. */
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 100
  },
  offset: {
    x: 100,
    y: 0
  },
/* Setting the image source, the number of frames, the scale, and the offset of the image. */
  imageSrc: './img/Martial Hero/Sprites/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 200,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/Martial Hero/Sprites/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/Martial Hero/Sprites/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/Martial Hero/Sprites/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/Martial Hero/Sprites/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/Martial Hero/Sprites/Attack1.png',
      framesMax: 6
    },
    attack2: {
      imageSrc: './img/Martial Hero/Sprites/Attack2.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/Martial Hero/Sprites/Take Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/Martial Hero/Sprites/Death.png',
      framesMax: 6
    }
  },
 /* Creating a box that is used to detect if the player is attacking the enemy. */
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

const enemy = new Fighter({
  position: {
    x: 900,
    y: 100
  },
  velocity: {
    x: 0,
    y: 100
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/Martial Hero 2/Sprites/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
/* Creating a new object called sprites. */
  sprites: {
    idle: {
      imageSrc: './img/Martial Hero 2/Sprites/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/Martial Hero 2/Sprites/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/Martial Hero 2/Sprites/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/Martial Hero 2/Sprites/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/Martial Hero 2/Sprites/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/Martial Hero 2/Sprites/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/Martial Hero 2/Sprites/Death.png',
      framesMax: 7
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})

console.log(player)

/* Creating a new object called keys. It is also creating a new object called a, d, ArrowRight, and
ArrowLeft. It is also creating a new property called pressed and setting it to false. */
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
}

decreaseTimer()

function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  enemy.update()

  player.velocity.x = 0
  enemy.velocity.x = 0

  // player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
    enemy.switchSprite('run')
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
    enemy.switchSprite('run')
  } else {
    enemy.switchSprite('idle')
  }

  // jumping
  
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
  }

  // detect for collision & enemy gets hit
  
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit()
    player.isAttacking = false

    /* A function that is part of the GSAP library. It is used to animate the width of the enemy's
    health bar. */
    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit()
    enemy.isAttacking = false

   /* A function that is part of the GSAP library. It is used to animate the width of the enemy's
   health bar. */
    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
}

animate()

window.addEventListener('keydown', (event) => {
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        player.velocity.y = -20
        break
        case ' ':
          player.attack()
          break
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        enemy.velocity.y = -20
        break
      case 'ArrowDown':
        enemy.attack()

        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
  }
})


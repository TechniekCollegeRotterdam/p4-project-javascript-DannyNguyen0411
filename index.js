/* Selecting the canvas element from the HTML document. */
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

/** The total height and width of the canvas* */
canvas.width = 1024;
canvas.height = 576;

/* Filling the rectangle with the color black. */
c.fillRect(0, 0, canvas.width, canvas.height)

/* The gravity of the player. */
const gravity = 0.7;

/* Creating a class called Sprite. */
class Sprite {
    constructor({
        position,
        velocity,
        color = 'red'
    }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50,
        }
        this.color = color;
    }

    draw() {
        //Drawing for the player, the position and the size  
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, 50, this.height)

        // attack box
        c.fillStyle = 'green';
        c.fillRect(this.attackBox.position.x,
             this.attackBox.position.y, 
             this.attackBox.width, 
             this.attackBox.height)
    }

    /* Drawing the player and the enemy. */
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        /* Checking if the player is touching the bottom of the canvas. If in the if-statement the code are equal to each other, the player and the enemy will not fall into the bottom.*/

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            /* Adding the gravity to the velocity of the player, so they can stand on the bottom. */
            this.velocity.y += gravity;
        };
    }
}

/* Creating a Player of the Sprite class. */
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})



/** Creating a enemy of the Sprite Class */
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue'
})

/* Creating a object called keys. */
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
    },
}

/* A function that is called when the player is touching the bottom of the canvas. */
function animate() {
    window.requestAnimationFrame(animate)
    /* Filling the canvas. */
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    /* Stopping the player and enemy from moving forever. */
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
    }

    //enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    }
}
    //detect for collision
    if (player.attackBox.position.x + player.attackBox. width >= enemy.position.x) {
        console.log('go');
    }


animate()

//This code allows the player to move.
window.addEventListener('keydown', () => {
    console.log(event.key);
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
            //This will allow the player move to the left.
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
            /* Allowing the player to jump. */
        case 'w':
            player.velocity.y = -20;
            break;


            /* Allowing the enemy to move to the right. */
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
            //This will allow the enemy move to the left.
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
            /* Allowing the enemy to jump. */
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
    }
})

//This code will stop the player moving forever, when you release the 'd'.
window.addEventListener('keyup', () => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;

            /* Allowing the player to move to the left. */
        case 'a':
            keys.a.pressed = false;
            break;
    }
    //enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;

            /* Allowing the player to move to the left. */
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;

    }
})
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Enemy initial location
    this.x = x;
    this.y = y;
    // Enemy speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Handles collision with player.
// Check if boundary of game board has been reached.
// If boundary has been reached, reset to initial position.
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Hero's initial coordinates.
// image/sprite for hero.
var Hero = function(x, y) {
		this.x = x;
		this.y = y;
		this.sprite = 'images/char-cat-girl.png';
}

// render method - same as enemy.
Hero.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// update method - similar to one for enemy.
// check collision method needed - compare x and y coordinates.
// have they reached winning coordinates?
Hero.prototype.update = function(dt) {

}

// handleInput method - receives user input (allowedKeys), 
// moves player according to input.
// reset player method - moves player back to initial coordinates (can be separate method).
// https://www.kirupa.com/canvas/moving_shapes_canvas_keyboard.htm
Hero.prototype.handleInput = function(keypress) {
	switch(keypress) {
		case 'left':
			if (this.x > 100) {
				this.x -= 100;
			}
			break;
		case 'up':
			if (this.y > 0) {
				this.y -= 90;
			}
			break;
		case 'right':
			if (this.x < 401) {
				this.x += 100;
			}
			break;
		case 'down':
			if (this.y < 410) {
				this.y += 90;
			}
			break;
	}
	player.render();
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Hero(201, 410);
const allEnemies = [];

const enemy1 = new Enemy(0, 60, 200);
const enemy2 = new Enemy(0, 145, 200);
const enemy3 = new Enemy(0, 225, 200);
allEnemies.push(enemy1, enemy2, enemy3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

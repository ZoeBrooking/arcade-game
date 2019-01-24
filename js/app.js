// Enemy class
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Updates the enemy's position.
// Parameter: dt, a time delta between ticks
// If boundary has been reached (in x axis), resets to position outside of playing area.
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
    	this.x = -100;
    }
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Hero class
var Hero = function(x, y) {
		this.x = x;
		this.y = y;
		this.sprite = 'images/char-cat-girl.png';
}

// Render method - same as enemy.
Hero.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update method - similar to one for enemy.
// Checks if player has collided with enemy.
// Enemy is put in bounding box, and function checks whether the player's coordinates
// are located within this box.
var score = 0;
var gameScore = document.querySelector('.score');
Hero.prototype.update = function(dt) {
	for (var enemy of allEnemies) {
		if (this.y === enemy.y){
			if(enemy.x + 65 > this.x && enemy.x - 65 <= this.x) {
				player.resetPlayer();
				score = score - 50;
			}
		}
		//If the player reaches the water, call 'win' function.
		if (this.y <=0) {
			player.win();
		}
	}
	// Updates score text at top of window to reflect number of points won/lost.
	gameScore.textContent = score + " Points";
}

// Returns player to initial coordinates.
Hero.prototype.resetPlayer = function() {
	this.x = 201;
	this.y = 410;
}

// Returns player to initial coordinates using resetPlayer method.
// Adds 100 points onto score.
Hero.prototype.win = function() {
	player.resetPlayer();
	score = score + 100;	
}

// handleInput method - receives user input (allowedKeys), 
// Player "jumps" around playing area according to input.
// Inequalities are such that player cannot travel outside of the playing area.
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

// Objects are instantiated with their initial coordinates and speed (in the case of enemies).
const player = new Hero(201, 410);
const allEnemies = [];

const enemy1 = new Enemy(-150, 50, 100);
const enemy2 = new Enemy(-100, 140, 150);
const enemy3 = new Enemy(-120, 230, 120);
const enemy4 = new Enemy(-20, 50, 100);
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

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

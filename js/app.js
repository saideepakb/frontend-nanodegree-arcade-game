var cellWidth = 101;
var cellHeight = 83;
var numRows = 6;
var numCols = 10;

// Enemies our player must avoid
var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -cellWidth + Math.floor((Math.random() * numCols * cellWidth));
    this.speed = 100 + Math.floor((Math.random() * 100));
    switch(y) {
        case 6:
            this.y = -22;
            break;
        case 5:
            this.y = 60;
            break;
        case 4:
            this.y = 142;
            break;
        case 3:
            this.y = 224;
            break;
        case 2:
            this.y = 306;
            break;
        case 1:
            this.y = 394;
            break;
    }

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += this.speed*dt;
    if(this.x >= numCols * cellWidth) {
        this.x = -cellWidth;
        this.speed = 100 + Math.floor((Math.random() * 100));
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = (numCols) * cellWidth / 2;
    this.y = (numRows - 1) * cellHeight;
    this.sprite = 'images/char-boy.png';
    this.currentRow = -1;
    this.currentCol = 4;
};

Player.prototype.update = function() {
    if(this.x >= (numCols) * cellWidth) { // Prevents the player from going off the right edge of the canvas
        this.x -= cellWidth;
        this.currentCol--;
    } else if (this.x <= -cellWidth) { // Prevents the player from going off the left edge of the canvas
        this.x += cellWidth;
        this.currentCol++;
    }

    if (this.y >= numRows*cellHeight) { // Prevents the player from going off the bottom edge of the canvas
        this.y -= cellHeight;
    }

    document.getElementById('scoreboard').innerText = 'Score: '+ this.currentRow.toString();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(keyCode) {
    switch(keyCode) {
        case 'left':
            this.x -= cellWidth;
            this.currentCol--;
            break;
        case 'right':
            this.x += cellWidth;
            this.currentCol++;
            break;
        case 'up':
            this.y -= cellHeight;
            moveFrameUp();
            break;
        case 'down':
            this.y += cellHeight;
            moveFrameDown();
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(6), new Enemy(5), new Enemy(4), new Enemy(3)];
var player = new Player();


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

var moveFrameUp = function() {
    player.currentRow++;
    if(player.currentRow === 0 || player.currentRow === 1) {
        // allEnemies.push(new Enemy(2 - this.currentRow));
    }
};

var moveFrameDown = function() {
    if(player.currentRow > -1) {
        player.currentRow--;
    }

    if(player.currentRow === 0 ) {
        // allEnemies.pop();
    }

    if(player.currentRow === -1) {
        // allEnemies.pop();
    }
};
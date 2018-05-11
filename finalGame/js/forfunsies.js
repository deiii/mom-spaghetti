// define game
var game = new Phaser.Game(800, 600, Phaser.AUTO); 


	// ----------------------------------------------------------------------------------------------------------------------------------------Main Menu
// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('Main Menu');
		game.stage.backgroundColor = "#ffffff";
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction1 = game.add.text(50,50,'Press 1 for mini game 1\nPress 2 for mini game 2\nPress 3 for mini game 3.', { font: '32px Serif'});
	},
	update: function() {
		// --------------------------------------------------
		// Press 1, 2, OR 3 to switch to each mini-game state
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
			game.state.start('miniGameA');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
			game.state.start('miniGameB');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
			game.state.start('miniGameC');
		}
	}
}
 	// ----------------------------------------------------------------------------------------------------------------------------------------Mini Game 1
// define GamePlay state and methods
var miniGameA = function(game) {};
miniGameA.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('mini game');
		game.stage.backgroundColor = "#80C67F";
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction2 = game.add.text(300,50,'Press SPACE to go to main menu\nPress ESC for game over', { font: '32px Serif'});
	},
	update: function() {
		// --------------------------------------------------
		// Press SPACE for main menu
		// Press ESC for game over
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('GameOver');
		}
	}
}
	// ----------------------------------------------------------------------------------------------------------------------------------------Mini Game 2
var miniGameB = function(game) {};
miniGameB.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('mini game');
		game.stage.backgroundColor = "C63636";
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction3 = game.add.text(300,50,'Press SPACE to go to main menu\nPress ESC for game over', { font: '32px Serif'});
	},
	update: function() {
		// --------------------------------------------------
		// Press SPACE for main menu
		// Press ESC for game over
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('GameOver');
		}
	}
}
	// ----------------------------------------------------------------------------------------------------------------------------------------Mini Game 3
var miniGameC = function(game) {};
miniGameC.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('mini game');
		game.stage.backgroundColor = "#C6C27F";
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction4 = game.add.text(300,50,'Press SPACE to go to main menu\nPress ESC for game over', { font: '32px Serif'});
	},
	update: function() {
		// --------------------------------------------------
		// Press SPACE for main menu
		// Press ESC for game over
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('GameOver');
		}
	}
}
	// ----------------------------------------------------------------------------------------------------------------------------------------Game Over
// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('Game Over');
		game.stage.backgroundColor = "#bb11ee";
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction5 = game.add.text(300,50,'Press SPACE to go to main menu', { font: '32px Serif'});
	},
	update: function() {
		// --------------------------------------------------
		// Press SPACE for main menu
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
	}
}

// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('miniGameA', miniGameA);
game.state.add('miniGameB', miniGameB);
game.state.add('miniGameC', miniGameC);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');


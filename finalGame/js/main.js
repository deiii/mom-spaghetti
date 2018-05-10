var game = new Phaser.Game(800, 600, Phaser.AUTO);

// Main Menu state
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		// preload in background music
		game.load.audio('backgroud', 'assets/audio/background.ogg');
	},
	create: function() {
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#facade";
	},
	update: function() {
		// Swith to Game Play
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay');
		}
	}
}

// Game Play state
var GamePlay = function(game) {};
GamePlay.prototype = {
	preload: function() {
		console.log('GamePlay: preload');
		//preload SFX for collecting rune piece
		game.load.audio('dingSFX', 'dingSFX.ogg');
	},
	create: function() {
		console.log('GamePlay: create');
		game.stage.backgroundColor = "#ccddaa";
	},
	update: function() {
		// Swith to Game Over
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GameOver');
		}
	}
}

// Game Over state
var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');
	},
	create: function() {
		console.log('GameOver: create');
		game.stage.backgroundColor = "#bb11ee";
	},
	update: function() {
		// Switch to Main Menu
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
	}
}

// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');

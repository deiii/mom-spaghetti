// define game
var game = new Phaser.Game(1500, 450, Phaser.AUTO);

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
	},
	create: function() {
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#facade";
	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay');
		}
	}
}

// define GamePlay state and methods
var GamePlay = function(game) {};
GamePlay.prototype = {
	preload: function() {
		console.log('GamePlay: preload');
		game.load.image('sun', 'assets/img/sun.png');
		game.load.image('moon', 'assets/img/moon.png');
		game.load.image('night', 'assets/img/night.png'); 
	},
	create: function() {
		console.log('GamePlay: create');
		// Background color is gray
		game.stage.backgroundColor = 0xC3B6C8;
	
	// Eventually: put this into a while loop to continue a day/night cycle
	// We're going to have to refer 

		//-----------------------------------------------------------
		// Praise the sun
		//-----------------------------------------------------------
		var sun = game.add.sprite(70, game.height - 10, 'sun');
		sun.anchor.setTo(0.5);
		// Sun moves from behind horizon
		// Fade away after some time
		game.add.tween(sun).to({y: game.height - 380}, 5000, Phaser.Easing.Linear.None, true);
		game.add.tween(sun).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 15000);
		
		//-----------------------------------------------------------
		// Dayman, fighter of the Nightman
		//-----------------------------------------------------------
		var night = game.add.sprite(0,0, 'night');
		night.alpha = 0;
		// Fade in night time filter
		game.add.tween(night).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 15500);

		//-----------------------------------------------------------
		// The moon is an emo
		//-----------------------------------------------------------
		var moon = game.add.sprite(1430, game.height - 10, 'moon');
		moon.anchor.setTo(0.5);
		// Moon moves from behind horizon
		// Fade away after some time
		game.add.tween(moon).to({y: game.height - 380}, 5000, Phaser.Easing.Linear.None, true, 16000);
		game.add.tween(moon).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 30000);
	},
	update: function() {
		// GamePlay logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GameOver');
		}
	}
}

// define GameOver state and methods
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
		// GameOver logic
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


// GameOver.js
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
				game.state.start('phase1');
			}
		}
	}
// triggers state --------------------------------------------------------------------
var triggers = function(game) {};
var backMenu;
	triggers.prototype = {
		preload: function() {
			//load in "back" button
			game.load.image('back', 'assets/img/backButton.png');
		},
		create: function() {
			music.pause();
			game.stage.backgroundColor = '#ffffff';
			console.log('triggers');
			// text about triggers
	   		var trig = "This game contains some political\ncommmentary please be advised.\n\nGameplay may also cause motion\nsickness and anxiety...\n\nPlay at your own discretion.";
			game.add.text(100, 100, trig, {font: 'Orbitron',
				fontSize: 32,
				fill: '#000000'});
		
			var back = game.add.sprite(100, 500, 'back');
			back.inputEnabled = true;
			back.events.onInputDown.add(this.backMenu, this);
			game.add.text(125, 505, "Back", {font: 'Orbitron',
											fontSize: 32,
											fill: '#000000'});
		},
		update: function() {
		},
		backMenu: function() {
			//change to loadingMenu
			game.state.start('loadingMenu');
		}
	}

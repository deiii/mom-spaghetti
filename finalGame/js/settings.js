// settings state --------------------------------------------------------------------
var settings = function(game) {};
	settings.prototype = {
		preload: function() {
			//load in "back" button
			game.load.image('back', 'assets/img/backButton.png');
		},
		
		create: function() {
			music.pause();
			game.stage.backgroundColor = '#ffffff';
			console.log('settings');
			
			game.add.text(100, 200, "Woah! Cool! A new font!", {font: 'Orbitron',
				fontSize: 32,
				fill: '#000000'});
				
			game.add.text(100, 400, "That's all...", {font: 'Orbitron',
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

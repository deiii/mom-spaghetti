// credits.js
var credits = function(game) {};
	credits.prototype = {
		preload: function() {
			//load in "back" button
			game.load.image('back', 'assets/img/backButton.png');
		},
		backMenu: function() {
		//change to loadingMenu
		game.state.start('loadingMenu');
	},
		create: function() {
			//music.pause();
			game.stage.backgroundColor = '#ffffff';
			console.log('credits');
			// text for credits
			var creds = "Mom's Spaghetti\n\nYash Dua\nEd Li\nAlex Arancibia\nDhani Hua";
			game.add.text(300, 100, creds, {font: 'Orbitron',
											fontSize: 32,
											fill: '#000000'
											});
			var back = game.add.sprite(100, 500, 'back');
			back.inputEnabled = true;
			back.events.onInputDown.add(this.backMenu, this);
			game.add.text(125, 505, "Back", {font: 'Orbitron',
				fontSize: 32,
				fill: '#000000'});
		},
		update: function() {
		}
	}
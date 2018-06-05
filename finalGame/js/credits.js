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
		
			music.pause();
			game.stage.backgroundColor = palette.grey;
			console.log('credits');
			// text for credits
			var creds = "Mom's Spaghetti\n\nYash Dua\nEd Li\nAlex Arancibia\nDhani Hua";
			game.add.text(300, 100, creds, textStyle);
			var back = game.add.sprite(100, 500, 'back');
			back.inputEnabled = true;
			back.events.onInputDown.add(backMenu, this);
			game.add.text(125, 505, "Back", textStyle);
		},
		update: function() {
		}
	}
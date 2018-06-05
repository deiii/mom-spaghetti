	// settings state --------------------------------------------------------------------
var settings = function(game) {};
	settings.prototype = {
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
			console.log('settings');
			var back = game.add.sprite(100, 500, 'back');
			back.inputEnabled = true;
			back.events.onInputDown.add(backMenu, this);
			game.add.text(125, 505, "Back", textStyle);
		},
		update: function() {
		}
	}

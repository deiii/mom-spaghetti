// loadingMenu.js
var loadingMenu = function(game) {};
loadingMenu.prototype = {
	preload: function() {
		// load in button sprite and background image
		game.load.image('button', 'assets/img/button.png');
		game.load.image('background', 'assets/img/600bw.png');
		// Music: http://www.purple-planet.com
		game.load.audio('loadingSound', 'assets/audio/main/SpyStory.ogg');
	},
	//------------------------------------------------------------------------------------
	// Define functions
	//------------------------------------------------------------------------------------
	// define functions for state switching
	gamePlay: function() {
		// change state to MainMenu
		game.state.start('phase1');
		music.pause();
	},
	gameSettings: function() {
		// change state to Settings page
		game.state.start('settings');
	},
	triggerWarnings: function() {
		//change state to trigger warnings page
		game.state.start('triggers');
	},
	creditsList: function() {
		//change to credits list page
		game.state.start('credits');
	},
	backMenu: function() {
		//change to loadingMenu
		game.state.start('loadingMenu');
	},
	fadeIn: function() {
		music.fadeIn(4000);
	},
	create:function() {
		// add looping background sound
		music = game.add.audio('loadingSound');
		//music.onDecoded.add(fadeIn, this);
		music.play('', 0, 1, true);
			
		// Main Menu page with four buttons
		game.add.sprite(0, 0, 'background');
		
		// if player clicks on "play", go to MainMenu state
		var play = game.add.sprite(250, 150, 'button');
		play.inputEnabled = true;
		play.events.onInputDown.add(this.gamePlay, this);
		// add "play" over button
		game.add.text(410, 175, 'play', {font: 'Orbitron',
						fontSize: 32,
						fill: '#000000'});
		
		// if player clicks on "settings", go to setting state
		var settings = game.add.sprite(250, 250, 'button');
		settings.inputEnabled = true;
		settings.events.onInputDown.add(this.gameSettings, this);
		// add "settings" over button
		game.add.text(385, 275, 'settings', {font: 'Orbitron',
							fontSize: 32,
							fill: '#000000'});
		
		// if player clicks on "triggers", go to trigger warnings
		var triggers = game.add.sprite(250, 350, 'button');
		triggers.inputEnabled = true;
		triggers.events.onInputDown.add(this.triggerWarnings, this);
		// add "trigger warnings" over button
		game.add.text(320, 375, 'trigger warnings', {font: 'Orbitron',
							fontSize: 32,
							fill: '#000000'});
		
		// if player clicks  on "credits", go to credits state
		var credits = game.add.sprite(250, 450, 'button');
		credits.inputEnabled = true;
		credits.events.onInputDown.add(this.creditsList, this);
		// add "credits" over button
		game.add.text(390, 475, 'credits', {font: 'Orbitron',
						fontSize: 32,
						fill: '#000000'});
		},
		update: function() {
		}
}

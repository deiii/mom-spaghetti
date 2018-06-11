var phone4 = function(game) {};
phone4.prototype = {
	preload: function() {
		game.load.atlas('phases', 'assets/img/main/phases.png', 'assets/img/main/phases.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.image('icon', 'assets/img/main/iconhitbox.png');
		game.load.image('phop', 'assets/img/breakout/phop.png');
		game.load.audio('censor', ['assets/audio/phone/censor.mp3', 'assets/audio/phone/censor.ogg']);
	},
	create: function() {
		this.camera.flash('#000000', 700);
		
		game.stage.backgroundColor = "#000000";
		game.add.sprite(0,0,'phases', 'phonebloodmoon');
		phop = game.add.sprite(240,0,'phop');
		phottom = game.add.sprite(240, 620, 'phop');
		

		icon1 = game.add.sprite(328, 110, 'icon');
		icon1.alpha = 0;
		icon1.inputEnabled = true;

		icon2 = game.add.sprite(425, 110, 'icon');
		icon2.alpha = 0;
		icon2.inputEnabled = true;

		icon3 = game.add.sprite(522, 110, 'icon');
		icon3.alpha = 0;
		icon3.inputEnabled = true;


		icon1.events.onInputDown.add(this.starShooter, this);
		icon1.events.onInputOver.add(this.hoverShooter, this);

		icon2.events.onInputDown.add(this.breakout, this);
		icon2.events.onInputOver.add(this.hoverBreakout, this);

		icon3.events.onInputDown.add(this.soundbored, this);
		icon3.events.onInputOver.add(this.hoverbored, this);

		censor = game.add.audio('censor');
	},

	starShooter: function() {
		game.state.start('shootintro4');
	},
	hoverShooter: function() {
		icon1.input.useHandCursor = true;
	},

	hoverBreakout: function() {
		icon2.input.useHandCursor = true;
	},

	breakout: function() {
		game.state.start('bointro4');
	},
	soundbored: function() {
		censor.play();
	},
	hoverbored: function() {
		icon3.input.useHandCursor = true;
	},
	update: function() {
		// --------------------------------------------------
		// Press SPACE for main menu
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.sound.stopAll();
			game.state.start('phase4');
			if ((localStorage.getItem("incb4") >= 1) && 
				(localStorage.getItem("incsh4") >= 1) && 
				(localStorage.getItem("inctr4") >= 1))
			{
				game.sound.stopAll();
				game.state.start('phase5');
			}
		}
	}
}
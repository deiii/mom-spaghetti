
var trumpintro4 = function(game) {};
trumpintro4.prototype = {
	preload: function() {
		game.load.atlas('trumptings', 'assets/img/TV/trumpphases.png', 'assets/img/TV/trumpphases.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH)
		game.load.atlas('liltrump', 'assets/img/TV/liltrump.png', 'assets/img/TV/liltrump.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
		game.load.image('podium', 'assets/img/TV/podium.png');
		game.load.image('overlay', 'assets/img/TV/tvoverlay.png');
		game.load.image('start', 'assets/img/TV/startspeech.png');
		game.load.image('go', 'assets/img/TV/gotopodium.png');


		game.load.audio('drumroll', ['assets/audio/trump/drumroll.mp3', 'assets/audio/trump/drumroll.ogg'])
	},
	create: function() {
		this.camera.flash('#000000', 700);
		
		game.add.sprite(0,0,'trumptings','curtains4');

		trump = game.add.sprite(30, 355, 'liltrump');
		trump.scale.set(1.2);

		game.physics.arcade.enable(trump);
		trump.animations.add('trumpwalk', Phaser.Animation.generateFrameNames('trump',1,4),3,true);
		trump.body.collideWorldBounds = true;

		podium = game.add.sprite(700, 397, 'podium');
		game.physics.arcade.enable(podium);
		podium.inputEnabled = true;

		game.add.sprite(0,0,'overlay');

		drumroll = game.add.audio('drumroll');
		drumroll.play();


		go = game.add.sprite(171, 30, 'go');
		go.alpha = 0;

		game.add.tween(go).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		podium.events.onInputDown.add(this.propeller, this);
		podium.events.onInputUp.add(this.nopropel, this);
	},
	update: function() {
		game.physics.arcade.overlap(trump,podium,this.speechme,null,this);

		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.sound.stopAll();
			game.state.start('phase4');
			if ((localStorage.getItem("incb4") >= 1) && 
				(localStorage.getItem("incsh4") >= 1) && 
				(localStorage.getItem("inctr4") >= 1) && 
				game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			{
				game.sound.stopAll();
				game.state.start('phase5');
			} 
		} 
	},
	propeller: function() {
		trump.body.velocity.x = 0;
		trump.body.velocity.x = 150;
		trump.animations.play('trumpwalk');
		drumroll.resume();
	},
	nopropel: function(){
		drumroll.pause();
		trump.animations.stop();
		trump.body.velocity.x = 0;
	},
	speechme: function() {
		start = game.add.sprite(620,350, 'start');
		start.inputEnabled = true;

		start.events.onInputDown.add(this.startspeech, this);
		start.events.onInputOver.add(this.onspeech, this);
	},
	startspeech: function() {
		game.sound.stopAll();
		game.state.start('trump4');
	},
	onspeech: function() {
		start.tint = 0x00ff00;
		start.input.useHandCursor = true;
	}
}
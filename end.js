var end = function(game) {};
end.prototype = {
	preload: function() {
		game.load.atlas('end', 'assets/img/main/moonend.png', 'assets/img/main/moonend.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.image('fade', 'assets/img/main/fade.png');
		game.load.image('fin', 'assets/img/main/theend.png');
	},
	create: function() {
		this.camera.flash('#000000', 700);

		game.add.sprite(0,0, 'end', 'moonbg');
		moon =game.add.sprite(game.world.centerX, 170, 'end', 'moon');
		moon.anchor.setTo(0.5, 0.5);

		moon1 = game.add.sprite(57, 410, 'end', 'moon1');
		moon1.alpha = 0;
		moon1.inputEnabled = true;

		game.add.tween(moon1).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 3000);

		moon1.events.onInputDown.add(this.clickmoon1, this);

		localStorage.clear();
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.sound.stopAll();
			game.state.start('phase1');
		}

	},

	clickmoon1: function() {
		moon1.kill();

		moon2 = game.add.sprite(57, 410, 'end', 'moon2');
		moon2.alpha = 0;
		moon2.inputEnabled = true;

		game.add.tween(moon2).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 2000);		

		moon2.events.onInputDown.add(this.clickmoon2, this);
	},

	clickmoon2: function() {
		moon2.kill();

		moonend = game.add.sprite(game.world.centerX, game.world.centerY, 'end');
		moonend.alpha = 0;

		game.add.tween(moonend).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 500);
        moonend.animations.add('moonglitch', Phaser.Animation.generateFrameNames('glitchmoon',1,5),8,true);
        moonend.anchor.setTo(0.5, 0.5);

        moonend.animations.play('moonglitch');

        fade = game.add.sprite(0,0,'fade');
		fade.alpha = 0;
        game.add.tween(fade).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 8000);


        theend = game.add.sprite(game.world.centerX, game.world.centerY,'fin');
		theend.alpha = 0;
		theend.anchor.setTo(0.5, 0.5);
        game.add.tween(theend).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 10000);
	}

}
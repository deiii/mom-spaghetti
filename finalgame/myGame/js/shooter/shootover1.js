var shootover1 = function(game) {};
shootover1.prototype = {
	preload: function() {
		game.load.image('bgover', 'assets/img/shooter/redspike.png');
		game.load.image('gameover', 'assets/img/shooter/gameover.png');
		game.load.image('tryagain', 'assets/img/shooter/tryagain.png');

		game.load.image('phedge1', 'assets/img/shooter/phedge1.png');
	    game.load.image('phedge2', 'assets/img/shooter/phedge2.png');
	    game.load.image('phop', 'assets/img/shooter/phop.png');

	    game.load.image('bg', 'assets/img/breakout/morningsea.png');
	},
	create: function() {
		this.camera.flash('#000000', 700);
		
		bgover = game.add.sprite(460, game.world.centerY, 'bgover');
		bgover.anchor.setTo(0.5, 0.5);
		bgover.inputEnabled = true;

		gameover = game.add.sprite(460, 200, 'gameover');
		gameover.anchor.setTo(0.5, 0.5);
		retry = game.add.sprite(460, 250, 'tryagain');
		retry.anchor.setTo(0.5, 0.5);

		phedge1 = game.add.sprite(240, 0, 'phedge1');
	    phedge2 = game.add.sprite(650, 0, 'phedge2');

		game.add.sprite(0,0, 'bg');
		phop = game.add.sprite(240,0,'phop');
		phottom = game.add.sprite(240, 620, 'phop')

		game.add.tween(gameover).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

		game.add.tween(retry).to( { alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 1800);

		bgover.events.onInputDown.add(this.restart, this);
	},
	update: function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.sound.stopAll();
			game.state.start('phase1');
			if ((localStorage.getItem("incb1") >= 2) && 
				(localStorage.getItem("incsh1") >= 2) && 
				(localStorage.getItem("inctr1") >= 1) && 
				game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			{
				game.sound.stopAll();
				game.state.start('phase2');
			}
		} 
	},
	restart: function() {
		game.state.start('shooter1');
	}
}
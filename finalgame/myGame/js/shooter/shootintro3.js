var shootintro3 = function(game) {};
shootintro3.prototype = {
	preload: function() {
		game.load.image('titlebg', 'assets/img/shooter/shootertitle.png');
		game.load.image('start', 'assets/img/shooter/start.png');

		game.load.image('phedge1', 'assets/img/shooter/phedge1.png');
	    game.load.image('phedge2', 'assets/img/shooter/phedge2.png');
	    game.load.image('phop', 'assets/img/shooter/phop.png');

	    game.load.image('bg', 'assets/img/breakout/nightsea.png');
	},
	create: function() {
		this.camera.flash('#000000', 700);
		
		game.stage.backgroundColor = "#000000";
		title = game.add.sprite(460, game.world.centerY, 'titlebg');
		title.anchor.setTo(0.5,0.5);
		title.inputEnabled = true;

		start = game.add.sprite(460, game.world.centerY, 'start');
		start.anchor.setTo(0.5, 0.5);

		title.events.onInputDown.add(this.shootstart, this);

		phedge1 = game.add.sprite(240, 0, 'phedge1');
	    phedge2 = game.add.sprite(650, 0, 'phedge2');

		game.add.sprite(0,0, 'bg');
		phop = game.add.sprite(240,0,'phop');
		phottom = game.add.sprite(240, 620, 'phop');

		game.add.tween(start).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
	},
	update: function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
			game.sound.stopAll();
			game.state.start('phase3');
			if ((localStorage.getItem("incb3") >= 1) && 
				(localStorage.getItem("incsh3") >= 1) && 
				(localStorage.getItem("inctr3") >= 1) &&
				game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			{
				game.sound.stopAll();
				game.state.start('phase4');
			}
		}
	},
	shootstart: function() {
		game.state.start('shooter3');
	}
}
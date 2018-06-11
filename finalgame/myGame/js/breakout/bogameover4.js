var bogameover4 = function(game) {};
bogameover4.prototype = {
	preload: function() {
		game.load.image('titlebg', 'assets/img/breakout/titleblocks.png');
		game.load.image('gameover', 'assets/img/breakout/gameover.png');
		game.load.image('tryagain', 'assets/img/breakout/tryagain.png');
		game.load.image('bg', 'assets/img/breakout/bloodmoonsea.png');
		game.load.image('phop', 'assets/img/breakout/phop.png');
		game.load.image('phedge1', 'assets/img/breakout/phedge1.png');
	    game.load.image('phedge2', 'assets/img/breakout/phedge2.png');
	},
	create: function() {
		this.camera.flash('#000000', 700);

		titlebg = game.add.sprite(0,0,'titlebg');
		titlebg.inputEnabled = true;

		gameover = game.add.sprite(310, 200, 'gameover');

		game.add.tween(gameover).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

		tryagain = game.add.sprite(320, 250, 'tryagain');

		game.add.tween(tryagain).to( { alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 1800);

		titlebg.events.onInputDown.add(this.restart, this);

		phedge1 = game.add.sprite(240, 0, 'phedge1');
	    phedge2 = game.add.sprite(650, 0, 'phedge2');

		phop = game.add.sprite(240,0,'phop');
		phottom = game.add.sprite(240, 620, 'phop');

		game.add.sprite(0,0, 'bg');
	},
	update: function() {
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
	restart: function() {
		game.state.start('breakout4');
	}

}
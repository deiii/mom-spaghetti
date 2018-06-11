var bointro4 = function(game) {};
bointro4.prototype = {
	preload: function() {
		game.load.image('title', 'assets/img/breakout/breakouticon.png');
		game.load.image('start', 'assets/img/breakout/start.png');

		game.load.image('phedge1', 'assets/img/breakout/phedge1.png');
	    game.load.image('phedge2', 'assets/img/breakout/phedge2.png');
	    game.load.image('bg', 'assets/img/breakout/bloodmoonsea.png');
	    game.load.image('titlebg', 'assets/img/breakout/titleblocks.png');


	    game.load.image('phop', 'assets/img/breakout/phop.png');
	},
	create: function() {
		this.camera.flash('#000000', 700);

		titlebg = game.add.sprite(0,0,'titlebg');
		titlebg.inputEnabled = true;

		phedge1 = game.add.sprite(240, 0, 'phedge1');
	    phedge2 = game.add.sprite(650, 0, 'phedge2');

		phop = game.add.sprite(240,0,'phop');
		phottom = game.add.sprite(240, 620, 'phop');

		game.add.sprite(0,0, 'bg');

		title = game.add.sprite(300, 200, 'title');

		title.alpha = 0;

		start = game.add.sprite(370, 250, 'start');
		start.scale.set(1.2);

		start.alpha = 0;

		game.add.tween(title).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

		game.add.tween(start).to( { alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 1800);

		titlebg.events.onInputDown.add(this.clickstart, this);
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
	clickstart: function() {
		game.state.start('breakout4');
	}
}
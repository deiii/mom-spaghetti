var instructions = function(game) {};
instructions.prototype = {
	preload: function() {
		game.load.image('instructions', 'assets/img/instructions.png');
	},
	create: function() {
		//music.pause();
		this.camera.flash('#000000', 700);

		instructions = game.add.sprite(0,0,'instructions');
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('phase1');
		}
	}
}


var bgmusic;

var phase5 = function(game) {};
phase5.prototype = {
	preload: function() {
		game.load.image('tv', 'assets/img/main/tvblock600.png');
		game.load.image('laptop','assets/img/main/laptopblock600.png');
		game.load.image('decoyphone', 'assets/img/main/decoyphone.png');
		game.load.image('next', 'assets/img/main/next.png');

		game.load.atlas('phases', 'assets/img/main/phases.png', 'assets/img/main/phases.json');
		game.load.atlas('phph', 'assets/img/main/phonephase.png', 'assets/img/main/phonephase.json');
		game.load.atlas('lptv', 'assets/img/main/lptv.png', 'assets/img/main/lptv.json');

		game.load.audio('tvstatic', ['assets/audio/main/lowstatic.mp3', 'assets/audio/main/lowstatic.ogg']);
		game.load.audio('lpmusic', ['assets/audio/main/blushes.mp3', 'assets/audio/main/blushes.ogg']);
		game.load.audio('bgmusic', ['assets/audio/main/somethingwicked.mp3', 'assets/audio/main/somethingwicked.ogg']);
		game.load.audio('phgame', ['assets/audio/main/8bitselect.mp3', 'assets/audio/main/8bitselect.ogg']);

		game.load.atlas('hovers', 'assets/img/main/hovers.png', 'assets/img/main/hovers.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.atlas('comments', 'assets/img/main/comments.png', 'assets/img/main/comments.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	},
	create: function() {
		game.stage.backgroundColor = '#000000';
		this.camera.flash('#000000', 700);
		room = game.add.sprite(0, 0, 'phases', 'roombloodsky');
		
		bgmusic = game.add.audio('bgmusic');
		bgmusic.loop = true;

		bgmusic.play();

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.enable(scroll, Phaser.Physics.ARCADE);

	// ----------------------------------------------------------------
	// Static on TV
	// ----------------------------------------------------------------
		static = game.add.sprite(0,150,'lptv');
		static.inputEnabled = true;
		static.alpha = 0;
		static.animations.add('TV', Phaser.Animation.generateFrameNames('TV',1,7),5,true);

		static.events.onInputOver.add(this.static,this);
		static.events.onInputOut.add(this.nostatic, this);
		static.events.onInputDown.add(this.clickTV, this);

		tvstatic = game.add.audio('tvstatic');
	// ----------------------------------------------------------------
	// Scrolling on laptop
	// ----------------------------------------------------------------
		scroll = game.add.sprite(600,294,'lptv');
		scroll.inputEnabled = true;
		scroll.alpha = 0;
		scroll.animations.add('cecil', Phaser.Animation.generateFrameNames('cecil',1,4),5,true);
		// scroll.body.setSize(100, 50, 50, 25);

		scroll.events.onInputOver.add(this.scroll, this);
		scroll.events.onInputOut.add(this.noscroll, this);
		scroll.events.onInputDown.add(this.clickLP, this);

		lpmusic = game.add.audio('lpmusic');
	// ----------------------------------------------------------------
	// Phone events
	// ----------------------------------------------------------------
		decoyphone = game.add.sprite(650, 500, 'decoyphone');
		phone = game.add.sprite(650, 450, 'phph');
		phone.alpha = 0;
		phone.inputEnabled = true;	
		phone.animations.add('phover1', Phaser.Animation.generateFrameNames('bslock',1,4),10,false);
		phone.animations.add('phover2', Phaser.Animation.generateFrameNames('bslock',5,7),10,false);

		phone.events.onInputOver.add(this.onHover, this);
		phone.events.onInputOut.add(this.noHover, this);
		phone.events.onInputDown.add(this.clickPhone, this);

		phgame = game.add.audio('phgame');

		hoverbalcony = game.add.sprite(318, 36, 'hovers', 'hoverbalcony');
		hoverbalcony.alpha = 0;
		hoverbalcony.inputEnabled = true;

		hoverbalcony.events.onInputOver.add(this.balcOver, this);
		hoverbalcony.events.onInputOut.add(this.balcNone, this);
		hoverbalcony.events.onInputDown.add(this.clickbalc, this);

	},
	balcOver: function() {
		hoverbalcony.alpha = 1;
		hoverbalcony.input.useHandCursor = true;
	},
	balcNone: function() {
		hoverbalcony.alpha = 0;
		hoverbalcony.input.useHandCursor = true;
	},
	clickbalc:function() {
		game.state.start('end');
	},
	killbacltext: function() {
		next.kill();
		gotobalc.kill();
	},
// ------------------------------------------------
// Hover animations and actions for TV/Laptop/Phone
// ------------------------------------------------
	// TV callback functions
	clickTV: function() {
		// bgmusic.stop();
		// game.state.start('miniGameA');
	},
	static: function() {
		static.alpha = 1;
		static.animations.play('TV');
		static.input.useHandCursor = true;
	},
	nostatic: function() {
		static.alpha = 0;
	},
	// Laptop callback functions
	clickLP: function() {
		// bgmusic.stop();
		// game.state.start('dateProfiles');
	},
	scroll: function() {
		scroll.alpha = 1;
		scroll.animations.play('cecil');
		scroll.input.useHandCursor = true;
	},
	noscroll: function() {
		scroll.alpha = 0;
	},	
	// Phone callback functions
	onHover: function() {
		phone.input.useHandCursor = true;
		phone.alpha = 1;
		phone.animations.play('phover1');
	},
	noHover: function() {
		// phone.y += 50;
		phone.animations.play('phover2');
		phone.alpha = 0;
	},
	clickPhone: function() {
		// bgmusic.stop();
		// game.state.start('phone1');
	},
		
	update: function() {
		// // --------------------------------------------------
		// // Press 1, 2, OR 3 to switch to each mini-game state
		// // --------------------------------------------------
		// if(game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
		// 	game.state.start('miniGameA');
		// }
		// if(game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
		// 	game.state.start('miniGameB');
		// }
		// if(game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
		// 	game.state.start('miniGameC');
		// }
		// if(game.input.keyboard.isDown(Phaser.Keyboard.FIVE)) {
		// 	game.state.start('dateProfiles');
		// if (game.input.keyboard.isDown(Phaser.Keyboard.SIX)) {
		//  bgmusic.stop();
		 	// lpmusic.stop();
		 	// tvstatic.stop();
		// 	game.state.start('phase3');
		// }
	}

}
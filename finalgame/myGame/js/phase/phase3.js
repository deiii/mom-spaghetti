
var phase3 = function(game) {};
phase3.prototype = {
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
		game.load.audio('bgmusic', ['assets/audio/main/lounge.mp3', 'assets/audio/main/lounge.ogg']);
		game.load.audio('phgame', ['assets/audio/main/8bitselect.mp3', 'assets/audio/main/8bitselect.ogg']);

		game.load.atlas('hovers', 'assets/img/main/hovers.png', 'assets/img/main/hovers.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.atlas('comments', 'assets/img/main/comments.png', 'assets/img/main/comments.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
	},
	create: function() {
		game.stage.backgroundColor = '#000000';
		this.camera.flash('#000000', 700);
		room = game.add.sprite(0, 0, 'phases', 'roomnight');
		
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
		lpmusic.loop = true;
	// ----------------------------------------------------------------
	// Phone events
	// ----------------------------------------------------------------
		decoyphone = game.add.sprite(650, 500, 'decoyphone');
		phone = game.add.sprite(650, 450, 'phph');
		phone.alpha = 0;
		phone.inputEnabled = true;	
		phone.animations.add('phover1', Phaser.Animation.generateFrameNames('nlock',1,4),10,false);
		phone.animations.add('phover2', Phaser.Animation.generateFrameNames('nlock',5,7),10,false);

		phone.events.onInputOver.add(this.onHover, this);
		phone.events.onInputOut.add(this.noHover, this);
		phone.events.onInputDown.add(this.clickPhone, this);

		phgame = game.add.audio('phgame');
		phgame.loop = true;
	
		hoverbalcony = game.add.sprite(318, 36, 'hovers', 'hoverbalcony');
		hoverbalcony.alpha = 0;

		hoverbear = game.add.sprite(54, 510, 'hovers', 'hoverbear');
		hoverbear.alpha = 0;
		hoverbear.inputEnabled = true;

		hoverbear.events.onInputOver.add(this.bearOver, this);
		hoverbear.events.onInputOut.add(this.bearNone, this);
		hoverbear.events.onInputDown.add(this.clickbear, this);

		hoverbottle = game.add.sprite(384 ,480, 'hovers', 'hoverbottle');
		hoverbottle.alpha = 0;
		hoverbottle.inputEnabled = true;

		hoverbottle.events.onInputOver.add(this.bottleOver, this);
		hoverbottle.events.onInputOut.add(this.bottleNone, this);
		hoverbottle.events.onInputDown.add(this.clickbottle, this);

		hovermug = game.add.sprite(360, 366, 'hovers', 'hovermug');
		hovermug.alpha = 0;
		hovermug.inputEnabled = true;

		hovermug.events.onInputOver.add(this.mugOver, this);
		hovermug.events.onInputOut.add(this.mugNone, this);
		hovermug.events.onInputDown.add(this.clickmug, this);

		hoverfish = game.add.sprite(215, 317, 'hovers', 'hoverfishie');
		hoverfish.alpha = 0;
		hoverfish.inputEnabled = true;

		hoverfish.events.onInputOver.add(this.fishOver, this);
		hoverfish.events.onInputOut.add(this.fishNone, this);
		hoverfish.events.onInputDown.add(this.clickfish, this);


		hoversucc = game.add.sprite(485, 288, 'hovers', 'hoversucc');
		hoversucc.alpha = 0;
		hoversucc.inputEnabled = true;

		hoversucc.events.onInputOver.add(this.succOver, this);
		hoversucc.events.onInputOut.add(this.succNone, this);
		hoversucc.events.onInputDown.add(this.clicksucc, this);

		hoverposter = game.add.sprite(102,6, 'hovers', 'hoverposter');
		hoverposter.alpha = 0;
		hoverposter.inputEnabled = true;

		hoverposter.events.onInputOver.add(this.postOver, this);
		hoverposter.events.onInputOut.add(this.postNone, this);
		hoverposter.events.onInputDown.add(this.clickpost, this);


	},
	postOver: function() {
		hoverposter.alpha = 1;
		hoverposter.input.useHandCursor = true;
	},
	postNone: function() {
		hoverposter.alpha = 0;
		hoverposter.input.useHandCursor = true;
	},
	clickpost: function() {
		clickedpost = game.add.sprite(57, 410, 'comments', 'poster');
		clickedpost.inputEnabled = true; 
		next = game.add.sprite(780, 525, 'next');

		clickedpost.events.onInputDown.add(this.killposter, this);
	},
	killposter: function() {
		next.kill();
		clickedpost.kill();
	},
	succOver: function () {
		hoversucc.alpha = 1;
		hoversucc.input.useHandCursor = true;
	},
	succNone: function() {
		hoversucc.alpha = 0;
	},
	clicksucc: function() {
		clickedsucc = game.add.sprite(57, 410, 'comments', 'succulent');
		clickedsucc.inputEnabled = true; 
		next = game.add.sprite(780, 525, 'next');

		clickedsucc.events.onInputDown.add(this.killsucc, this);
	},
	killsucc: function() {
		next.kill();
		clickedsucc.kill();
	},
	fishOver: function() {
		hoverfish.alpha = 1;
		hoverfish.input.useHandCursor = true;
	},
	fishNone: function() {
		hoverfish.alpha = 0;
	},
	clickfish: function() {
		clickedfish = game.add.sprite(57, 410, 'comments', 'fishfetishbox');
		clickedfish.inputEnabled = true; 
		next = game.add.sprite(780, 525, 'next');

		clickedfish.events.onInputDown.add(this.killfish, this);
	},
	killfish: function() {
		next.kill();
		clickedfish.kill();
	},
	mugOver: function() {
		hovermug.alpha = 1;
		hovermug.input.useHandCursor = true;
	},
	mugNone: function() {
		hovermug.alpha = 0;
	},
	clickmug: function() {
		clickedmug = game.add.sprite(57, 410, 'comments', 'mug');
		clickedmug.inputEnabled = true; 
		next = game.add.sprite(780, 525, 'next');

		clickedmug.events.onInputDown.add(this.killmug, this);
	},
	killmug: function() {
		next.kill();
		clickedmug.kill();
	},
	bearOver: function() {
		hoverbear.input.useHandCursor = true;
		hoverbear.alpha = 1;
	},
	bearNone: function() {
		hoverbear.alpha = 0;
	},
	clickbear: function() {
		clickedbear = game.add.sprite(57, 410, 'comments', 'bear');
		clickedbear.inputEnabled = true;
		next = game.add.sprite(780, 525, 'next');

		clickedbear.events.onInputDown.add(this.killbear, this);
	},
	killbear: function() {
		next.kill();
		clickedbear.kill();
	},
	bottleOver: function() {
		hoverbottle.input.useHandCursor = true;
		hoverbottle.alpha = 1;
	},
	bottleNone: function() {
		hoverbottle.alpha = 0;
	},
	clickbottle: function() {
		clickedbot = game.add.sprite(57, 410, 'comments', 'bottles');
		clickedbot.inputEnabled = true;
		next = game.add.sprite(780, 525, 'next');

		clickedbot.events.onInputDown.add(this.killbot, this);
	},
	killbot: function() {
		next.kill();
		clickedbot.kill();
	},
// ------------------------------------------------
// Hover animations and actions for TV/Laptop/Phone
// ------------------------------------------------
	// TV callback functions
	clickTV: function() {
		tvstatic.stop();
		bgmusic.stop();
		game.state.start('trumpintro3');
	},
	static: function() {
		static.alpha = 1;
		static.animations.play('TV');
		static.input.useHandCursor = true;
		
		bgmusic.volume = 0;
		tvstatic.play();
		tvstatic.fadeIn(500);
		tvstatic.volume = 0.2;
	},
	nostatic: function() {
		static.alpha = 0;

		tvstatic.fadeOut(500);
		bgmusic.volume = 1;
	},
	// Laptop callback functions
	clickLP: function() {
		bgmusic.stop();
		game.state.start('dateProfiles3');
	},
	scroll: function() {
		scroll.alpha = 1;
		scroll.animations.play('cecil');
		scroll.input.useHandCursor = true;

		bgmusic.volume = 0;

		lpmusic.play();
		lpmusic.fadeIn(1500);
	},
	noscroll: function() {
		scroll.alpha = 0;

		lpmusic.fadeOut(700);

		bgmusic.volume = 1;
	},	
	// Phone callback functions
	onHover: function() {
		bgmusic.volume = 0;
		phone.input.useHandCursor = true;
		phone.alpha = 1;

		lpmusic.fadeOut(700);
		phone.animations.play('phover1');
		phgame.fadeIn();
	},
	noHover: function() {
		// phone.y += 50;
		phone.animations.play('phover2');
		phone.alpha = 0;

		lpmusic.fadeOut(700);
		phgame.fadeOut();
		bgmusic.volume = 1;
	},
	clickPhone: function() {
		bgmusic.stop();

		bgmusic.volume = 0;

		phgame.fadeOut();

		game.state.start('phone3');
	},
		
	update: function() {
		// // --------------------------------------------------
		// // Press 1, 2, OR 3 to switch to each mini-game state
		// // --------------------------------------------------
		// if(game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
		// 	game.state.start('trumpintro4');
		// }
		// if(game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
		// 	game.state.start('bointro4');
		// }
		// if(game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
		// 	game.state.start('shootintro4');
		// }
		// if(game.input.keyboard.isDown(Phaser.Keyboard.FIVE)) {
		// 	game.state.start('dateProfiles')
		// }
		// if (game.input.keyboard.isDown(Phaser.Keyboard.SIX)) {
		//  bgmusic.stop();
		//  	lpmusic.stop();
		//  	tvstatic.stop();
		// 	game.state.start('phase4');
		// }
	}
}
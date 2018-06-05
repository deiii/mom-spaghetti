// phase1.js
var phase1 = function(game) {};
	phase1.prototype = {
		preload: function() {
			game.load.image('room', 'assets/img/600.png');

			game.load.image('tv', 'assets/img/tvblock600.png');
			game.load.image('laptop','assets/img/laptopblock600.png');
			game.load.image('interface', 'assets/img/testphone.png');
			game.load.image('icon', 'assets/img/clickicon.png');
		
			game.load.spritesheet('tvanim', 'assets/img/staticanim.png',132,336);
			game.load.spritesheet('lpanim', 'assets/img/scrollanim.png',60,36);
			game.load.spritesheet('phanim','assets/img/mlanim.png',223,407);

			game.load.atlas('media', 'assets/img/mediaanim.png', 'assets/img/mediaanim.json');

			game.load.audio('tvstatic', ['assets/audio/main/tvstatic.mp3', 'assets/audio/main/tvstatic.ogg']);
			game.load.audio('lpmusic', ['assets/audio/main/blushes.mp3', 'assets/audio/main/blushes.ogg']);
			game.load.audio('bgmusic', ['assets/audio/main/lounge.mp3', 'assets/audio/main/lounge.ogg']);
			game.load.audio('phgame', ['assets/audio/main/8bitselect.mp3', 'assets/audio/main/8bitselect.ogg']);
		},
		create: function() {
			game.stage.backgroundColor = '#000000';
			this.camera.flash('#000000', 700);
			room = game.add.sprite(0, 0, 'room');
		
			bgmusic = game.add.audio('bgmusic');
			bgmusic.loop = true;

			bgmusic.play();

		// ----------------------------------------------------------------
		// Static on TV
		// ----------------------------------------------------------------
			static = game.add.sprite(0,150,'media');
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
			scroll = game.add.sprite(600,294,'media');
			scroll.inputEnabled = true;
			scroll.alpha = 0;
			scroll.animations.add('cecil', Phaser.Animation.generateFrameNames('cecil',1,4),5,true);

			scroll.events.onInputOver.add(this.scroll, this);
			scroll.events.onInputOut.add(this.noscroll, this);
			scroll.events.onInputDown.add(this.clickLP, this);

			lpmusic = game.add.audio('lpmusic');
		// ----------------------------------------------------------------
		// Phone events
		// ----------------------------------------------------------------
			phone = game.add.sprite(650, 450, 'media');
			phone.inputEnabled = true;	
			phone.animations.add('phover1', Phaser.Animation.generateFrameNames('mlock',1,4),10,false);
			phone.animations.add('phover2', Phaser.Animation.generateFrameNames('mlock',5,7),10,false);

			phone.events.onInputOver.add(this.onHover, this);
			phone.events.onInputOut.add(this.noHover, this);
			phone.events.onInputDown.add(this.clickPhone, this);

			phgame = game.add.audio('phgame');
		},
	// ------------------------------------------------
	// Hover animations and actions for TV/Laptop/Phone
	// ------------------------------------------------
		// TV callback functions
		clickTV: function() {
			game.state.start('MiniGameA');
		},
		static: function() {
			static.alpha = 1;
			static.animations.play('TV');
		
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
			game.state.start('MiniGameD');
		},
		scroll: function() {
			scroll.alpha = 1;
			scroll.animations.play('cecil');

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

			phone.y -= 50;
			phone.animations.play('phover1');
			phgame.fadeIn();
		},
		noHover: function() {
			phone.y += 50;
			phone.animations.play('phover2');

			phgame.fadeOut();
			bgmusic.volume = 1;
		},
		clickPhone: function() {
			this.camera.flash('#000000', 1200);
			phone.kill();
			bgmusic.volume = 0;
			phgame.fadeOut();
		
			interface = game.add.sprite(225, 60, 'interface');
			interface.scale.setTo(1.2, 1.2);
			selfies = game.add.sprite(380, 200, 'icon');
			breakout = game.add.sprite(460, 295, 'icon');

			selfies.alpha = 0;
			breakout.alpha = 0;

			selfies.inputEnabled = true;
			breakout.inputEnabled = true;

			selfies.events.onInputDown.add(this.selfies, this);
			breakout.events.onInputDown.add(this.breakout, this);
		},
		selfies: function() {
			game.state.start('MiniGameB');
		},
		breakout: function() {
			game.state.start('MiniGameC');
		},
		update: function() {
			// --------------------------------------------------
			// Press 1, 2, OR 3 to switch to each mini-game state
			// --------------------------------------------------
			if(game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
				game.state.start('MiniGameA');
			}
			if(game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
				game.state.start('MiniGameB');
			}
			if(game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
				game.state.start('MiniGameC');
			}
			if(game.input.keyboard.isDown(Phaser.Keyboard.FOUR)) {
				game.state.start('MiniGameD');
			}
		},
		render: function(){
			game.debug.body(phone);
		}
	}
// define game
var game = new Phaser.Game(900, 630, Phaser.CANVAS); 

// ----------------------------------------------------------------------------------------------------------------------------------------Main Menu

var phase1 = function(game) {};
phase1.prototype = {
	preload: function() {
		game.load.image('room', 'assets/img/main/hazess.png');

		game.load.image('tv', 'assets/img/main/tvblock600.png');
		game.load.image('laptop','assets/img/main/laptopblock600.png');
		game.load.image('decoyphone', 'assets/img/main/decoyphone.png');
		
		game.load.spritesheet('tvanim', 'assets/img/main/staticanim.png',132,336);
		game.load.spritesheet('lpanim', 'assets/img/main/scrollanim.png',60,36);
		game.load.spritesheet('phanim','assets/img/main/mlanim.png',223,407);

		game.load.atlas('media', 'assets/img/main/mediaanim.png', 'assets/img/main/mediaanim.json');

		game.load.audio('tvstatic', ['assets/audio/main/lowstatic.mp3', 'assets/audio/main/lowstatic.ogg']);
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

		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.enable(scroll, Phaser.Physics.ARCADE);

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
		// scroll.body.setSize(100, 50, 50, 25);

		scroll.events.onInputOver.add(this.scroll, this);
		scroll.events.onInputOut.add(this.noscroll, this);
		scroll.events.onInputDown.add(this.clickLP, this);

		lpmusic = game.add.audio('lpmusic');
	// ----------------------------------------------------------------
	// Phone events
	// ----------------------------------------------------------------
		decoyphone = game.add.sprite(650, 500, 'decoyphone');
		phone = game.add.sprite(650, 450, 'media');
		phone.alpha = 0;
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
		tvstatic.stop();
		bgmusic.stop();
		game.state.start('miniGameA');
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
		game.state.start('dateProfiles');
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

		game.state.start('phone1');
	},
		
	update: function() {
		// --------------------------------------------------
		// Press 1, 2, OR 3 to switch to each mini-game state
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
			game.state.start('miniGameA');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
			game.state.start('miniGameB');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
			game.state.start('miniGameC');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.FIVE)) {
			game.state.start('dateProfiles')
		}
	},

	render: function(){
		// game.debug.body(phone);
		// game.debug.body(scroll);
	}
}
 	// ----------------------------------------------------------------------------------------------------------------------------------------Morning Phone

var phone1 = function(game) {};
phone1.prototype = {
	preload: function() {
		game.load.image('mornPhone', 'assets/img/interface/morningPH.png');
		game.load.image('icon', 'assets/img/interface/iconhbox.png');
		game.load.image('phop', 'assets/img/breakout/phop.png');
	},
	create: function() {
		console.log('Game Over');
		game.stage.backgroundColor = "#facade";
		game.add.sprite(0,0,'mornPhone');
		phop = game.add.sprite(240,0,'phop');
		phottom = game.add.sprite(240, 620, 'phop');
		

		icon1 = game.add.sprite(330, 315, 'icon');
		icon1.alpha = 0;
		icon1.inputEnabled = true;

		icon2 = game.add.sprite(525, 315, 'icon');
		icon2.alpha = 0;
		icon2.inputEnabled = true;


		// icon1.events.onInputDown.add(this.starShooter, this);
		icon2.events.onInputDown.add(this.breakout, this);
		icon2.events.onInputOver.add(this.hoverBreakout, this);

	},

	// starShooter: function() {
	// 	game.state.start('miniGameB');
	// },

	hoverBreakout: function() {
		icon2.input.useHandCursor = true;
	},

	breakout: function() {
		game.state.start('miniGameB');
	},
	update: function() {
		// --------------------------------------------------
		// Press SPACE for main menu
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('phase1');
		}
	}
}

	// ----------------------------------------------------------------------------------------------------------------------------------------Mini Game 1

var thots;
var counter = 0;
var text = 0;
var pressure;
var splosion;
var video;
var hitMouth;

// Mini Game 1
var miniGameA = function(game) {};
miniGameA.prototype = {
	preload: function() {
		game.load.atlas('trumpthots', 'assets/img/trumpthots.png', 'assets/img/trumpthots.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.image('mouth', 'assets/img/block.png');
		game.load.image('trump', 'assets/img/trumpface.png');
		game.load.image('trumpsplosion', 'assets/img/trumpsplosion.png');

		game.load.audio('byebing', ['assets/audio/trump/byebing.mp3', 'assets/audio/trump/byebing.ogg']);
		game.load.audio('hello', ['assets/audio/trump/hello.mp3', 'assets/audio/trump/hello.ogg']);
		game.load.audio('kachingka', ['assets/audio/trump/kachingka.mp3', 'assets/audio/trump/kachingka.ogg']);
		game.load.audio('moan', ['assets/audio/trump/moan.mp3', 'assets/audio/trump/moan.ogg']);
		game.load.audio('nyoom', ['assets/audio/trump/nyoom.mp3', 'assets/audio/trump/nyoom.ogg']);
		game.load.audio('woh', ['assets/audio/trump/woh.mp3', 'assets/audio/trump/woh.ogg']);

		game.load.audio('pressure', ['assets/audio/trump/kettle.mp3', 'assets/audio/trump/kettle.ogg']);
		game.load.audio('splosion', ['assets/audio/trump/splosion.mp3', 'assets/audio/trump/splosion.ogg'])
		game.load.video('mush', 'assets/audio/trump/mushroom.mp4');
	},
	create: function() {
		console.log('mini game');
		// Fade into state
		this.camera.flash('#000000', 700);

		game.stage.backgroundColor = "#852109";

		mouth = game.add.sprite(570,530,'mouth');
		game.physics.enable(mouth, Phaser.Physics.ARCADE);
		mouth.body.immovable = true;
		mouth.body.allowGravity = false;
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------

		game.physics.startSystem(Phaser.Physics.ARCADE);
		// game.physics.arcade.gravity.y = 50;  

		//-------------------------------------------
		// Create a group for words and 
		// enable physics on it.
		//-------------------------------------------
		thots = game.add.group();
		thots.inputEnableChildren = true;
		thots.enableBody = true;
		thots.physicsBodyType = Phaser.Physics.ARCADE;

		pressure = game.add.audio('pressure');
		splosion = game.add.audio('splosion');
		video = game.add.video('mush');
		// pressure.startTime = 50;

		//---------------------------------------
		// Load in words from atlas
		//-------------------------------------------
		for(i = 0; i < 10; i++)
		{
			// game.rnd.integerInRange(20, 650)
			var word1 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 460),'trumpthots', 'dangerous');
			var word2 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 460),'trumpthots','tremendous');
			var word3 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 460),'trumpthots', 'tough');
			var word4 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 460),'trumpthots', 'stupid');
			var word5 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 460),'trumpthots', 'terrific');
			var word6 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 460),'trumpthots', 'smart');
			var word7 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 460),'trumpthots', 'loser');
			var word8 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 460),'trumpthots', 'weak');

			word1.inputEnabled = true;
			word1.input.enableDrag(true);

			word1.body.velocity.x = 120;
			word1.body.acceleration.x = 15;

			word1.body.bounce.x = 1;
			word1.body.bounce.y = 2.5;

			word2.inputEnabled = true;
			word2.input.enableDrag(true);

			word2.body.velocity.x = 120;
			word2.body.acceleration.x = 15;

			word2.body.bounce.x = 1;
			word2.body.bounce.y = 2.5;
			
			word3.inputEnabled = true;
			word3.input.enableDrag(true);

			word3.body.velocity.x = 120;
			word3.body.acceleration.x = 15;
			
			word3.body.bounce.x = 1;
			word3.body.bounce.y = 2.5;
			
			word4.inputEnabled = true;
			word4.input.enableDrag(true);

			word4.body.velocity.x = 120;
			word4.body.acceleration.x = 15;

			word4.body.bounce.x = 1;
			word4.body.bounce.y = 2.5;
			
			word5.inputEnabled = true;
			word5.input.enableDrag(true);

			word5.body.velocity.x = 120;
			word5.body.acceleration.x = 15;

			word5.body.bounce.x = 1;
			word5.body.bounce.y = 2.5;

			word6.inputEnabled = true;
			word6.input.enableDrag(true);

			word6.body.velocity.x = 120;
			word6.body.acceleration.x = 15;

			word6.body.bounce.x = 1;
			word6.body.bounce.y = 2.5;

			word7.inputEnabled = true;
			word7.input.enableDrag(true);

			word7.body.velocity.x = 120;
			word7.body.acceleration.x = 15;

			word7.body.bounce.x = 1;
			word7.body.bounce.y = 2.5;
			
			word8.inputEnabled = true;
			word8.input.enableDrag(true);

			word8.body.velocity.x = 120;
			word8.body.acceleration.x = 15;

			word8.body.bounce.x = 1;
			word8.body.bounce.y = 2.5;
		}
			// "listen" to the group events
			thots.onChildInputOver.add(this.onOver, this);
			thots.onChildInputOut.add(this.onOut, this);

			trump = game.add.sprite(0, 0,'trump');
			trump.scale.setTo(1.2,1.2);
			trumpstruction = game.add.text(200, 10, 
				"Click and drag words into the President's mouth.",
				{font: '25px Helvetica', fill: '#D5D5D5'});

			trumpstruction.alpha = 0;

			game.add.tween(trumpstruction).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);

			game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
	},

	updateCounter: function() {
		counter ++;
		// text.setText('Counter: ' + counter);

		if(counter == 10)
		{
			pressure.play();
			pressure.volume = 0.5;
			pressure._sound.playbackRate.value -= 0.5;
		}
		if(counter == 66)
		{
			trumpsplosion = game.add.sprite(0,0, 'trumpsplosion');
			trumpsplosion.scale.setTo(1.2,1.2);
			trumpsplosion.alpha = 0;
			game.add.tween(trumpsplosion).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
		}
		if(counter == 67) 
		{
			splosion.play();
			video.play();
			video.addToWorld(game.width-950,game.height - 700,0,0, 3.5,3.5);
		}
		if(counter == 72)
		{
			game.state.start('phaser1');	
		}
	},

	onOver: function(word) {
		word.tint = 0x00ff00;
	},

	onOut: function(word) {
		word.tint = 0xffffff;
	},

	update: function() {
		// --------------------------------------------------
		// Make all words wrap
		// --------------------------------------------------
		game.world.wrapAll(thots);

		game.physics.arcade.overlap(thots,mouth,this.begoneThot,null,this);

		// --------------------------------------------------
		// Press SPACE for main menu
		// Press ESC for game over
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('phase1');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('GameOver');
		} 
	},

	begoneThot: function(mouth, word) {
		// Kill the word sprite
		word.kill();

		// Update counter

		// List of random sounds
		byebing = game.add.audio('byebing');
		hello = game.add.audio('hello');
		kachingka = game.add.audio('kachingka');
		moan = game.add.audio('moan');
		nyoom = game.add.audio('nyoom');
		woh = game.add.audio('woh');
		// Put sounds into array
		grunts = [byebing, hello, kachingka, moan, nyoom, woh];
		// Get a random item from the array
		randomGrunt = Phaser.ArrayUtils.getRandomItem(grunts, 0, grunts.length);
		// Play that random item
		randomGrunt.play();
	}
}
	// ----------------------------------------------------------------------------------------------------------------------------------------Mini Game 2


	// ----------------------------------------------------------------------------------------------------------------------------------------Mini Game 3

var scoreText;
var score = 0;

var paddle;
var ball;
var ball2;
var ball3;
var ball4;
var ball5;
var bricks;

var counter = 0;
var text = 0;

var miniGameB = function(game) {};
miniGameB.prototype = {
	preload: function() {
		game.load.atlas('breakout', 'assets/img/breakout/breakout.png', 'assets/img/breakout/breakout.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

		game.load.image('phedge1', 'assets/img/breakout/phedge1.png');
	    game.load.image('phedge2', 'assets/img/breakout/phedge2.png');
	    game.load.image('bg', 'assets/img/breakout/redsea.png');
	    game.load.image('phop', 'assets/img/breakout/phop.png');
	},
	create: function() {
		console.log('mini game');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.world.enableBody = true;

		left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		paddle = game.add.sprite(200, 550, 'breakout', 'paddle');

		paddle.body.immovable = true; 

		bricks = game.add.group();

		game.time.events.loop(Phaser.Timer.QUARTER, this.updateCounter, this);

		for (var i = 0; i < 10; i++){
			for (var j = 0; j < 10; j++){
				var brick = game.add.sprite(185 + i * 60, 50 + j * 35, 'breakout', 'brick');

				brick.body.immovable = true;

				bricks.add(brick);
			}
		}

		ball = game.add.sprite(450, 350, 'breakout', 'ball');

		ball.body.velocity.x = 200;
		ball.body.velocity.y = 200;

		ball.body.bounce.setTo(1);
		ball.body.collideWorldBounds = true;

	    phedge1 = game.add.sprite(240, 0, 'phedge1');
	    phedge2 = game.add.sprite(650, 0, 'phedge2');
		phedge1.body.immovable = true;
		phedge2.body.immovable = true;

		game.add.sprite(0,0, 'bg');
		phop = game.add.sprite(240,0,'phop');
		phottom = game.add.sprite(240, 620, 'phop');
		phottom.body.immovable = true;

		scoreText = game.add.text(400, 20, 'score: 0', { font: "20px Arial", fill: "#ffffff"});
    },

	updateCounter: function() {
		counter++;
	},
	update: function() {
		paddle.x = game.input.x;

	    if (paddle.x < 24)
	    {
	        paddle.x = 24;
	    }
	    else if (paddle.x > game.width - 24)
	    {
	        paddle.x = game.width - 24;
	    }

   		game.physics.arcade.collide(paddle, phedge1);
		game.physics.arcade.collide(paddle, phedge2);

		// balls collide with paddle
		game.physics.arcade.collide(paddle, ball);
		game.physics.arcade.collide(paddle, ball2);
		game.physics.arcade.collide(paddle, ball3);
		game.physics.arcade.collide(paddle, ball4);
		game.physics.arcade.collide(paddle, ball5);

		// balls destroy bricks 
		game.physics.arcade.collide(ball, bricks, this.hit, null, this);
		game.physics.arcade.collide(ball2, bricks, this.hit, null, this);
		game.physics.arcade.collide(ball3, bricks, this.hit, null, this);
		game.physics.arcade.collide(ball4, bricks, this.hit, null, this);
		game.physics.arcade.collide(ball5, bricks, this.hit, null, this);

		// make all balls collide with phone edge
		game.physics.arcade.collide(ball, phedge1);
		game.physics.arcade.collide(ball, phedge2);
		game.physics.arcade.collide(ball, phop);
		game.physics.arcade.collide(ball, phottom, this.hitFloor, null, this);


		game.physics.arcade.collide(ball2, phedge1);
		game.physics.arcade.collide(ball2, phedge2);
		game.physics.arcade.collide(ball2, phop);
		game.physics.arcade.collide(ball2, phottom, this.hitFloor, null, this);

		game.physics.arcade.collide(ball3, phedge1);
		game.physics.arcade.collide(ball3, phedge2);
		game.physics.arcade.collide(ball3, phop);
		game.physics.arcade.collide(ball3, phottom, this.hitFloor, null, this);

		game.physics.arcade.collide(ball4, phedge1);
		game.physics.arcade.collide(ball4, phedge2);
		game.physics.arcade.collide(ball4, phop);
		game.physics.arcade.collide(ball4, phottom, this.hitFloor, null, this);

		game.physics.arcade.collide(ball5, phedge1);
		game.physics.arcade.collide(ball5, phedge2);
		game.physics.arcade.collide(ball5, phop);
		game.physics.arcade.collide(ball5, phottom, this.hitFloor, null, this);


		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('phase1');
			phgame.stop();
			score = 0;
		}
	},

	hit: function(ball, brick)  {
		brick.kill();
		score += 10;
    	scoreText.text = 'Score: ' + score;

    	if (score == 100)
    	{
    		ball2 = game.add.sprite(450, 350, 'breakout', 'blueball')

			ball2.body.velocity.x = 200;
			ball2.body.velocity.y = 200;

			ball2.body.bounce.setTo(1);
			ball2.body.collideWorldBounds = true;

    	}

    	if (score == 200)
    	{
    		ball3 = game.add.sprite(450, 350, 'breakout', 'blueball')

			ball3.body.velocity.x = 200;
			ball3.body.velocity.y = 200;

			ball3.body.bounce.setTo(1);
			ball3.body.collideWorldBounds = true;

   		}

   		if (score == 400)
   		{
   			ball4 = game.add.sprite(450,350,'breakout','reball');

			ball4.body.velocity.x = 200;
			ball4.body.velocity.y = 200;

			ball4.body.bounce.setTo(1);
			ball4.body.collideWorldBounds = true;


   		}

   		if (score == 550)
   		{
   			ball5 = game.add.sprite(450,350,'breakout', 'reball');


			ball5.body.velocity.x = 200;
			ball5.body.velocity.y = 200;

			ball5.body.bounce.setTo(1);
			ball5.body.collideWorldBounds = true;
   		}


    	if (score == 700)
    	{
	    	for (var i = 0; i < 10; i++){
				for (var j = 0; j < 10; j++){
					var brick = game.add.sprite(185 + i * 60, 50 + j * 35, 'breakout', 'redbrick');

					brick.body.immovable = true;

					bricks.add(brick);
				}
			}

    	}

    	if (score == 1400)
    	{
    		for (var i = 0; i < 10; i++){
				for (var j = 0; j < 10; j++){
					var brick = game.add.sprite(185 + i * 60, 50 + j * 35, 'breakout', 'bluebrick');

					brick.body.immovable = true;

					bricks.add(brick);
				}
			}

    	}

    	if (score == 2100)
    	{
    		for (var i = 0; i < 10; i++){
				for (var j = 0; j < 10; j++){
					var brick = game.add.sprite(185 + i * 60, 50 + j * 35, 'breakout', 'greenbrick');

					brick.body.immovable = true;

					bricks.add(brick);
				}
			}
    	}



	},

	hitFloor: function(ball) {
		ball.kill();
		game.add.text(330, game.world.centerY, 'GAME OVER!', { font: "40px Arial", fill: "#b784a7"});
		counter = 0;
	}
}
	
	// ----------------------------------------------------------------------------------------------------------------------------------------MINI GAME DICK

// var player;
// var greenEnemies;
// var blueEnemies;
// var enemyBullets;
// var starfield;
// var cursors;
// var bank;
// var shipTrail;
// var explosions;
// var playerDeath;
// var bullets;
// var fireButton;
// var bulletTimer = 0;
// var shields;
// var score = 0;
// var scoreText;
// var greenEnemyLaunchTimer;
// var greenEnemySpacing = 1000;
// var blueEnemyLaunchTimer;
// var blueEnemyLaunched = false;
// var blueEnemySpacing = 2500;
// var bossLaunchTimer;
// var bossLaunched = false;
// var bossSpacing = 20000;
// var bossBulletTimer = 0;
// var bossYdirection = -1;
// var gameOver;


// var ACCLERATION = 600;
// var DRAG = 400;
// var MAXSPEED = 400;

var miniGameC = function(game) {};
miniGameC.prototype = {
	preload: function() {
	    // game.load.image('starfield', 'assets/img/shooter/starfield.png');
	    // game.load.image('ship', 'assets/img/shooter/ship.png');
	    // game.load.image('bullet', 'https://raw.githubusercontent.com/jschomay/phaser-demo-game/master/assets/bullet.png');
	    // game.load.image('enemy-green', 'https://raw.githubusercontent.com/jschomay/phaser-demo-game/master/assets/enemy-green.png');
	    // game.load.image('enemy-blue', 'https://raw.githubusercontent.com/jschomay/phaser-demo-game/master/assets/enemy-blue.png');
	    // game.load.image('blueEnemyBullet', 'https://raw.githubusercontent.com/jschomay/phaser-demo-game/master/assets/enemy-blue-bullet.png');
	    // game.load.spritesheet('explosion', 'https://raw.githubusercontent.com/jschomay/phaser-demo-game/master/assets/explode.png', 128, 128);
	    // game.load.bitmapFont('spacefont', 'https://raw.githubusercontent.com/jschomay/phaser-demo-game/master/assets/spacefont/spacefont.png', 'https://rawgit.com/jschomay/phaser-demo-game/master/assets/spacefont/spacefont.xml');  
	    // game.load.image('boss', 'assets/img/shooter/bauship.png');
	    // game.load.image('deathRay', 'https://raw.githubusercontent.com/jschomay/phaser-demo-game/master/assets/death-ray.png')
	    // game.load.image('phedge1', 'assets/img/shooter/phedge1.png');
	    // game.load.image('phedge2', 'assets/img/shooter/phedge2.png');
	    // game.load.image('bg', 'assets/img/shooter/space600.png');
	},

	create: function() {
	//     //  The scrolling starfield background
	//     game.stage.backgroundColor = '#ffffff';
	//     starfield = game.add.tileSprite(240, 0, 420,630, 'starfield');

	//     //  Our bullet group
	//     bullets = game.add.group();
	//     bullets.enableBody = true;
	//     bullets.physicsBodyType = Phaser.Physics.ARCADE;
	//     bullets.createMultiple(30, 'bullet');
	//     bullets.setAll('anchor.x', 0.5);
	//     bullets.setAll('anchor.y', 1);
	//     bullets.setAll('outOfBoundsKill', true);
	//     bullets.setAll('checkWorldBounds', true);

	//     //  The hero!
	//     player = game.add.sprite(400, 500, 'ship');
	//     player.health = 100;
	//     player.anchor.setTo(0.5, 0.5);
	//     game.physics.enable(player, Phaser.Physics.ARCADE);
	//     player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
	//     player.body.drag.setTo(DRAG, DRAG);
	//     player.weaponLevel = 1;
	//     player.events.onKilled.add(function(){
	//         shipTrail.kill();
	//     });

	//     player.events.onRevived.add(function(){
	//         shipTrail.start(false, 5000, 10);
	//     });

	//     //  The baddies!
	//     greenEnemies = game.add.group();
	//     greenEnemies.enableBody = true;
	//     greenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
	//     greenEnemies.createMultiple(5, 'enemy-green');
	//     greenEnemies.setAll('anchor.x', 0.5);
	//     greenEnemies.setAll('anchor.y', 0.5);
	//     greenEnemies.setAll('scale.x', 0.5);
	//     greenEnemies.setAll('scale.y', 0.5);
	//     greenEnemies.setAll('angle', 180);
	//     greenEnemies.forEach(function(enemy){
	//         addEnemyEmitterTrail(enemy);
	//         enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
	//         enemy.damageAmount = 20;
	//         enemy.events.onKilled.add(function(){
	//             enemy.trail.kill();
	//         });
	//     });

	//     game.time.events.add(1000, launchGreenEnemy);

	//     //  Blue enemy's bullets
	//     blueEnemyBullets = game.add.group();
	//     blueEnemyBullets.enableBody = true;
	//     blueEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
	//     blueEnemyBullets.createMultiple(30, 'blueEnemyBullet');
	//     blueEnemyBullets.callAll('crop', null, {x: 90, y: 0, width: 90, height: 70});
	//     blueEnemyBullets.setAll('alpha', 0.9);
	//     blueEnemyBullets.setAll('anchor.x', 0.5);
	//     blueEnemyBullets.setAll('anchor.y', 0.5);
	//     blueEnemyBullets.setAll('outOfBoundsKill', true);
	//     blueEnemyBullets.setAll('checkWorldBounds', true);
	//     blueEnemyBullets.forEach(function(enemy){
	//         enemy.body.setSize(20, 20);
	//     });

	//     //  More baddies!
	//     blueEnemies = game.add.group();
	//     blueEnemies.enableBody = true;
	//     blueEnemies.physicsBodyType = Phaser.Physics.ARCADE;
	//     blueEnemies.createMultiple(30, 'enemy-blue');
	//     blueEnemies.setAll('anchor.x', 0.5);
	//     blueEnemies.setAll('anchor.y', 0.5);
	//     blueEnemies.setAll('scale.x', 0.5);
	//     blueEnemies.setAll('scale.y', 0.5);
	//     blueEnemies.setAll('angle', 180);
	//     blueEnemies.forEach(function(enemy){
	//         enemy.damageAmount = 40;
	//     });

	//     //  The boss
	//     boss = game.add.sprite(0, 0, 'boss');
	//     boss.exists = false;
	//     boss.alive = false;
	//     boss.anchor.setTo(0.5, 0.5);
	//     boss.damageAmount = 50;
	//     boss.angle = 180;
	//     boss.scale.x = 0.6;
	//     boss.scale.y = 0.6;
	//     game.physics.enable(boss, Phaser.Physics.ARCADE);
	//     boss.body.maxVelocity.setTo(100, 80);
	//     boss.dying = false;
	//     boss.finishOff = function() {
	//         if (!boss.dying) {
	//             boss.dying = true;
	//             bossDeath.x = boss.x;
	//             bossDeath.y = boss.y;
	//             bossDeath.start(false, 1000, 50, 20);
	//             //  kill boss after explotions
	//             game.time.events.add(1000, function(){
	//                 var explosion = explosions.getFirstExists(false);
	//                 var beforeScaleX = explosions.scale.x;
	//                 var beforeScaleY = explosions.scale.y;
	//                 var beforeAlpha = explosions.alpha;
	//                 explosion.reset(boss.body.x + boss.body.halfWidth, boss.body.y + boss.body.halfHeight);
	//                 explosion.alpha = 0.4;
	//                 explosion.scale.x = 3;
	//                 explosion.scale.y = 3;
	//                 var animation = explosion.play('explosion', 30, false, true);
	//                 animation.onComplete.addOnce(function(){
	//                     explosion.scale.x = beforeScaleX;
	//                     explosion.scale.y = beforeScaleY;
	//                     explosion.alpha = beforeAlpha;
	//                 });
	//                 boss.kill();
	//                 booster.kill();
	//                 boss.dying = false;
	//                 bossDeath.on = false;
	//                 //  queue next boss
	//                 bossLaunchTimer = game.time.events.add(game.rnd.integerInRange(bossSpacing, bossSpacing + 5000), launchBoss);
	//             });

	//             //  reset pacing for other enemies
	//             blueEnemySpacing = 2500;
	//             greenEnemySpacing = 1000;

	//             //  give some bonus health
	//             player.health = Math.min(100, player.health + 40);
	//             shields.render();
	//         }
	//     };

	//     //  Boss death ray
	//     function addRay(leftRight) {
	//         var ray = game.add.sprite(leftRight * boss.width * 0.75, 0, 'deathRay');
	//         ray.alive = false;
	//         ray.visible = false;
	//         boss.addChild(ray);
	//         ray.crop({x: 0, y: 0, width: 40, height: 40});
	//         ray.anchor.x = 0.5;
	//         ray.anchor.y = 0.5;
	//         ray.scale.x = 2.5;
	//         ray.damageAmount = boss.damageAmount;
	//         game.physics.enable(ray, Phaser.Physics.ARCADE);
	//         ray.body.setSize(ray.width / 5, ray.height / 4);
	//         ray.update = function() {
	//             this.alpha = game.rnd.realInRange(0.6, 1);
	//         };
	//         boss['ray' + (leftRight > 0 ? 'Right' : 'Left')] = ray;
	//     }
	//     addRay(1);
	//     addRay(-1);
	//     //  need to add the ship texture to the group so it renders over the rays
	//     var ship = game.add.sprite(0, 0, 'boss');
	//     ship.anchor = {x: 0.5, y: 0.5};
	//     boss.addChild(ship);

	//     boss.fire = function() {
	//         if (game.time.now > bossBulletTimer) {
	//             var raySpacing = 3000;
	//             var chargeTime = 1500;
	//             var rayTime = 1500;

	//             function chargeAndShoot(side) {
	//                 ray = boss['ray' + side];
	//                 ray.name = side
	//                 ray.revive();
	//                 ray.y = 80;
	//                 ray.alpha = 0;
	//                 ray.scale.y = 13;
	//                 game.add.tween(ray).to({alpha: 1}, chargeTime, Phaser.Easing.Linear.In, true).onComplete.add(function(ray){
	//                     ray.scale.y = 150;
	//                     game.add.tween(ray).to({y: -1500}, rayTime, Phaser.Easing.Linear.In, true).onComplete.add(function(ray){
	//                         ray.kill();
	//                     });
	//                 });
	//             }
	//             chargeAndShoot('Right');
	//             chargeAndShoot('Left');

	//             bossBulletTimer = game.time.now + raySpacing;
	//         }
	//     };

	//     boss.update = function() {
	//       if (!boss.alive) return;

	//       boss.rayLeft.update();
	//       boss.rayRight.update();

	//       if (boss.y > 140) {
	//         boss.body.acceleration.y = -50;
	//       }
	//       if (boss.y < 140) {
	//         boss.body.acceleration.y = 50;
	//       }
	//       if (boss.x > player.x + 50) {
	//         boss.body.acceleration.x = -50;
	//       } else if (boss.x < player.x - 50) {
	//         boss.body.acceleration.x = 50;
	//       } else {
	//         boss.body.acceleration.x = 0;
	//       }

	//       //  Squish and rotate boss for illusion of "banking"
	//       var bank = boss.body.velocity.x / MAXSPEED;
	//       boss.scale.x = 0.6 - Math.abs(bank) / 3;
	//       boss.angle = 180 - bank * 20;

	//       booster.x = boss.x + -5 * bank;
	//       booster.y = boss.y + 10 * Math.abs(bank) - boss.height / 2;

	//       //  fire if player is in target
	//       var angleToPlayer = game.math.radToDeg(game.physics.arcade.angleBetween(boss, player)) - 90;
	//       var anglePointing = 180 - Math.abs(boss.angle);
	//       if (anglePointing - angleToPlayer < 18) {
	//           boss.fire();
	//       }
	//     }

	//     //  boss's boosters
	//     booster = game.add.emitter(boss.body.x, boss.body.y - boss.height / 2);
	//     booster.width = 0;
	//     booster.makeParticles('blueEnemyBullet');
	//     booster.forEach(function(p){
	//       p.crop({x: 120, y: 0, width: 45, height: 50});
	//       //  clever way of making 2 exhaust trails by shifing particles randomly left or right
	//       p.anchor.x = game.rnd.pick([1,-1]) * 0.95 + 0.5;
	//       p.anchor.y = 0.75;
	//     });
	//     booster.setXSpeed(0, 0);
	//     booster.setRotation(0,0);
	//     booster.setYSpeed(-30, -50);
	//     booster.gravity = 0;
	//     booster.setAlpha(1, 0.1, 400);
	//     booster.setScale(0.3, 0, 0.7, 0, 5000, Phaser.Easing.Quadratic.Out);
	//     boss.bringToTop();


	//     // game.time.events.add(1000, launchBlueEnemy);

	//     //  And some controls to play the game with
	//     cursors = game.input.keyboard.createCursorKeys();
	//     fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	//     //  Add an emitter for the ship's trail
	//     shipTrail = game.add.emitter(player.x, player.y + 10, 400);
	//     shipTrail.width = 10;
	//     shipTrail.makeParticles('bullet');
	//     shipTrail.setXSpeed(30, -30);
	//     shipTrail.setYSpeed(200, 180);
	//     shipTrail.setRotation(50,-50);
	//     shipTrail.setAlpha(1, 0.01, 800);
	//     shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
	//     shipTrail.start(false, 5000, 10);

	//     //  An explosion pool
	//     explosions = game.add.group();
	//     explosions.enableBody = true;
	//     explosions.physicsBodyType = Phaser.Physics.ARCADE;
	//     explosions.createMultiple(30, 'explosion');
	//     explosions.setAll('anchor.x', 0.5);
	//     explosions.setAll('anchor.y', 0.5);
	//     explosions.forEach( function(explosion) {
	//         explosion.animations.add('explosion');
	//     });

	//     playerDeath = game.add.emitter(player.x, player.y);
	//     playerDeath.width = 50;
	//     playerDeath.height = 50;
	//     playerDeath.makeParticles('explosion', [0,1,2,3,4,5,6,7], 10);
	//     playerDeath.setAlpha(0.9, 0, 800);
	//     playerDeath.setScale(0.1, 0.6, 0.1, 0.6, 1000, Phaser.Easing.Quintic.Out);

	//     //  Big explosion for boss
	//     bossDeath = game.add.emitter(boss.x, boss.y);
	//     bossDeath.width = boss.width / 2;
	//     bossDeath.height = boss.height / 2;
	//     bossDeath.makeParticles('explosion', [0,1,2,3,4,5,6,7], 20);
	//     bossDeath.setAlpha(0.9, 0, 900);
	//     bossDeath.setScale(0.3, 1.0, 0.3, 1.0, 1000, Phaser.Easing.Quintic.Out);

	//     //  Shields stat
	//     shields = game.add.bitmapText(game.world.width - 250, 10, 'spacefont', '' + player.health +'%', 30);
	//     shields.render = function () {
	//         shields.text = 'Shields: ' + Math.max(player.health, 0) +'%';
	//     };
	//     shields.render();

	//     //  Score
	//     scoreText = game.add.bitmapText(10, 10, 'spacefont', '', 30);
	//     scoreText.render = function () {
	//         scoreText.text = 'Score: ' + score;
	//     };
	//     scoreText.render();

	//     //  Game over text
	//     gameOver = game.add.bitmapText(460, game.world.centerY, 'spacefont', 'GAME OVER!', 50);
	//     gameOver.x = gameOver.x - gameOver.textWidth / 2;
	//     gameOver.y = gameOver.y - gameOver.textHeight / 3;
	//     gameOver.visible = false;
	// // ------------------------------------------------------------------------------------------------------------------------------------
	//     var phedge1 = game.add.sprite(240, 0, 'phedge1');
	//     var phedge2 = game.add.sprite(650, 0, 'phedge2');
	//     game.physics.enable(phedge1, Phaser.Physics.ARCADE);
	//     game.physics.enable(phedge2, Phaser.Physics.ARCADE);
	// 	phedge1.body.immovable = true;
	// 	phedge2.body.immovable = true;

	// 	game.add.sprite(0,0, 'bg');
	// ------------------------------------------------------------------------------------------------------------------------------------
	},

	update: function() {
	//     //  Scroll the background
	//     starfield.tilePosition.y += 2;

	//     //  Reset the player, then check for movement keys
	//     player.body.acceleration.x = 0;

	//     // if (cursors.left.isDown)
	//     // {
	//     //     player.body.acceleration.x = -ACCLERATION;
	//     // }
	//     // else if (cursors.right.isDown)
	//     // {
	//     //     player.body.acceleration.x = ACCLERATION;
	//     // }

	//     //  Stop at screen edges
	//     if (player.x > game.width - 50) {
	//         player.x = game.width - 50;
	//         player.body.acceleration.x = 0;
	//     }
	//     if (player.x < 50) {
	//         player.x = 50;
	//         player.body.acceleration.x = 0;
	//     }

	//     //  Fire bullet
	   
	//     if (player.alive && game.input.activePointer.isDown) {
	//         fireBullet();
	//     }

	//     //  Move ship towards mouse pointer
	//     if (game.input.x < game.width - 20 &&
	//         game.input.x > 20 &&
	//         game.input.y > 20 &&
	//         game.input.y < game.height - 20) {
	//         var minDist = 200;
	//         var dist = game.input.x - player.x;
	//         player.body.velocity.x = MAXSPEED * game.math.clamp(dist / minDist, -1, 1);
	//     }

	//     //  Squish and rotate ship for illusion of "banking"
	//     bank = player.body.velocity.x / MAXSPEED;
	//     player.scale.x = 1 - Math.abs(bank) / 2;
	//     player.angle = bank * 30;

	//     //  Keep the shipTrail lined up with the ship
	//     shipTrail.x = player.x;

	//     game.physics.arcade.collide(player, phedge1);
	//     game.physics.arcade.collide(player, phedge2);

	//     game.physics.arcade.overlap(player, greenEnemies, this.shipCollide, null, this);
	//     game.physics.arcade.overlap(greenEnemies, bullets, this.hitEnemy, null, this);

	//     game.physics.arcade.overlap(player, blueEnemies, this.shipCollide, null, this);
	//     game.physics.arcade.overlap(blueEnemies, bullets, this.hitEnemy, null, this);

	//     game.physics.arcade.overlap(blueEnemyBullets, player, this.enemyHitsPlayer, null, this);

	//     game.physics.arcade.overlap(boss, bullets, hitEnemy, this.bossHitTest, this);
	//     game.physics.arcade.overlap(player, boss.rayLeft, this.enemyHitsPlayer, null, this);
	//     game.physics.arcade.overlap(player, boss.rayRight, this.enemyHitsPlayer, null, this);

	//     //  Game over?
	//     if (! player.alive && gameOver.visible === false) {
	//         gameOver.visible = true;
	//         gameOver.alpha = 0;
	//         function setResetHandlers() {
	//             //  The "click to restart" handler
	//             tapRestart = game.input.onTap.addOnce(_restart,this);
	//             spaceRestart = fireButton.onDown.addOnce(_restart,this);
	//             function _restart() {
	//               tapRestart.detach();
	//               spaceRestart.detach();
	//               restart();
	//             }
	//         }
	//         var fadeInGameOver = game.add.tween(gameOver);
	//         fadeInGameOver.to({alpha: 1}, 1000, Phaser.Easing.Quintic.Out);
	//         fadeInGameOver.onComplete.add(setResetHandlers);
	//         fadeInGameOver.start();
	//     }
	// },

	// killBullets: function(bullets, phone) {
	// 	phone.kill(bullets);
	// },
	// render: function () {
	// 	// game.debug.body(phedge1);
	// 	// game.debug.body(phedge2);
	//     // for (var i = 0; i < greenEnemies.length; i++)
	//     // {
	//     //     game.debug.body(greenEnemies.children[i]);
	//     // }
	//     // game.debug.body(player);
	// },

	// fireBullet: function() {
	// 		switch (player.weaponLevel) {
	//         case 1:
	//         //  To avoid them being allowed to fire too fast we set a time limit
	//         if (game.time.now > bulletTimer)
	//         {
	//             var BULLET_SPEED = 400;
	//             var BULLET_SPACING = 250;
	//             //  Grab the first bullet we can from the pool
	//             var bullet = bullets.getFirstExists(false);

	//             if (bullet)
	//             {
	//                 //  And fire it
	//                 //  Make bullet come out of tip of ship with right angle
	//                 var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
	//                 bullet.reset(player.x + bulletOffset, player.y);
	//                 bullet.angle = player.angle;
	//                 game.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
	//                 bullet.body.velocity.x += player.body.velocity.x;

	//                 bulletTimer = game.time.now + BULLET_SPACING;
	//             }
	//         }
	//         break;

	//         case 2:
	//         if (game.time.now > bulletTimer) {
	//             var BULLET_SPEED = 400;
	//             var BULLET_SPACING = 550;


	//             for (var i = 0; i < 3; i++) {
	//                 var bullet = bullets.getFirstExists(false);
	//                 if (bullet) {
	//                     //  Make bullet come out of tip of ship with right angle
	//                     var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
	//                     bullet.reset(player.x + bulletOffset, player.y);
	//                     //  "Spread" angle of 1st and 3rd bullets
	//                     var spreadAngle;
	//                     if (i === 0) spreadAngle = -20;
	//                     if (i === 1) spreadAngle = 0;
	//                     if (i === 2) spreadAngle = 20;
	//                     bullet.angle = player.angle + spreadAngle;
	//                     game.physics.arcade.velocityFromAngle(spreadAngle - 90, BULLET_SPEED, bullet.body.velocity);
	//                     bullet.body.velocity.x += player.body.velocity.x;
	//                 }
	//                 bulletTimer = game.time.now + BULLET_SPACING;
	//             }
	//         }
	//     }
	// },



	// launchGreenEnemy: function() {
	//     var ENEMY_SPEED = 300;

	//     var enemy = greenEnemies.getFirstExists(false);
	//     if (enemy) {
	//         enemy.reset(game.rnd.integerInRange(284, 626), -20);
	//         enemy.body.velocity.x = game.rnd.integerInRange(-300, 300);
	//         enemy.body.velocity.y = ENEMY_SPEED;
	//         enemy.body.drag.x = 100;

	//         enemy.trail.start(false, 800, 1);

	//         //  Update function for each enemy ship to update rotation etc
	//         enemy.update = function(){
	//           enemy.angle = 180 - game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));

	//           enemy.trail.x = enemy.x;
	//           enemy.trail.y = enemy.y -10;

	//           //  Kill enemies once they go off screen
	//           if (enemy.y > game.height + 200) {
	//             enemy.kill();
	//             enemy.y = -20;
	//           }
	//         }
	//     }

	//     //  Send another enemy soon
	//     // greenEnemyLaunchTimer = game.time.events.add(game.rnd.integerInRange(MIN_ENEMY_SPACING, MAX_ENEMY_SPACING), launchGreenEnemy);
	//     greenEnemyLaunchTimer = game.time.events.add(game.rnd.integerInRange(greenEnemySpacing, greenEnemySpacing + 1000), launchGreenEnemy);
	// },

	// launchBlueEnemy: function() {
	//     // var startingX = game.rnd.integerInRange(100, game.width - 100);
	//     var startingX = game.rnd.integerInRange(284, 626);
	//     var verticalSpeed = 180;
	//     var spread = 60;
	//     var frequency = 70;
	//     var verticalSpacing = 70;
	//     var numEnemiesInWave = 5;
	//     // var timeBetweenWaves = 2500;

	//     //  Launch wave
	//     for (var i =0; i < numEnemiesInWave; i++) {
	//         var enemy = blueEnemies.getFirstExists(false);
	//         if (enemy) {
	//             enemy.startingX = startingX;
	//             enemy.reset(game.width / 2, -verticalSpacing * i);
	//             enemy.body.velocity.y = verticalSpeed;

	//             //  Set up firing
	//             var bulletSpeed = 400;
	//             var firingDelay = 2000;
	//             enemy.bullets = 1;
	//             enemy.lastShot = 0;

	//             //  Update function for each enemy
	//             enemy.update = function(){
	//               //  Wave movement
	//               this.body.x = this.startingX + Math.sin((this.y) / frequency) * spread;

	//               //  Squish and rotate ship for illusion of "banking"
	//               bank = Math.cos((this.y + 60) / frequency)
	//               this.scale.x = 0.5 - Math.abs(bank) / 8;
	//               this.angle = 180 - bank * 2;

	//               //  Fire
	//               enemyBullet = blueEnemyBullets.getFirstExists(false);
	//               if (enemyBullet &&
	//                   this.alive &&
	//                   this.bullets &&
	//                   this.y > game.width / 8 &&
	//                   game.time.now > firingDelay + this.lastShot) {
	//                     this.lastShot = game.time.now;
	//                     this.bullets--;
	//                     enemyBullet.reset(this.x, this.y + this.height / 2);
	//                     enemyBullet.damageAmount = this.damageAmount;
	//                     var angle = game.physics.arcade.moveToObject(enemyBullet, player, bulletSpeed);
	//                     enemyBullet.angle = game.math.radToDeg(angle);
	//                 }

	//               //  Kill enemies once they go off screen
	//               if (this.y > game.height + 200) {
	//                 this.kill();
	//                 this.y = -20;
	//               }
	//             };
	//         }
	//     }

	//     //  Send another wave soon
	//     blueEnemyLaunchTimer = game.time.events.add(game.rnd.integerInRange(blueEnemySpacing, blueEnemySpacing + 4000), launchBlueEnemy);
	// },

	// launchBoss: function() {
	// 	boss.reset(game.width / 2, -boss.height);
	// 	booster.start(false, 1000, 10);
	// 	boss.health = 1000;
	// 	bossBulletTimer = game.time.now + 5000;
	// },

	// addEnemyEmitterTrail: function(enemy) {
	//     var enemyTrail = game.add.emitter(enemy.x, player.y - 10, 100);
	//     enemyTrail.width = 10;
	//     enemyTrail.makeParticles('explosion', [1,2,3,4,5]);
	//     enemyTrail.setXSpeed(20, -20);
	//     enemyTrail.setRotation(50,-50);
	//     enemyTrail.setAlpha(0.4, 0, 800);
	//     enemyTrail.setScale(0.01, 0.1, 0.01, 0.1, 1000, Phaser.Easing.Quintic.Out);
	//     enemy.trail = enemyTrail;
	// },


	// shipCollide: function(player, enemy) {
	//     enemy.kill();

	//     player.damage(enemy.damageAmount);
	//     shields.render();

	//     if (player.alive) 
	//     {
	//     	var explosion = explosions.getFirstExists(false);
	//     	explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
	//     	explosion.alpha = 0.7;
	//     	explosion.play('explosion', 30, false, true);
	//     } else {
	//     	playerDeath.x = player.x;
	//     	playerDeath.y = player.y;
	//     	playerDeath.start(false, 1000, 10, 10);
	//     }
	// },


	// hitEnemy: function(enemy, bullet) {
	//     var explosion = explosions.getFirstExists(false);
	//     explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
	//     explosion.body.velocity.y = enemy.body.velocity.y;
	//     explosion.alpha = 0.7;
	//     explosion.play('explosion', 30, false, true);

	//     if (enemy.finishOff && enemy.health < 5) {
	//       enemy.finishOff();
	//     } else {
	//         enemy.damage(enemy.damageAmount);
	//     }
	//     bullet.kill();

	//     // Increase score
	//     score += enemy.damageAmount * 10;
	//     scoreText.render();

	//     greenEnemySpacing *= 0.9;
	//     if (!blueEnemyLaunched && score > 1000) {
	//     	blueEnemyLaunched = true;
	//     	launchBlueEnemy();
	//     	greenEnemySpacing *= 2;
	//     }

	//         //  Launch boss
	//     if (!bossLaunched && score > 15000) {
	//         greenEnemySpacing = 5000;
	//         blueEnemySpacing = 12000;
	//         //  dramatic pause before boss
	//         game.time.events.add(2000, function(){
	//           bossLaunched = true;
	//           launchBoss();
	//         });
	//     }

	//     if (score > 5000 && player.weaponLevel < 2) {
	//     	player.weaponLevel = 2;
	//     }
	// },

	// //  Don't count a hit in the lower right and left quarants to aproximate better collisions
	// bossHitTest: function(boss, bullet) {
	//     if ((bullet.x > boss.x + boss.width / 5 &&
	//         bullet.y > boss.y) ||
	//         (bullet.x < boss.x - boss.width / 5 &&
	//         bullet.y > boss.y)) {
	//       return false;
	//     } else {
	//       return true;
	//     }
	// },

	// enemyHitsPlayer: function(player, bullet) {
	//     // var explosion = explosions.getFirstExists(false);
	//     // explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
	//     // explosion.alpha = 0.7;
	//     // explosion.play('explosion', 30, false, true);
	//     bullet.kill();

	//     player.damage(bullet.damageAmount);
	//     shields.render()

	//     if (player.alive)
	//     {
	//     	var explosion = explosions.getFirstExists(false);
	//     	explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
	//     	explosion.alpha = 0.7;
	//     	explosion.play('explosion', 30, false, true);
	//     } else {
	//     	playerDeath.x = player.x;
	//     	playerDeath.y = player.y;
	//     	playerDeath.start(false, 1000, 10, 10);
	//     }
	// },


	// restart: function() {
	//     //  Reset the enemies
	//     greenEnemies.callAll('kill');
	//     game.time.events.remove(greenEnemyLaunchTimer);
	//     game.time.events.add(1000, launchGreenEnemy);
	//     blueEnemies.callAll('kill');
	//     blueEnemyBullets.callAll('kill');
	//     game.time.events.remove(blueEnemyLaunchTimer);
	//     boss.kill();
	//     booster.kill();
	//     game.time.events.remove(bossLaunchTimer);

	//     blueEnemies.callAll('kill');
	//     game.time.events.remove(blueEnemyLaunchTimer);
	//     //  Revive the player
	//     player.weaponLevel = 2;
	//     player.revive();
	//     player.health = 100;
	//     shields.render();
	//     score = 0;
	//     scoreText.render();

	//     //  Hide the text
	//     gameOver.visible = false;

	//     greenEnemySpacing = 1000;
	//     blueEnemyLaunched = false;
	//     bossLaunched = false;
	// }
	}
}

// var borderEd;
// var borderAlex;
// vazr borderDhani;
// var borderYash;

// var detectEd;
// var detectAlex;
// var detectDhani;
// var detectYash;

// var home;
// var hub;

var dateProfiles = function(game) {};
dateProfiles.prototype = {
	preload: function() {
	// ----------------------------------------------------------------
		
		// load in site overlay, buttons, and icon borders
		game.load.image('overlay', 'assets/img/dating/dateoverlay.png');
		game.load.image('dclick', 'assets/img/dating/detectdate.png');
		game.load.image('msgbutton', 'assets/img/dating/message.png');
		game.load.image('iconbrdr', 'assets/img/dating/tintthis.png');

	// ----------------------------------------------------------------

		// Load in main site page
		game.load.image('datehub', 'assets/img/dating/hub.png');
		// game.load.image('overhub', 'assets/img/dating/overhub.png');
		// game.load.image('home', 'assets/img/dating/home.png');

	// ----------------------------------------------------------------

		// Load in all dating profiles
		game.load.image('ed', 'assets/img/dating/dateed.png');
		game.load.image('dhani', 'assets/img/dating/datedhani.png');
		game.load.image('alex', 'assets/img/dating/datealex.png');
		game.load.image('yash', 'assets/img/dating/dateyash.png');

	// ----------------------------------------------------------------

	},
	create: function() {
		console.log('Game Over');
		bgmusic.stop();
		game.stage.backgroundColor = "#000";

	// ----------------------------------------------------------------

		// Load in dating profiles, set alpha to 0 so
		// player can switch between profiles. 
		// Achieved by changing alpha in callback function
		// hub = game.add.sprite(0,0,'datehub');

		ed = game.add.sprite(0,0,'ed');
		ed.alpha = 0;
		dhani = game.add.sprite(0,0,'dhani');
		dhani.alpha = 0;
		alex = game.add.sprite(0,0,'alex');
		alex.alpha = 0;
		yash = game.add.sprite(0,0,'yash');
		yash.alpha = 0;

		overlay = game.add.sprite(0,0,'overlay');

		hub = game.add.sprite(0,0,'datehub');
		// hub.alpha = 1;

	// ----------------------------------------------------------------

		// internal button group to detect if player clicks on icons
		// or the message button
		detectEd = game.add.sprite(216, 30, 'dclick');
		detectEd.alpha = 0;
		detectEd.inputEnabled = true;

		msgEd = game.add.sprite(660, 36, 'msgbutton');
		msgEd.alpha = 0;

		detectAlex = game.add.sprite(325, 30, 'dclick');
		detectAlex.alpha = 0;
		detectAlex.inputEnabled = true;

		msgAlex = game.add.sprite(660, 36, 'msgbutton');
		msgAlex.alpha = 0;
		
		detectDhani = game.add.sprite(432, 30, 'dclick');
		detectDhani.alpha = 0;
		detectDhani.inputEnabled = true;

		msgDhani = game.add.sprite(660, 36, 'msgbutton');
		msgDhani.alpha = 0;
		
		detectYash = game.add.sprite(535, 30, 'dclick');
		detectYash.alpha = 0;
		detectYash.inputEnabled = true;

		msgYash = game.add.sprite(660, 36, 'msgbutton');
		msgYash.alpha = 0;

		// homebutton = game.add.sprite(380, 560, 'home');
		// homebutton.alpha = 0;

	// ----------------------------------------------------------------

		// icon borders -- they are white so I can tint them
		// they'll be tinted black initially, and then turn to white when 
		// the internal button is pressed.

		borderEd = game.add.sprite(216, 30, 'iconbrdr');
		borderEd.tint = 0x000000;
		borderAlex = game.add.sprite(324, 30, 'iconbrdr');
		borderAlex.tint = 0x000000;
		borderDhani = game.add.sprite(432, 30, 'iconbrdr');
		borderDhani.tint = 0x000000;
		borderYash = game.add.sprite(534, 30, 'iconbrdr');
		borderYash.tint = 0x000000;


		// callback functions for browsing
		// click and hover detection

		detectEd.events.onInputDown.add(this.chooseEd, this);
		detectEd.events.onInputOver.add(this.hoverEd, this);

		detectAlex.events.onInputDown.add(this.chooseAlex, this);
		detectAlex.events.onInputOver.add(this.hoverAlex, this);

		detectDhani.events.onInputDown.add(this.chooseDhani, this)
		detectDhani.events.onInputOver.add(this.hoverDhani, this);

		detectYash.events.onInputDown.add(this.chooseYash, this);
		detectYash.events.onInputOver.add(this.hoverYash, this);


		msgEd.events.onInputDown.add(this.chatEd, this);
		msgEd.events.onInputOver.add(this.choverEd, this);

		msgAlex.events.onInputDown.add(this.chatAlex, this);
		msgAlex.events.onInputOver.add(this.choverAlex, this);

		msgDhani.events.onInputDown.add(this.chatDhani, this);
		msgDhani.events.onInputOver.add(this.choverDhani, this);

		msgYash.events.onInputDown.add(this.chatYash, this);
		msgYash.events.onInputOver.add(this.choverYash, this);

	// ----------------------------------------------------------------

	},
	update: function() {

		// --------------------------------------------------
		// Press SPACE for main menu
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('phase1');
		}
	},

	chooseEd: function(){
		borderEd.tint = 0xffffff;
		borderDhani.tint = 0x000000;
		borderYash.tint = 0x000000;
		borderAlex.tint = 0x000000;

		ed.alpha = 1;
		alex.alpha = 0;
		dhani.alpha = 0;
		yash.alpha = 0;
		hub.alpha = 0;
	},

	hoverEd: function() {
		detectEd.input.useHandCursor = true;
	},

	chatEd: function() {

	},
	choverEd: function() {
		msgEd.input.useHandCursor = true;
	},
	chooseAlex: function() {
		borderAlex.tint = 0xffffff;
		borderEd.tint = 0x000000;
		borderDhani.tint = 0x000000;
		borderYash.tint = 0x000000;

		alex.alpha = 1;
		dhani.alpha = 0;
		yash.alpha = 0;
		ed.alpha = 0;
		hub.alpha = 0;
	},

	hoverAlex: function() {
		detectAlex.input.useHandCursor = true;
	},

	chatAlex: function() {

	},

	choverAlex: function() {
		msgAlex.input.useHandCursor = true;
	},
	chooseDhani: function() {
		borderDhani.tint = 0xffffff;
		borderYash.tint = 0x000000;
		borderAlex.tint = 0x000000;
		borderEd.tint = 0x000000;

		dhani.alpha = 1;
		yash.alpha = 0;
		ed.alpha = 0;
		alex.alpha = 0
		hub.alpha = 0;
	},

	hoverDhani: function() {
		detectDhani.input.useHandCursor = true;
	},

	chatDhani: function() {

	},

	choverDhani: function() {
		msgDhani.input.useHandCursor = true;
	},

	chooseYash: function() {
		borderYash.tint = 0xffffff;
		borderAlex.tint = 0x000000;
		borderEd.tint = 0x000000;
		borderDhani.tint = 0x000000;

		yash.alpha = 1;
		ed.alpha = 0;
		alex.alpha = 0;
		dhani.alpha = 0;
		hub.alpha = 0;
	},

	hoverYash: function() {
		detectYash.input.useHandCursor = true;
	},

	chatYash: function() {

	},
	choverYash: function() {
		msgYash.input.useHandCursor = true;
	},
}
	// ----------------------------------------------------------------------------------------------------------------------------------------Game Over

// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('Game Over');
		game.stage.backgroundColor = "#bb11ee";
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction5 = game.add.text(300,50,'Press SPACE to go to main menu', { font: '32px Serif'});
	},
	update: function() {
		// --------------------------------------------------
		// Press SPACE for main menu
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('phase1');
		}
	}
}

// add states to StateManager and start MainMenu
game.state.add('loadingMenu', loadingMenu);
game.state.add('settings', settings);
game.state.add('credits', credits);
game.state.add('triggers', triggers);
game.state.add('phase1', phase1);
game.state.add('phone1', phone1);
game.state.add('miniGameA', miniGameA);
game.state.add('miniGameB', miniGameB);
game.state.add('miniGameC', miniGameC);
// --------------------------------------------------
// Dating section
// --------------------------------------------------
game.state.add('dateProfiles', dateProfiles);
// game.state.add('VSED', VSED);
// game.state.add('VSALEX', VSALEX);
// game.state.add('VSDHANI', VSDHANI);
// game.state.add('VSYASH', VSYASH);
// --------------------------------------------------
game.state.add('GameOver', GameOver);
game.state.start('loadingMenu');

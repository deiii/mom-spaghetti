// MiniGameA.js
// define variables
var thots;
var counter = 0;
var text = 0;
var pressure;
var splosion;
var video;
var hitMouth;
	
var MiniGameA = function(game) {};
	MiniGameA.prototype = {
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
			for(i = 0; i < 10; i++) {
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

			if(counter == 10) {
				pressure.play();
				pressure.volume = 0.5;
				pressure._sound.playbackRate.value -= 0.5;
			}
			if(counter == 66) {
				trumpsplosion = game.add.sprite(0,0, 'trumpsplosion');
				trumpsplosion.scale.setTo(1.2,1.2);
				trumpsplosion.alpha = 0;
				game.add.tween(trumpsplosion).to( { alpha: 1 }, 1500, Phaser.Easing.Linear.None, true);
			}
			if(counter == 67) {
				splosion.play();
				video.play();
				video.addToWorld(game.width-950,game.height - 700,0,0, 3.5,3.5);
			}
			if(counter == 72) {
				game.state.start('phase1');	
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
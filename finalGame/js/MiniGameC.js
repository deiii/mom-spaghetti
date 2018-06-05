// MiniGameC.js
var MiniGameC = function(game) {};
	MiniGameC.prototype = {
		preload: function() {
			game.load.image('ball','assets/img/ball.png');
	    	game.load.image('paddle','assets/img/paddle.png');
	    	game.load.image('brick', 'assets/img/brick copy.png');
		},
		create: function() {
			// define variables
			var ball;
			var paddle;
			var bricks;
			var ballOnPaddle = true;
			var lives = 3;
			var score = 0;
			var scoreText;
			var livesText;
			var introText;

			// jazz music fades out
			music.onDecoded.add(out, this);
		
			console.log('mini game');
			game.stage.backgroundColor = "#C6C27F";

			game.physics.startSystem(Phaser.Physics.ARCADE);

			// Don't collide with floor
			game.physics.arcade.checkCollision.down = false;

			// Create brick group, enable physics
			bricks = game.add.group();
	    	bricks.enableBody = true;
	    	bricks.physicsBodyType = Phaser.Physics.ARCADE;

	    	var brick;

	    	// 4 rows of bricks
	    	for (var y = 0; y < 4; y++) {
        		for (var x = 0; x < 15; x++) {
	            	brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'brick');
	            	brick.body.bounce.set(1);
	            	//brick.body.setSize(0, 0); // 0.5,0.5 = half size of bricks
	            	brick.body.immovable = true;
        		}
	   		}

	    	// PADDLE
        	paddle = game.add.sprite(game.world.centerX, 500, 'paddle');
	    	paddle.anchor.setTo(0.5, 0.5);

	    	game.physics.enable(paddle, Phaser.Physics.ARCADE);

	    	paddle.body.collideWorldBounds = true;
	    	paddle.body.bounce.set(1);
	    	paddle.body.immovable = true;

	    	// BALL
	    	ball = game.add.sprite(game.world.centerX, paddle.y - 50, 'ball');
        	ball.anchor.set(0.5);
	    	ball.checkWorldBounds = true;

	    	game.physics.enable(ball, Phaser.Physics.ARCADE);

	    	ball.body.collideWorldBounds = true;
	    	// ball.body.gravity.y = 100;
	    	ball.body.bounce.set(1);

	    	// ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

	    	ball.events.onOutOfBounds.add(this.ballLost, this);

        	// score and intro text
	    	scoreText = game.add.text(32, 550, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
	    	livesText = game.add.text(680, 550, 'lives: 3', { font: "20px Arial", fill: "#ffffff", align: "left" });
	    	introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
	    	introText.anchor.setTo(0.5, 0.5);

	    	game.input.onDown.add(this.releaseBall, this);
		},
		update: function() {
			if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				game.state.start('phase1');
			}
			if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
				game.state.start('GameOver');
			}

			game.physics.arcade.collide(ball,paddle);
			paddle.x = game.input.x;

			if (paddle.x < 24) {
      		  	paddle.x = 24;
    		} else if (paddle.x > game.width - 24) {
        		paddle.x = game.width - 24;
    		}
    		if (ballOnPaddle) {
        		ball.body.x = paddle.x;
    		} else {
        		game.physics.arcade.collide(ball, paddle, this.ballHitPaddle, null, this);
        		game.physics.arcade.collide(ball, bricks, this.ballHitBrick, null, this);
    		}
		},
		releaseBall: function() {
			if (ballOnPaddle) {
	       		ballOnPaddle = false;
	        	ball.body.velocity.y = -300;
	        	ball.body.velocity.x = -75;
	        	ball.animations.play('spin');
	        	introText.visible = false;
    		}

		},
		ballLost: function() {
	    	lives--;
    		livesText.text = 'lives: ' + lives;

			if (lives === 0) {
				// gameOver();
		    	this.gameOver();
			} else {
		    	ballOnPaddle = true;

		    	ball.reset(paddle.body.x + 16, paddle.y - 16);
		    
		    	ball.animations.stop();
			}
		},
		gameOver: function() {
	    	ball.body.velocity.setTo(0, 0);
    
	    	introText.text = 'Game Over!';
	    	introText.visible = true;
		},
		ballHitBrick: function(_ball, _brick) {
			_brick.kill();

	    	score += 10;

	    	scoreText.text = 'score: ' + score;

	    	//  Are they any bricks left?
	    	if (bricks.countLiving() == 0) {
	        	//  New level starts
	        	score += 1000;
	        	scoreText.text = 'score: ' + score;
	        	introText.text = '- Next Level -';

	        	//  Let's move the ball back to the paddle
	        	ballOnPaddle = true;
	        	ball.body.velocity.set(0);
	        	ball.x = paddle.x + 16;
	        	ball.y = paddle.y - 16;
	        	ball.animations.stop();

	        	//  And bring the bricks back from the dead 🙂
	        	bricks.callAll('revive');
	    	}
		},
		ballHitPaddle: function(_ball, _paddle) {
			var diff = 0;

	    	if (_ball.x < _paddle.x) {
	        	//  Ball is on the left-hand side of the paddle
	        	diff = _paddle.x - _ball.x;
	        	_ball.body.velocity.x = (-10 * diff);
	    	} else if (_ball.x > _paddle.x) {
	        	//  Ball is on the right-hand side of the paddle
	        	diff = _ball.x -_paddle.x;
	        	_ball.body.velocity.x = (10 * diff);
	    	} else {
	        	//  Ball is perfectly in the middle
	        	//  Add a little random X to stop it bouncing straight up!
	        	_ball.body.velocity.x = 2 + Math.random() * 8;
	    	}
		},
	}
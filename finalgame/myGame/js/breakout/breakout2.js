var scoreText;
var score = 0;

var HSbreakout = 0;
var incb2 = 0;

var paddle;
var ball;
var ball2;
var ball3;
var ball4;
var ball5;
var bricks;


var breakout2 = function(game) {};
breakout2.prototype = {
	preload: function() {
		game.load.atlas('breakout', 'assets/img/breakout/breakout.png', 'assets/img/breakout/breakout.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.bitmapFont('bofont', 'assets/img/breakout/breakoutfont.png', 'assets/img/breakout/breakoutfont.fnt');

		game.load.image('titlebg', 'assets/img/breakout/breakoutbg.png');
		game.load.image('phedge1', 'assets/img/breakout/phedge1.png');
	    game.load.image('phedge2', 'assets/img/breakout/phedge2.png');
	    game.load.image('bg', 'assets/img/breakout/eveningsea.png');
	    game.load.image('phop', 'assets/img/breakout/phop.png');
	},
	create: function() {
		this.camera.flash('#000000', 700);

		game.add.sprite(0,0, 'titlebg');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.world.enableBody = true;

		left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		paddle = game.add.sprite(200, 550, 'breakout', 'paddle');

		paddle.body.immovable = true; 

		bricks = game.add.group();

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

		scoreText = game.add.bitmapText(445, 25, 'bofont', ' ', 25);
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
		game.physics.arcade.collide(ball2, phottom, this.hitFloor2, null, this);

		game.physics.arcade.collide(ball3, phedge1);
		game.physics.arcade.collide(ball3, phedge2);
		game.physics.arcade.collide(ball3, phop);
		game.physics.arcade.collide(ball3, phottom, this.hitFloor3, null, this);


		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			if (score >= 100 && game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) 
			{
				incb2 += 1;
				localStorage.setItem("incb2", incb2);	
			}
			if ((localStorage.getItem("incb2") >= 2) && 
				(localStorage.getItem("incsh2") >= 2) && 
				(localStorage.getItem("inctr2") >= 1) && 
				game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			{
				game.sound.stopAll();
				game.state.start('phase3');
				score = 0;
			} 
			score = 0;
			game.sound.stopAll();
			game.state.start('phase2');
		}
	},

	hit: function(ball, brick)  {
		brick.kill();
		score += 10;
    	scoreText.text = ' ' + score;

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
    },

	hitFloor: function(ball) {
		ball.kill();

		if (score > localStorage.getItem("HSbreakout")) 
			{
		            localStorage.setItem("HSbreakout", score);
		    }

		if (score >= 100)
		{
			incb2 += 1;

			localStorage.setItem("incb2", incb2);
		}

		game.state.start('bogameover2');
		score = 0;
	},

	hitFloor2: function() {
		ball.kill();
		ball2.kill();


		if (score > localStorage.getItem("HSbreakout")) 
			{
		            localStorage.setItem("HSbreakout", score);
		    }

		if (score >= 100)
		{
			incb2 += 1;

			localStorage.setItem("incb2", incb2);
		}

		game.state.start('bogameover2');
		score = 0;
	},

	hitFloor3: function() {
		ball.kill();
		ball2.kill();
		ball3.kill();

		if (score > localStorage.getItem("HSbreakout")) 
			{
		            localStorage.setItem("HSbreakout", score);
		    }

		if (score >= 100)
		{
			incb2 += 1;

			localStorage.setItem("incb2", incb2);
		}

		game.state.start('bogameover2');
		score = 0;
	}
}
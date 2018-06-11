// Code credit goes to Jeff Schomay on http://codeperfectionist.com

var player;

var greenEnemies;
var blueEnemies;
var enemyBullets;
var boss;

var starfield;
var cursors;
var bank;

var shipTrail;
var explosions;
var playerDeath;
var bullets;
var fireButton;
var bulletTimer = 0;

var shields;
var score = 0;
var scoreText;

var HSshoot = 0;
var incsh3 = 0;

var greenEnemyLaunchTimer;
var greenEnemySpacing = 200;

var blueEnemyLaunchTimer;
var blueEnemyLaunched = false;
var blueEnemySpacing = 2500;
var blueEnemyBullets;

var bossLaunchTimer;
var bossLaunched = false;
var bossSpacing = 20000;
var bossBulletTimer = 0;
var bossYdirection = -1;
var bossBullets;

var gameOver;

var phedge1;
var phedge2;

var ACCLERATION = 600;
var DRAG = 400;
var MAXSPEED = 400;

var shooter3 = function(game) {};
shooter3.prototype = {
	preload: function() {
	    game.load.image('space', 'assets/img/shooter/fried2.png');
	    game.load.image('ship', 'assets/img/shooter/spikeship1.png');
	    game.load.image('bullet', 'assets/img/shooter/exhaust.png');

	    game.load.image('grays', 'assets/img/shooter/bauship.png');
	    game.load.image('enemy-green', 'assets/img/shooter/grenemy.png');
	    game.load.image('enemy-blue', 'assets/img/shooter/blenemy.png');
	    game.load.image('blueEnemyBullet', 'assets/img/shooter/blenbull.png');
	    game.load.spritesheet('explosion', 'assets/img/shooter/explosion.png', 96, 96);
	    game.load.bitmapFont('spacefont', 'assets/img/shooter/smol.png', 'assets/img/shooter/smol.fnt');  

	    game.load.image('spaceUI', 'assets/img/shooter/spaceUI.png');
	    game.load.image('phedge1', 'assets/img/shooter/phedge1.png');
	    game.load.image('phedge2', 'assets/img/shooter/phedge2.png');
	    game.load.image('phop', 'assets/img/shooter/phop.png');

	    game.load.image('bg', 'assets/img/breakout/nightsea.png');
	},

	create: function() {
		this.camera.flash('#000000', 700);

	    game.physics.startSystem(Phaser.Physics.ARCADE);
	    game.stage.backgroundColor = '#000000';
	    starfield = game.add.tileSprite(200, 0, 626, 626, 'space');


	    //  Our bullet group
	    bullets = game.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(30, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);

	    //  The hero!
	    player = game.add.sprite(400, 500, 'ship');
	    player.health = 10;
	    player.anchor.setTo(0.5, 0.5);
	    game.physics.enable(player, Phaser.Physics.ARCADE);
	    player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
	    player.body.drag.setTo(DRAG, DRAG);
	    player.weaponLevel = 1;
	    player.events.onKilled.add(function(){
	        // this.shipTrail.kill();
	    });

	    player.events.onRevived.add(function(){
	        // this.shipTrail.start(false, 5000, 10);
	    });

	    //  The baddies!
	    greenEnemies = game.add.group();
	    greenEnemies.enableBody = true;
	    greenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
	    greenEnemies.createMultiple(50, 'enemy-green');
	    greenEnemies.scale.set(1.5);
	    greenEnemies.setAll('anchor.x', 0.5);
	    greenEnemies.setAll('anchor.y', 0.5);
	    greenEnemies.setAll('scale.x', 0.5);
	    greenEnemies.setAll('scale.y', 0.5);
	    greenEnemies.setAll('angle', 180);
	    greenEnemies.forEach(function(enemy){
	        // this.addEnemyEmitterTrail(enemy);
	        enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
	        enemy.damageAmount = 2;
	        enemy.events.onKilled.add(function(){
	            // enemy.trail.kill();
	        });
	    });

	    game.time.events.add(1000, this.launchGreenEnemy, this);

	    //  Blue enemy's bullets
	    blueEnemyBullets = game.add.group();
	    blueEnemyBullets.enableBody = true;
	    blueEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
	    blueEnemyBullets.createMultiple(50, 'blueEnemyBullet');
	    blueEnemyBullets.callAll('crop', null, {x: 90, y: 0, width: 90, height: 70});
	    blueEnemyBullets.setAll('alpha', 0.9);
	    blueEnemyBullets.setAll('anchor.x', 0.5);
	    blueEnemyBullets.setAll('anchor.y', 0.5);
	    blueEnemyBullets.setAll('outOfBoundsKill', true);
	    blueEnemyBullets.setAll('checkWorldBounds', true);
	    blueEnemyBullets.forEach(function(enemy){
	        enemy.body.setSize(20, 20);
	    });

	    //  More baddies!
	    blueEnemies = game.add.group();
	    blueEnemies.enableBody = true;
	    blueEnemies.physicsBodyType = Phaser.Physics.ARCADE;
	    blueEnemies.createMultiple(50, 'enemy-blue');
	    blueEnemies.setAll('anchor.x', 0.5);
	    blueEnemies.setAll('anchor.y', 0.5);
	    blueEnemies.setAll('scale.x', 0.5);
	    blueEnemies.setAll('scale.y', 0.5);
	    blueEnemies.setAll('angle', 180);
	    blueEnemies.forEach(function(enemy){
	        enemy.damageAmount = 4;
	    });


	    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	    //  An explosion pool
	    explosions = game.add.group();
	    explosions.enableBody = true;
	    explosions.physicsBodyType = Phaser.Physics.ARCADE;
	    explosions.createMultiple(30, 'explosion');
	    explosions.setAll('anchor.x', 0.5);
	    explosions.setAll('anchor.y', 0.5);
	    explosions.forEach( function(explosion) {
	        explosion.animations.add('explosion');
	    });

	    playerDeath = game.add.emitter(player.x, player.y);
	    playerDeath.width = 50;
	    playerDeath.height = 50;
	    playerDeath.makeParticles('explosion', [0,1,2,3,4,5,6,7], 10);
	    playerDeath.setAlpha(0.9, 0, 800);
	    playerDeath.setScale(0.1, 0.6, 0.1, 0.6, 1000, Phaser.Easing.Quintic.Out);

	    //  Shields stat
	    shields = game.add.bitmapText(570, 45, 'spacefont', ' ' + player.health, 30);
	    shields.anchor.setTo(0.5, 0.5);
	    shields.render = function () {
	        shields.text = ' ' + Math.max(player.health, 0);
	    };

	    shields.render();

	    //  Score
	    scoreText = game.add.bitmapText(320, 30, 'spacefont', '', 30);
	    scoreText.render = function () {
	        scoreText.text = ' ' + score;
	        score.rotation += 90;
	    };
	    scoreText.render();

	    //  Game over text
	    gameOver = game.add.bitmapText(460, game.world.centerY, 'spacefont', 'GAME OVER!', 50);
	    gameOver.x = gameOver.x - gameOver.textWidth / 2;
	    gameOver.y = gameOver.y - gameOver.textHeight / 3;
	    gameOver.visible = false;
	// ------------------------------------------------------------------------------------------------------------------------------------
	    phedge1 = game.add.sprite(240, 0, 'phedge1');
	    phedge2 = game.add.sprite(650, 0, 'phedge2');
	    game.physics.enable(phedge1, Phaser.Physics.ARCADE);
	    game.physics.enable(phedge2, Phaser.Physics.ARCADE);
		phedge1.body.immovable = true;
		phedge2.body.immovable = true;

		game.add.sprite(0,0, 'bg');
		phop = game.add.sprite(240,0,'phop');
		phottom = game.add.sprite(240, 620, 'phop');
		spaceUI = game.add.sprite(263, 18, 'spaceUI');
	// ------------------------------------------------------------------------------------------------------------------------------------
	},

	update: function() {
	    //  Scroll the background
	    starfield.tilePosition.y += 2;

	    //  Reset the player, then check for movement keys
	    player.body.acceleration.x = 0;


	    //  Stop at screen edges
	    if (player.x > game.width - 50) {
	        player.x = game.width - 50;
	        player.body.acceleration.x = 0;
	    }
	    if (player.x < 50) {
	        player.x = 50;
	        player.body.acceleration.x = 0;
	    }

	    //  Fire bullet
	    if (player.alive && game.input.activePointer.isDown) {
	        this.fireBullet();
	    }

	    //  Move ship towards mouse pointer
	    if (game.input.x < game.width - 20 &&
	        game.input.x > 20 &&
	        game.input.y > 20 &&
	        game.input.y < game.height - 20) {
	        var minDist = 200;
	        var dist = game.input.x - player.x;
	        player.body.velocity.x = MAXSPEED * game.math.clamp(dist / minDist, -1, 1);
	    }

	    //  Squish and rotate ship for illusion of "banking"
	    bank = player.body.velocity.x / MAXSPEED;
	    player.scale.x = 1 - Math.abs(bank) / 2;
	    player.angle = bank * 30;

	    //  Keep the shipTrail lined up with the ship
	    // shipTrail = player.x;

	    game.physics.arcade.collide(player, phedge1);
	    game.physics.arcade.collide(player, phedge2);

	    game.physics.arcade.overlap(player, greenEnemies, this.shipCollide, null, this);
	    game.physics.arcade.overlap(greenEnemies, bullets, this.hitEnemy, null, this);

	    game.physics.arcade.overlap(player, blueEnemies, this.shipCollide, null, this);
	    game.physics.arcade.overlap(blueEnemies, bullets, this.hitEnemy, null, this);

	    game.physics.arcade.overlap(blueEnemyBullets, player, this.enemyHitsPlayer, null, this);

	    game.physics.arcade.overlap(boss, bullets, this.hitEnemy, this.bossHitTest, this);
	    game.physics.arcade.overlap(player, bossBullets, this.enemyHitsPlayer, null, this);
	    game.physics.arcade.overlap(player, bossBullets, this.enemyHitsPlayer, null, this);


	    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		    if (score >= 500)
				{
					incsh3 += 1;

					localStorage.setItem("incsh3", incsh3);

					game.state.start('phase3');

					score = 0;

					game.sound.stopAll();
				}

		    if ((localStorage.getItem("incsh3") >= 1) && 
					(localStorage.getItem("incsh3") >= 1) && 
					(localStorage.getItem("incsh3") >= 1) &&
					game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
				{
					game.sound.stopAll();
					game.state.start('phase4');
					score = 0;
			} 
			game.sound.stopAll();
			score = 0;
	    	game.state.start('phase3');
		}
	},

	killBullets: function(bullets, phone) {
		phone.kill(bullets);
	},

	fireBullet: function() {
			switch (player.weaponLevel) {
	        case 1:
	        //  To avoid them being allowed to fire too fast we set a time limit
	        if (game.time.now > bulletTimer)
	        {
	            var BULLET_SPEED = 400;
	            var BULLET_SPACING = 250;
	            //  Grab the first bullet we can from the pool
	            var bullet = bullets.getFirstExists(false);

	            if (bullet)
	            {
	                //  And fire it
	                //  Make bullet come out of tip of ship with right angle
	                var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
	                bullet.reset(player.x + bulletOffset, player.y);
	                bullet.angle = player.angle;
	                game.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
	                bullet.body.velocity.x += player.body.velocity.x;

	                bulletTimer = game.time.now + BULLET_SPACING;
	            }
	        }
	        break;

	        case 2:
	        if (game.time.now > bulletTimer) {
	            var BULLET_SPEED = 400;
	            var BULLET_SPACING = 550;


	            for (var i = 0; i < 3; i++) {
	                var bullet = bullets.getFirstExists(false);
	                if (bullet) {
	                    //  Make bullet come out of tip of ship with right angle
	                    var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
	                    bullet.reset(player.x + bulletOffset, player.y);
	                    //  "Spread" angle of 1st and 3rd bullets
	                    var spreadAngle;
	                    if (i === 0) spreadAngle = -20;
	                    if (i === 1) spreadAngle = 0;
	                    if (i === 2) spreadAngle = 20;
	                    bullet.angle = player.angle + spreadAngle;
	                    game.physics.arcade.velocityFromAngle(spreadAngle - 90, BULLET_SPEED, bullet.body.velocity);
	                    bullet.body.velocity.x += player.body.velocity.x;
	                }
	                bulletTimer = game.time.now + BULLET_SPACING;
	            }
	        }
	    }
	},



	launchGreenEnemy: function() {
	    var ENEMY_SPEED = 300;

	    var enemy = greenEnemies.getFirstExists(false);
	    if (enemy) {
	        enemy.reset(game.rnd.integerInRange(240,650), -10);
	        enemy.body.velocity.x = game.rnd.integerInRange(-300, 300);
	        enemy.body.velocity.y = ENEMY_SPEED;
	        enemy.body.drag.x = 100;

	        //  Update function for each enemy ship to update rotation etc
	        enemy.update = function(){
	          enemy.angle = 180 - game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));

	          //  Kill enemies once they go off screen
	          if (enemy.y > game.height + 200) {
	            enemy.kill();
	            enemy.y = -20;
	          }
	        }
	    }

	    //  Send another enemy soon
	    greenEnemyLaunchTimer = game.time.events.add(game.rnd.integerInRange(greenEnemySpacing, greenEnemySpacing + 500), this.launchGreenEnemy, this);
	},	

	launchBlueEnemy: function() {
	    // var startingX = game.rnd.integerInRange(100, game.width - 100);
	    var startingX = game.rnd.integerInRange(290, 626);
	    var verticalSpeed = 180;
	    var spread = 60;
	    var frequency = 70;
	    var verticalSpacing = 70;
	    var numEnemiesInWave = 5;
	    // var timeBetweenWaves = 2500;

	    //  Launch wave
	    for (var i =0; i < numEnemiesInWave; i++) {
	        var enemy = blueEnemies.getFirstExists(false);
	        if (enemy) {
	            enemy.startingX = startingX;
	            enemy.reset(game.width / 2, -verticalSpacing * i);
	            enemy.body.velocity.y = verticalSpeed;

	            //  Set up firing
	            var bulletSpeed = 400;
	            var firingDelay = 2000;
	            enemy.bullets = 1;
	            enemy.lastShot = 0;

	            //  Update function for each enemy
	            enemy.update = function(){
	              //  Wave movement
	              this.body.x = this.startingX + Math.sin((this.y) / frequency) * spread;

	              //  Squish and rotate ship for illusion of "banking"
	              bank = Math.cos((this.y + 60) / frequency)
	              this.scale.x = 0.5 - Math.abs(bank) / 8;
	              this.angle = 180 - bank * 2;

	              //  Fire
	              enemyBullet = blueEnemyBullets.getFirstExists(false);
	              if (enemyBullet &&
	                  this.alive &&
	                  this.bullets &&
	                  this.y > game.width / 8 &&
	                  game.time.now > firingDelay + this.lastShot) {
	                    this.lastShot = game.time.now;
	                    this.bullets--;
	                    enemyBullet.reset(this.x, this.y + this.height / 2);
	                    enemyBullet.damageAmount = this.damageAmount;
	                    var angle = game.physics.arcade.moveToObject(enemyBullet, player, bulletSpeed);
	                    enemyBullet.angle = game.math.radToDeg(angle);
	                }

	              //  Kill enemies once they go off screen
	              if (this.y > game.height + 200) {
	                this.kill();
	                this.y = -20;
	              }
	            };
	        }
	    }

	    //  Send another wave soon
	    blueEnemyLaunchTimer = game.time.events.add(game.rnd.integerInRange(blueEnemySpacing, blueEnemySpacing + 4000), this.launchBlueEnemy, this);
	},

	launchBoss: function() {
		boss.reset(game.width / 2, -boss.height);
		booster.start(false, 1000, 10);
		boss.health = 1000;
		bossBulletTimer = game.time.now + 2000;

	    enemyBullet = blueEnemyBullets.getFirstExists(false);

              if (enemyBullet &&
                  this.alive &&
                  this.bullets &&
                  this.y > game.width / 8 &&
                  game.time.now > firingDelay + this.lastShot) {
                    this.lastShot = game.time.now;
                    this.bullets--;
                    enemyBullet.reset(this.x, this.y + this.height / 2);
                    enemyBullet.damageAmount = this.damageAmount;
                    var angle = game.physics.arcade.moveToObject(enemyBullet, player, bulletSpeed);
                    enemyBullet.angle = game.math.radToDeg(angle);
                }
	},

	addEnemyEmitterTrail: function(enemy) {
	    var enemyTrail = game.add.emitter(enemy.x, player.y - 10, 100);
	    enemyTrail.width = 10;
	    enemyTrail.makeParticles('explosion', [1,2,3,4,5]);
	    enemyTrail.setXSpeed(20, -20);
	    enemyTrail.setRotation(50,-50);
	    enemyTrail.setAlpha(0.4, 0, 800);
	    enemyTrail.setScale(0.01, 0.1, 0.01, 0.1, 1000, Phaser.Easing.Quintic.Out);
	    enemy.trail = enemyTrail;
	},


	shipCollide: function(player, enemy) {
	    enemy.kill();

	    player.damage(enemy.damageAmount);
	    shields.render();

	    if (player.alive) 
	    {
	    	var explosion = explosions.getFirstExists(false);
	    	explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
	    	explosion.alpha = 0.7;
	    	explosion.play('explosion', 30, false, true);
	    } else {
			if (score > localStorage.getItem('HSshoot')) 
				{
			            localStorage.setItem("HSshoot", score);
			    }

			// highScoreText.text = 'HIGHSCORE: ' + localStorage.getItem("HSbreakout");

			if (score >= 500)
			{
				incsh3 += 1;

				localStorage.setItem("incsh3", incsh3);
			}
			// highscoredetect.content = 'detect: ' + localStorage.getItem("bo1detect");
			score = 0;
			game.state.start('shootover3');
	    }
	},


	hitEnemy: function(enemy, bullet) {
	    var explosion = explosions.getFirstExists(false);
	    explosion.reset(bullet.body.x + bullet.body.halfWidth, bullet.body.y + bullet.body.halfHeight);
	    explosion.body.velocity.y = enemy.body.velocity.y;
	    explosion.alpha = 0.7;
	    explosion.play('explosion', 30, false, true);

	    if (enemy.finishOff && enemy.health < 5) {
	      enemy.finishOff();
	    } else {
	        enemy.damage(enemy.damageAmount);
	    }
	    bullet.kill();

	    // Increase score
	    score += enemy.damageAmount * 10;
	    // score += 1;
	    scoreText.render();

	    greenEnemySpacing *= 0.9;
	    if (!blueEnemyLaunched && score > 1000) {
	    	blueEnemyLaunched = true;
	    	this.launchBlueEnemy();
	    	greenEnemySpacing *= 2;
	    }

	    if (score > 5000 && player.weaponLevel < 2) {
	    	player.weaponLevel = 2;
	    }
	},

	enemyHitsPlayer: function (player, bullet) {
	    bullet.kill();

	    player.damage(bullet.damageAmount);
	    shields -+ 1; 
	    shields.render()

	    if (player.alive)
	    {
	    	var explosion = explosions.getFirstExists(false);
	    	explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
	    	explosion.alpha = 0.7;
	    	explosion.play('explosion', 30, false, true);
	    } else {
			if (score > localStorage.getItem('HSshoot')) 
				{
			            localStorage.setItem("HSshoot", score);
			    }

			// highScoreText.text = 'HIGHSCORE: ' + localStorage.getItem("HSbreakout");

			if (score >= 500)
			{
				incsh3 += 1;

				localStorage.setItem("incsh3", incsh3);
			}
			// highscoredetect.content = 'detect: ' + localStorage.getItem("bo1detect");
			score = 0;
			game.state.start('shootover3');
	    }
	}

}

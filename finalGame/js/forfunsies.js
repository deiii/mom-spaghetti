// define game
var game = new Phaser.Game(800, 600, Phaser.AUTO); 
var content = [
	"Hmmmmmm",
	"I wonder what's",
	"on TV",
	"",
	"Click [1] to start mini game" //temp text, will be more creative later
];
var line = [];
var wordIndex = 0;
var lineIndex = 0;
var wordDelay = 120;
var lineDelay = 400;

//----------------------------------------------------------------------------------------
// functions for state switching 
//----------------------------------------------------------------------------------------
function playGame() {
	// change state to gameStart
	game.state.start('gameStart');
}
function gameSettings() {
	// change state to Settings page
	game.state.start('settings');
}
function triggerWarnings() {
	//change state to trigger warnings page
	game.state.start('triggers');
}
function creditsList() {
	//change to credits list page
	game.state.start('credits');
}

//----------------------------------------------------------------------------------------
// Main Menu with buttons state
//----------------------------------------------------------------------------------------

var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
	    // load in button sprites
		game.load.image('play', 'assets/img/buttonPlay.png');
		game.load.image('settings', 'assets/img/buttonSettings.png');
		game.load.image('triggers', 'assets/img/buttonTriggers.png');
		game.load.image('credits', 'assets/img/buttonCredits.png');
	},
	create: function() {
	    // Main Menu page with four buttons
		game.stage.backgroundColor = "#D1D1E0";
		game.add.text(325, 75, 'Main Menu', { fill: '#000000' });
		
		// if player clicks on "play", go to play state
		var play = game.add.sprite(200, 200, 'play');
		play.inputEnabled = true;
		play.events.onInputDown.add(playGame, this);
		
		// if player clicks on "settings", go to setting state
		var settings = game.add.sprite(200, 300, 'settings');
		settings.inputEnabled = true;
		settings.events.onInputDown.add(gameSettings, this);
		
		// if player clicks on "triggers", go to trigger warnings
		var triggers = game.add.sprite(200, 400, 'triggers');
		triggers.inputEnabled = true;
		triggers.events.onInputDown.add(triggerWarnings, this);
		
		// if player clicks  on "credits", go to credits state
		var credits = game.add.sprite(200, 500, 'credits');
		credits.inputEnabled = true;
		credits.events.onInputDown.add(creditsList, this);
	},
	update: function() {
	}
}

//----------------------------------------------------------------------------------------
// settings state
//----------------------------------------------------------------------------------------
var settings = function(game) {};
settings.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('settings');
		game.add.text(100, 500, "Press 'Q' to return to Main Menu", {
			font: '30px Courier',
			fill: '#000000'});
	},
	update: function() {
	// if player presses Q, go back to MainMenu
		if(game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			game.state.start('MainMenu');
		}
	}
}

//----------------------------------------------------------------------------------------
// triggers state
//----------------------------------------------------------------------------------------
var triggers = function(game) {};
triggers.prototype = {
	preload: function() {
	},
	create: function() {
	console.log('triggers');
		// text about triggers
	    var trig = "This game contains some political\ncommmentary please be advised.\n\nGameplay may also cause motion\nsickness and anxiety...\n\nPlay at your own discretion.";
	
		game.add.text(100, 100, trig, {
			font: '30px Courier',
			fill: '#000000'});
			
		game.add.text(100, 500, "Press 'Q' to return to Main Menu", {
			font: '30px Courier',
			fill: '#000000'});
	},
	update: function() {
	// if player presses Q, go back to MainMenu
		if(game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			game.state.start('MainMenu');
		}
	}
}

//----------------------------------------------------------------------------------------
// credits state
//----------------------------------------------------------------------------------------
var credits = function(game) {};
credits.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('credits');
		// text for credits
		var creds = "Mom's Spaghetti\n\n   Yash Dua\n     Ed Li\n Alex Arancibia\n   Dhani Hua";
		
		game.add.text(225, 100, creds, {
			font: '30px Courier',
			fill: '#000000'});
			
		game.add.text(125, 500, "Press 'Q' to return to Main Menu", {
			font: '30px Courier',
			fill: '#000000'});
	},
	update: function() {
	// if player presses Q, go back to MainMenu
		if(game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			game.state.start('MainMenu');
		}
	}
}

//----------------------------------------------------------------------------------------
// define gameStart state and methods
//----------------------------------------------------------------------------------------
var gameStart = function(game) {};
gameStart.prototype = {
	preload: function() {
	    // load in background image
		game.load.image('intro', 'assets/img/intro.png');
	},
	create: function() {
		console.log('gameStart');
		game.add.sprite(0, 0, 'intro');
		// --------------------------------------------------
		// Code altered from Phaser example
		// --------------------------------------------------
		text = game.add.text(30, 30, '', {
			font: '30px Courier',
			fill: '#000000'});
		nextLine();
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
	}
}

//----------------------------------------------------------------------------------------
// function to go through each line of content
// called in create() of MainMenu()
//----------------------------------------------------------------------------------------
function nextLine() {
	// if at end of lines in content
	if(lineIndex === content.length) {
		return;
	}
	
	// one word per array element
	line = content[lineIndex].split(' ');
	
	// reset wordIndex so starts back at beginning
	wordIndex = 0;
	
	// call to 'nextWord' funtion
	// defined below
	game.time.events.repeat(wordDelay, line.length, nextWord, this);
	
	// go to the next line
	lineIndex++;
}

//----------------------------------------------------------------------------------------
// function to go through each word of content
// called in nextLine()
//----------------------------------------------------------------------------------------
function nextWord() {
	// add in next word and a space to seperate
	text.text = text.text.concat(line[wordIndex] + " ");

	// go to next word
	wordIndex++;
	
	// if at end of line
	if (wordIndex == line.length) {
		// go to next line
		text.text = text.text.concat("\n");
		
		// delay and go to next line
		game.time.events.add(lineDelay, nextLine, this);
	}
}

 	// ----------------------------------------------------------------------------------------------------------------------------------------Mini Game 1
var thots;
// Mini Game 1
var miniGameA = function(game) {};
miniGameA.prototype = {
	preload: function() {
		game.load.atlas('trumpthots', 'assets/img/trumpthots.png', 'assets/img/trumpthots.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		game.load.image('mouth', 'assets/img/block.png');
		game.load.image('trump', 'assets/img/trumpface.png');

		game.load.audio('byebing', ['assets/audio/byebing.mp3', 'assets/audio/byebing.ogg']);
		game.load.audio('hello', ['assets/audio/hello.mp3', 'assets/audio/hello.ogg']);
		game.load.audio('kachingka', ['assets/audio/kachingka.mp3', 'assets/audio/kachingka.ogg']);
		game.load.audio('moan', ['assets/audio/moan.mp3', 'assets/audio/moan.ogg']);
		game.load.audio('nyoom', ['assets/audio/nyoom.mp3', 'assets/audio/nyoom.ogg']);
		game.load.audio('woh', ['assets/audio/woh.mp3', 'assets/audio/woh.ogg']);
	},
	create: function() {
		console.log('mini game');
		game.stage.backgroundColor = "#852109";

		mouth = game.add.sprite(450,450,'mouth');
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


		//---------------------------------------
		// Load in words from atlas
		//-------------------------------------------
		for(i = 0; i < 5; i++)
		{
			// game.rnd.integerInRange(20, 650)
			var word1 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 400),'trumpthots', 'dangerous');
			var word2 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 400),'trumpthots','tremendous');
			var word3 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 400),'trumpthots', 'tough');
			var word4 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 400),'trumpthots', 'stupid');
			var word5 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 400),'trumpthots', 'terrific');
			var word6 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 400),'trumpthots', 'smart');
			var word7 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 400),'trumpthots', 'loser');
			var word8 = thots.create(game.world.randomX, game.rnd.integerInRange(50, 400),'trumpthots', 'weak');

			word1.inputEnabled = true;
			word1.input.enableDrag(true);

			word1.body.velocity.x = 200;
			word1.body.acceleration.x = 100;

			word1.body.bounce.x = 1;
			word1.body.bounce.y = 2.5;

			word2.inputEnabled = true;
			word2.input.enableDrag(true);

			word2.body.velocity.x = 200;
			word2.body.acceleration.x = 100;

			word2.body.bounce.x = 1;
			word2.body.bounce.y = 2.5;
			
			word3.inputEnabled = true;
			word3.input.enableDrag(true);

			word3.body.velocity.x = 200;
			word3.body.acceleration.x = 100;
			
			word3.body.bounce.x = 1;
			word3.body.bounce.y = 2.5;
			
			word4.inputEnabled = true;
			word4.input.enableDrag(true);

			word4.body.velocity.x = 200;
			word4.body.acceleration.x = 100;

			word4.body.bounce.x = 1;
			word4.body.bounce.y = 2.5;
			
			word5.inputEnabled = true;
			word5.input.enableDrag(true);

			word5.body.velocity.x = 200;
			word5.body.acceleration.x = 100;

			word5.body.bounce.x = 1;
			word5.body.bounce.y = 2.5;

			word6.inputEnabled = true;
			word6.input.enableDrag(true);

			word6.body.velocity.x = 200;
			word6.body.acceleration.x = 100;

			word6.body.bounce.x = 1;
			word6.body.bounce.y = 2.5;

			word7.inputEnabled = true;
			word7.input.enableDrag(true);

			word7.body.velocity.x = 200;
			word7.body.acceleration.x = 100;

			word7.body.bounce.x = 1;
			word7.body.bounce.y = 2.5;
			
			word8.inputEnabled = true;
			word8.input.enableDrag(true);

			word8.body.velocity.x = 200;
			word8.body.acceleration.x = 100;

			word8.body.bounce.x = 1;
			word8.body.bounce.y = 2.5;
		}
			// "listen" to the group events
			thots.onChildInputOver.add(this.onOver, this);
			thots.onChildInputOut.add(this.onOut, this);

			trump = game.add.sprite(0, 0,'trump');
			instruction2 = game.add.text(20,500,
				"Click and drag words into the President's mouth.\nPress SPACE to go to main menu\nPress ESC for game over",
				 { font: '20px Serif', fill: '#D5D5D5'});
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

		game.physics.arcade.collide(thots,mouth,this.begoneThot,null,this);
		// game.physics.arcade.collide(thots,moses);
		// --------------------------------------------------
		// Press SPACE for main menu
		// Press ESC for game over
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('GameOver');
		}
	},

	begoneThot: function(mouth, word) {
		// Kill the word sprite
		word.kill();
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
var miniGameB = function(game) {};
miniGameB.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('mini game');
		game.stage.backgroundColor = "C63636";
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction3 = game.add.text(300,50,'Press SPACE to go to main menu\nPress ESC for game over', { font: '32px Serif'});
	},
	update: function() {
		// --------------------------------------------------
		// Press SPACE for main menu
		// Press ESC for game over
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('GameOver');
		}
	}
}
	// ----------------------------------------------------------------------------------------------------------------------------------------Mini Game 3
var miniGameC = function(game) {};
miniGameC.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('mini game');
		game.stage.backgroundColor = "#C6C27F";
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction4 = game.add.text(300,50,'Press SPACE to go to main menu\nPress ESC for game over', { font: '32px Serif'});
	},
	update: function() {
		// --------------------------------------------------
		// Press SPACE for main menu
		// Press ESC for game over
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
			game.state.start('GameOver');
		}
	}
}
//----------------------------------------------------------------------------------------
// define GameOver state and methods
//----------------------------------------------------------------------------------------

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
			game.state.start('MainMenu');
		}
	}
}
//----------------------------------------------------------------------------------------
// add states to StateManager and start MainMenu
//----------------------------------------------------------------------------------------
game.state.add('MainMenu', MainMenu);
game.state.add('gameStart', gameStart);
game.state.add('settings', settings);
game.state.add('triggers', triggers);
game.state.add('credits', credits);
game.state.add('miniGameA', miniGameA);
game.state.add('miniGameB', miniGameB);
game.state.add('miniGameC', miniGameC);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');

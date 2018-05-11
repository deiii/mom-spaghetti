// define game
var game = new Phaser.Game(800, 600, Phaser.AUTO); 
var content = [
	"It is the year 2020",
	"The world is in a desolate state",
	"Ronald Rump has become a dictator of the United States",
	"and Kim Jong-boom is still the dictator of North Korea",
	"Both are too childish to deal with their probelms in an appropriate manner",
	"so they wage nuclear war on each other",
	"getting other countries involved",
	"Not only that",
	"but New York City. Shanhai, the Netherlands, Los Angeles and other costal regions",
	"are slowly being consumed by water and nukes",
	"Now is your chance to do something about it",
	"Play these Mini Games"
];
var line = [];
var wordIndex = 0;
var lineIndex = 0;
var wordDelay = 120;
var lineDelay = 400;

// ----------------------------------------------------------------------------------------------------------------------------------------Main Menu
// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('Main Menu');
		game.stage.backgroundColor = "#ffffff";
		// --------------------------------------------------
		// Introduction storyline before game uptions appear
		// Code altered from Phaser example
		// --------------------------------------------------
		text = game.add.text(32, 32, '', {
			font: '20px Courier',
			fill: '#000000'});
		nextLine();
		
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction1 = game.add.text(750,550,'Press 1 for mini game 1\nPress 2 for mini game 2\nPress 3 for mini game 3.', { font: '32px Serif'});
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
// function to go through each line of content
// called in create() of MainMenu()
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

// function to go through each word of content
// called in nextLine()
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
// define GamePlay state and methods
var miniGameA = function(game) {};
miniGameA.prototype = {
	preload: function() {
	},
	create: function() {
		console.log('mini game');
		game.stage.backgroundColor = "#80C67F";
		// --------------------------------------------------
		// Instructions for state switching
		// --------------------------------------------------
		instruction2 = game.add.text(300,50,'Press SPACE to go to main menu\nPress ESC for game over', { font: '32px Serif'});
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
			game.state.start('MainMenu');
		}
	}
}

// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('miniGameA', miniGameA);
game.state.add('miniGameB', miniGameB);
game.state.add('miniGameC', miniGameC);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');


// globals
var score = 0;
var highScore = 0;

//create function
highScoreText = game.add.text(300, 20, 'HIGHSCORE: ' + localStorage﻿.getItem("highscore"), {fontSize: '20px Arial' ﻿, fill: 'white'});

// in game over function, or just where game over happens
if (score >= 100)
		{
			HSdetect += 1;

			localStorage.setItem("bo1detect", HSdetect);
		}

		highscoredetect.content = 'detect: ' + localStorage.getItem("bo1detect");
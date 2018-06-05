// MiniGameB.js
var MiniGameB = function(game) {};
	MiniGameB.prototype = {
		preload: function() {
			game.load.script('webcam', 'scripts/Webcam.js');
		},
		create: function() {
			// define variables
			var webcam;
			var bmd;
			var sprite;
			var video;
			
			// jazz music fades out
			music.onDecoded.add(out, this);
		
			console.log('mini game');
			// Fade into state
			this.camera.flash('#000000', 700);
			game.stage.backgroundColor = "C63636";

			// instruction3 = game.add.text(380,50,'Finished?\nPress SPACE to go to main menu', { font: '20px Serif'});

			video = game.add.video();

	    	//  If access to the camera is allowed
	    	video.onAccess.add(this.camAllowed, this);

	    	//  If access to the camera is denied
	   		video.onError.add(this.camBlocked, this);

	    	//  Start the stream
	    	video.startMediaStream();

		},
		update: function() {
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
		camAllowed: function(video) {
			var cam = video.addToWorld();
			game.input.onDown.add(this.stopCam, this);
		},
		camBlocked: function(video, error) {
			console.log('camera was blocked', video, error);
		},
		stopCam: function() {
			console.log('camera stopped');
	    	video.grab();
	    	var img = video.grab();
	    	video.stop();
		},
	}
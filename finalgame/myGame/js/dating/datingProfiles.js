var dateProfiles = function(game) {};
dateProfiles.prototype = {
	preload: function() {
	// ----------------------------------------------------------------
		
		// load in site overlay, buttons, and icon borders
		game.load.image('overlay', 'assets/img/dating/dateoverlay.png');
		game.load.image('dclick', 'assets/img/dating/detectdate.png');
		game.load.image('msgbutton', 'assets/img/chat/message.png');
		game.load.image('iconbrdr', 'assets/img/dating/tintthis.png');

	// ----------------------------------------------------------------

		// Load in main site page
		game.load.image('datehub', 'assets/img/dating/hub.png');

	// ----------------------------------------------------------------

		// Load in all dating profiles
		game.load.image('ed', 'assets/img/dating/dateed.png');
		game.load.image('dhani', 'assets/img/dating/datedhani.png');
		game.load.image('alex', 'assets/img/dating/datealex.png');
		game.load.image('yash', 'assets/img/dating/dateyash.png');

	// ----------------------------------------------------------------

	},
	create: function() {
		this.camera.flash('#000000', 700);
		
		bgmusic.stop();
		game.stage.backgroundColor = "#000";

	// ----------------------------------------------------------------

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

		detectAlex = game.add.sprite(325, 30, 'dclick');
		detectAlex.alpha = 0;
		detectAlex.inputEnabled = true;
		
		detectDhani = game.add.sprite(432, 30, 'dclick');
		detectDhani.alpha = 0;
		detectDhani.inputEnabled = true;
		
		detectYash = game.add.sprite(535, 30, 'dclick');
		detectYash.alpha = 0;
		detectYash.inputEnabled = true;

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


	// ----------------------------------------------------------------

	},
	update: function() {

		// --------------------------------------------------
		// Press SPACE for main menu
		// --------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('phase1');
			game.sound.stopAll();
			if (((localStorage.getItem("incb1") >= 2) && 
				(localStorage.getItem("incsh1") >= 2) && 
				(localStorage.getItem("inctr1") >= 1)))
			{
				game.sound.stopAll();
				game.state.start('phase2');
			} 

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

		msgEd = game.add.sprite(660, 36, 'msgbutton');
		msgEd.alpha = 1;
		msgEd.inputEnabled = true;

		msgEd.events.onInputOver.add(this.hovedchat, this);
		msgEd.events.onInputOut.add(this.nohovedchat, this);
		msgEd.events.onInputDown.add(this.chated, this);
	},


	hoverEd: function() {
		detectEd.input.useHandCursor = true;
	},

	hovedchat: function() {
		msgEd.input.useHandCursor = true;
		msgEd.tint = 0x88FFCE;
	},

	nohovedchat: function() {
		msgEd.tint = 0xffffff;
	},

	chated: function() {
		game.state.start('edchat');
	},
	
	//---------------------------------------------------------------

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

		msgAlex = game.add.sprite(660, 36, 'msgbutton');
		msgAlex.alpha = 1;
		msgAlex.inputEnabled = true;

		msgAlex.events.onInputOver.add(this.hovalexchat, this);
		msgAlex.events.onInputOut.add(this.nohovalexchat, this);
		msgAlex.events.onInputDown.add(this.chatalex, this);
	},

	hoverAlex: function() {
		detectAlex.input.useHandCursor = true;
	},

	hovalexchat: function() {
		msgAlex.input.useHandCursor = true;
		msgAlex.tint = 0x88FFCE;
	},

	nohovalexchat: function() {
		msgAlex.tint = 0xffffff;
	},

	chatalex: function() {
		game.state.start('alexchat');
	},


	//---------------------------------------------------------------


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

		msgDhan = game.add.sprite(660, 36, 'msgbutton');
		msgDhan.alpha = 1;
		msgDhan.inputEnabled = true;

		msgDhan.events.onInputOver.add(this.hovdhanchat, this);
		msgDhan.events.onInputOut.add(this.nohovdhanchat, this);
		msgDhan.events.onInputDown.add(this.chatdhan, this);
	},


	hoverDhani: function() {
		detectDhani.input.useHandCursor = true;
	},

	hovdhanchat: function() {
		msgDhan.input.useHandCursor = true;
		msgDhan.tint = 0x88FFCE;
	},

	nohovdhanchat: function() {
		msgDhan.tint = 0xffffff;
	},

	chatdhan: function() {
		game.state.start('dhanichat');
	},

	//---------------------------------------------------------------

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

		msgYash = game.add.sprite(660, 36, 'msgbutton');
		msgYash.alpha = 1;
		msgYash.inputEnabled = true;

		msgYash.events.onInputOver.add(this.hovyashchat, this);
		msgYash.events.onInputOut.add(this.nohovyashchat, this);
		msgYash.events.onInputDown.add(this.chatyash, this);
	},

	hoverYash: function() {
		detectYash.input.useHandCursor = true;
	},

	hovyashchat: function() {
		msgYash.input.useHandCursor = true;
		msgYash.tint = 0x88FFCE;
	},
	nohovyashchat: function() {
		msgYash.tint = 0xffffff;	
	},

	chatyash: function() {
		game.state.start('yashchat')
	},
}
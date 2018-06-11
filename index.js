import loadingMenu from 'loadingMenu.js';
import settings from 'settings.js';
import credits from 'credits.js';
import triggers from 'triggers.js';
import phase1 from 'phase1.js';
import MiniGameA from 'MiniGameA.js';
import MiniGameB from 'MiniGameB.js';
import MiniGameC from 'MiniGameC.js';
import MiniGameD from 'MiniGameD.js';
import GameOver from 'GameOver.js';

class Game extends Phaser.Game {
	constructor() {
		super(900, 630, Phaser.AUTO, '');
		
		this.state.add('loadingMenu', loadingMenu, false);
		this.state.add('settings', settings, false);
		this.state.add('credits', triggers, false);
		this.state.add('phase1', phase1, false);
		this.state.add('MiniGameA', MiniGameA, false);
		this.state.add('MiniGameB', MiniGameB, false);
		this.state.add('MiniGameC', MiniGameC, false);
		this.state.add('MiniGameE', MiniGameD, false);
		this.state.add('GameOver', GameOver, false);
		
		this.state.start('loadingMenu');
	}
}

new Game();
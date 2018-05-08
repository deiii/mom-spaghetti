// Nathan Altice
// 4/8/18
// Simple 3-State Switcher

// define game
var game = new Phaser.Game(1500, 450, Phaser.AUTO);

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
	},
	create: function() {
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#facade";
	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay');
		}
	}
}

// define GamePlay state and methods
var GamePlay = function(game) {};
GamePlay.prototype = {
	preload: function() {
		console.log('GamePlay: preload');
		this.game.load.image("block", "assets/img/wall.png");
	    this.game.load.image("light", "assets/img/sun.png");
	    this.game.load.image("moon", "assets/img/moon.png");
	    this.game.load.image("night", "assets/img/night.png");
	},
	create: function() {
		var light;
		var night;
		var moon;
	// --------------------------------------------------------------------
		
		// Set background color
		this.game.stage.backgroundColor = 0xffffff;
		// Create group for lights
		this.lightGroup = this.game.add.group();

		// Daytime
		light = this.game.add.sprite(0, this.game.height - 600, 'light');
		light.anchor.setTo(0.5, 0.5);
		this.game.add.tween(light).to({x: this.game.width - 10}, 10000,
			Phaser.Easing.Sinusoidal.InOut, true, 0); 
		this.lightGroup.add(light);

		// Nighttime
		night = this.game.add.sprite(0,0, 'night');
		night.alpha = 0;
		game.add.tween(night).to({alpha: 1}, 2000, 'Linear', true, 12000);

		moon = this.game.add.sprite(0,0, 'moon');
		moon.alpha = 0;
		game.add.tween(moon).to({alpha: 1}, 2000, 'Linear', true, 12000);

	// --------------------------------------------------------------------

	// --------------------------------------------------------------------

		// Create a bitmap texture for drawing light cones
		this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
		this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
		this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
		var lightBitmap = this.game.add.image(0,0, this.bitmap);

		// Allows normal background colors to show through bitmap texture
		lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;

		// Create a bitmap for drawing rays
		this.rayBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
		this.rayBitmapImage = this.game.add.image(0,0, this.rayBitmap);
		this.rayBitmapImage.visible = false;

		// Build walls to block line of sight.
		var NUMBER_OF_WALLS = 6;
		this.walls = this.game.add.group();

		var i, x, y;
		for(i = 0; i < NUMBER_OF_WALLS; i++) {
			x = i * this.game.width/NUMBER_OF_WALLS;
			y = this.game.rnd.integerInRange(150, 350);
			this.game.add.image(x, y, 'block', 0, this.walls);
		}
	},
		update: function() {
		// GamePlay logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GameOver');
		}
		this.bitmap.context.fillStyle = 'rgb(180, 180, 180)';
	    this.bitmap.context.fillRect(0, 0, this.game.width, this.game.height);
	    this.rayBitmap.context.clearRect(0, 0, this.game.width, this.game.height);

	    var stageCorners = [
        	new Phaser.Point(0, 0),
        	new Phaser.Point(this.game.width, 0),
        	new Phaser.Point(this.game.width, this.game.height),
        	new Phaser.Point(0, this.game.height)
    	];

    	this.lightGroup.forEach(function(light) {
	        var points = [];
	        var ray = null;
	        var intersect;
	        var i;

	        this.walls.forEach(function(wall) {

	        	var corners = [
	                new Phaser.Point(wall.x+0.1, wall.y+0.1),
	                new Phaser.Point(wall.x-0.1, wall.y-0.1),

	                new Phaser.Point(wall.x-0.1 + wall.width, wall.y+0.1),
	                new Phaser.Point(wall.x+0.1 + wall.width, wall.y-0.1),

	                new Phaser.Point(wall.x-0.1 + wall.width, wall.y-0.1 + wall.height),
	                new Phaser.Point(wall.x+0.1 + wall.width, wall.y+0.1 + wall.height),

	                new Phaser.Point(wall.x+0.1, wall.y-0.1 + wall.height),
	                new Phaser.Point(wall.x-0.1, wall.y+0.1 + wall.height)
            	];
			
				for(i = 0; i < corners.length; i++) {
	                var c = corners[i];

	                // Here comes the linear algebra.
	                // The equation for a line is y = slope * x + b
	                // b is where the line crosses the left edge of the stage
	                var slope = (c.y - light.y) / (c.x - light.x);
	                var b = light.y - slope * light.x;

	                var end = null;

	                if (c.x === light.x) {
                    // Vertical lines are a special case
                    	if (c.y <= light.y) {
                        	end = new Phaser.Point(light.x, 0);
                    	} else {
                        	end = new Phaser.Point(light.x, this.game.height);
                    	}
               		} else if (c.y === light.y) {
                    // Horizontal lines are a special case
                    	if (c.x <= light.x) {
                        	end = new Phaser.Point(0, light.y);
                    	} else {
                        	end = new Phaser.Point(this.game.width, light.y);
                    	}
                	} else {
	                    // Find the point where the line crosses the stage edge
	                    var left = new Phaser.Point(0, b);
	                    var right = new Phaser.Point(this.game.width, slope * this.game.width + b);
	                    var top = new Phaser.Point(-b/slope, 0);
	                    var bottom = new Phaser.Point((this.game.height-b)/slope, this.game.height);


	                    if (c.y <= light.y && c.x >= light.x) {
                        	if (top.x >= 0 && top.x <= this.game.width) {
                            	end = top;
                        	} else {
                            	end = right;
                        	}
                   	 	} else if (c.y <= light.y && c.x <= light.x) {
                        	if (top.x >= 0 && top.x <= this.game.width) {
                            	end = top;
                        	} else {
                            	end = left;
                        	}
                    	} else if (c.y >= light.y && c.x >= light.x) {
                        	if (bottom.x >= 0 && bottom.x <= this.game.width) {
                            	end = bottom;
                        	} else {
                            	end = right;
                        	}
                    	} else if (c.y >= light.y && c.x <= light.x) {
                        	if (bottom.x >= 0 && bottom.x <= this.game.width) {
                            	end = bottom;
                        	} else {
                            	end = left;
                        	}
                    	}
	                }
	                ray = new Phaser.Line(light.x, light.y, end.x, end.y);
                
	                // Check if the ray intersected the wall
	                intersect = this.getWallIntersection(ray);
	                if (intersect) {
	                   	// This is the front edge of the light blocking object
	                    points.push(intersect);
	                } else {
	                    // Nothing blocked the ray
	                    points.push(ray.end);
	                }
	            }
	        }, this);

	        for(i = 0; i < stageCorners.length; i++) {
            	ray = new Phaser.Line(light.x, light.y,
                	stageCorners[i].x, stageCorners[i].y);
            	intersect = this.getWallIntersection(ray);
            	if (!intersect) {
                	// Corner is in light
                	points.push(stageCorners[i]);
            	}
        	}

        	var center = { x: light.x, y: light.y };
        	points = points.sort(function(a, b) {
            	if (a.x - center.x >= 0 && b.x - center.x < 0)
                	return 1;
            	if (a.x - center.x < 0 && b.x - center.x >= 0)
                	return -1;
            	if (a.x - center.x === 0 && b.x - center.x === 0) {
                	if (a.y - center.y >= 0 || b.y - center.y >= 0)
                    	return 1;
                	return -1;
            	}
            	var det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
		            if (det < 0)
		                return 1;
		            if (det > 0)
		                return -1;


		        	var d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
            		var d2 = (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);
            		return 1;
        		});

        		this.bitmap.context.beginPath();
		        this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
		        this.bitmap.context.moveTo(points[0].x, points[0].y);
		        for(var j = 0; j < points.length; j++) {
		            this.bitmap.context.lineTo(points[j].x, points[j].y);
		        }
		        this.bitmap.context.closePath();
		        this.bitmap.context.fill();

		        // Draw each of the rays on the rayBitmap
		        this.rayBitmap.context.beginPath();
		        this.rayBitmap.context.strokeStyle = 'rgb(255, 255, 255)';
		        this.rayBitmap.context.fillStyle = 'rgb(255, 255, 255)';
		        this.rayBitmap.context.moveTo(points[0].x, points[0].y);
		        for(var k = 0; k < points.length; k++) {
		            this.rayBitmap.context.moveTo(light.x, light.y);
		            this.rayBitmap.context.lineTo(points[k].x, points[k].y);
		            this.rayBitmap.context.fillRect(points[k].x-2, points[k].y-2, 4, 4);
		        }
		        this.rayBitmap.context.stroke();

		    }, this);

		    // This just tells the engine it should update the texture cache
		    this.bitmap.dirty = true;
		    this.rayBitmap.dirty = true;
		},
		getWallIntersection: function(ray) {
			var distanceToWall = Number.POSITIVE_INFINITY;
    		var closestIntersection = null;

    		this.walls.forEach(function(wall) {
    			var lines = [
		            new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
		            new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
		            new Phaser.Line(wall.x + wall.width, wall.y,
		                wall.x + wall.width, wall.y + wall.height),
		            new Phaser.Line(wall.x, wall.y + wall.height,
		                wall.x + wall.width, wall.y + wall.height)
		        ];

		        for(var i = 0; i < lines.length; i++) {
           			var intersect = Phaser.Line.intersects(ray, lines[i]);
            		if (intersect) {
                		// Find the closest intersection
                		distance =
                    		this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                		if (distance < distanceToWall) {
                    		distanceToWall = distance;
                    		closestIntersection = intersect;
                		}
            		}
        		}
    		}, this);

    		return closestIntersection;
	}
}

// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');
	},
	create: function() {
		console.log('GameOver: create');
		game.stage.backgroundColor = "#bb11ee";
	},
	update: function() {
		// GameOver logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
	}

}

// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');


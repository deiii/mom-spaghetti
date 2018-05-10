var game = new Phaser.Game(1500, 450, Phaser.AUTO);

// Main Menu
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
		console.log('MainMenu: preload');
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
	},
	create: function() {
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#facade";
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
	},
	update: function() {
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay');
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
		}
	}
}

// Game State
	// ----------------------------------------------------------------------------------------------------------------------------------------BEGIN MAIN GAME STATE 
var GamePlay = function(game) {};
GamePlay.prototype = {
	// ----------------------------------------------------------------------------------------------------------------------------------------PRELOAD FUNCTION
	preload: function() {
		console.log('GamePlay: preload');
		this.game.load.image("block", "assets/img/wall.png");
	    this.game.load.image("light", "assets/img/sun.png");
	    this.game.load.image("moon", "assets/img/moon.png");
	    this.game.load.image("night", "assets/img/night.png");

	    this.game.load.image("bud", "assets/img/budweiner.png");
	},
	// ----------------------------------------------------------------------------------------------------------------------------------------CREATE FUNCTION
	create: function() {
	// --------------------------------------------------------------------
	// Variables for visuals
	// --------------------------------------------------------------------
		var light;
		var night;
		var moon;
	// --------------------------------------------------------------------
	// Background | Light source | Night/Day
	// --------------------------------------------------------------------
		// Set background color
		this.game.stage.backgroundColor = 0xB878D4;
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
	// Bitmap for light/shadows
	// --------------------------------------------------------------------
		// Bitmap texture for drawing light cones
		this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
		this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
		this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
		var lightBitmap = this.game.add.image(0,0, this.bitmap);
	// --------------------------------------------------------------------
		// Allows normal background colors to show through bitmap texture
		lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
	// --------------------------------------------------------------------
	// Bitmap for light rays
	// --------------------------------------------------------------------
		// Create a bitmap for drawing rays
		this.rayBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
		this.rayBitmapImage = this.game.add.image(0,0, this.rayBitmap);
		this.rayBitmapImage.visible = true;
	// --------------------------------------------------------------------
	// Line of sight shadow casting
	// --------------------------------------------------------------------
		// Build walls to block line of sight.
		var NUMBER_OF_WALLS = 6;
		var i, x, y;
		
		this.walls = this.game.add.group();

		for(i = 0; i < NUMBER_OF_WALLS; i++) {
			x = i * this.game.width/NUMBER_OF_WALLS;
			y = this.game.rnd.integerInRange(150, 350);
			this.game.add.image(x, y, 'block', 0, this.walls);
		}
	// --------------------------------------------------------------------
	// Player sprite/properties
	// --------------------------------------------------------------------
		// Add in player + properties
		player = game.add.sprite(0,400,'bud');
		player.anchor.setTo(0.5,1.0);	    
	    
	    game.physics.arcade.enable(player);
	    player.body.gravity.y = 1500;
	    player.body.collideWorldBounds = true;

	},
	// ----------------------------------------------------------------------------------------------------------------------------------------UPDATE FUNCTION

	update: function() {
	// --------------------------------------------------------------------
	// Press SPACE to switch state. 
	// --------------------------------------------------------------------
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GameOver');
		}
	// --------------------------------------------------------------------
	// Fill in shadows.
	// --------------------------------------------------------------------
		// Create the shadows
		this.bitmap.context.fillStyle = 'rgb(180, 180, 180)';
	    this.bitmap.context.fillRect(0, 0, this.game.width, this.game.height);
	    this.rayBitmap.context.clearRect(0, 0, this.game.width, this.game.height);
	// --------------------------------------------------------------------
	// Indicate the corners of the stage.
	// --------------------------------------------------------------------
		// Corners of the stage/game window
	    var stageCorners = [
        	new Phaser.Point(0, 0),
        	new Phaser.Point(this.game.width, 0),
        	new Phaser.Point(this.game.width, this.game.height),
        	new Phaser.Point(0, this.game.height)
    	];
    // --------------------------------------------------------------------
    // Each light in the lightGroup to cast rays.
    // --------------------------------------------------------------------
    	// Cast the rays from the light source
    	this.lightGroup.forEach(function(light) {
	        var points = [];
	        var ray = null;
	        var intersect;
	        var i;
	// --------------------------------------------------------------------
	// Indicate the corners of each wall. 
	// --------------------------------------------------------------------
		// Define the inside/outside corners of each block/wall.
		// Also, create a ray that goes from these corners to the edge of the stage.
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
    // --------------------------------------------------------------------
    // Interaction between rays and the stage edges. 
    // --------------------------------------------------------------------
    	// ------------------------------------------------------------------
		// Calculate the rays from each wall corner to the edge of the stage. 
		// ------------------------------------------------------------------
		// 'slope' is the slope of one line/ray.
		// 'b' is where a line crosses the left edge of the stage/game window
		//-------------------------------------------------------------------
		for(i = 0; i < corners.length; i++) {
            var c = corners[i];
            var slope = (c.y - light.y) / (c.x - light.x);
            var b = light.y - slope * light.x;
        // ------------------------------------------------------------------
        // Create empty 'end' variable, and change it within the if-statements. 
        // This lets us account for the way a ray from the light source interacts
        // with the edges of the stage.
        // ------------------------------------------------------------------
            var end = null;

            if (c.x === light.x) {
           	// ------------------------------------------------------------------
            // Account for vertical rays
            // If the vertical rays coming from a wall corner reaches the stage edge, 
            // create a new end point for the ray. 
            // ------------------------------------------------------------------
            	if (c.y <= light.y) {
                	end = new Phaser.Point(light.x, 0);
            	} else {
                	end = new Phaser.Point(light.x, this.game.height);
            	}
       		} else if (c.y === light.y) {
       		// ------------------------------------------------------------------
            // Account for horizontal rays.
            // If the horizontal rays from a wall corner reach the stage edge,
            // create a new ray end point.
            // ------------------------------------------------------------------
            	if (c.x <= light.x) {
                	end = new Phaser.Point(0, light.y);
            	} else {
                	end = new Phaser.Point(this.game.width, light.y);
            	}
        	} else {
        	// ------------------------------------------------------------------
            // Find the point where a ray crosses the stage edge.
            // ------------------------------------------------------------------
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
    // --------------------------------------------------------------------
    // Ray creation and line of sight detection/intersection.
    // --------------------------------------------------------------------
    			// Create a ray
                ray = new Phaser.Line(light.x, light.y, end.x, end.y);
            
                // Check if the ray intersects the wall
                intersect = this.getWallIntersection(ray);

                if (intersect) {
                   	// Front edge of the wall that is blocking light.
                    points.push(intersect);
                } else {
                    // If nothing blocks the ray, then the ray ends. 
                    points.push(ray.end);
                }
            }
        }, this);
	// --------------------------------------------------------------------
	// Avoid unwanted shadow behavior. 
	// --------------------------------------------------------------------
			// ------------------------------------------------------------------
			// Use rays to check if stage corners are inside/outside a shadow.
			// This makes it so that there is not weird shadow behavior at the corners
			// and appears as intended.
			// ------------------------------------------------------------------
	        for(i = 0; i < stageCorners.length; i++) {
            	ray = new Phaser.Line(light.x, light.y,
                	stageCorners[i].x, stageCorners[i].y);
            	intersect = this.getWallIntersection(ray);
            	if (!intersect) {
                	// If the corner is outside a shadow
                	// Don't let the shadow "jump" into view
                	// Comment out this for-loop to see what I mean. 
                	points.push(stageCorners[i]);
            	}
        	}
    // --------------------------------------------------------------------
    // Ray order algorithm. 
    // --------------------------------------------------------------------
    		// ------------------------------------------------------------------
    		// Sort the end points clockwise from the light source.
    		// This is so each point is in the same order as 
    		// the rays that come from the light source. 
    		// 
    		// This comes from:
        	// http://stackoverflow.com/questions/6989100/sort-points-in-clockwise-order
    		// ------------------------------------------------------------------
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
    // --------------------------------------------------------------------
    // What is this, actually?
    // --------------------------------------------------------------------
    		// Compute the cross product of vectors (center -> a) * (center -> b)
        	var det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
	            if (det < 0)
	                return 1;
	            if (det > 0)
	                return -1;
	// --------------------------------------------------------------------
	// Having to do with 'what is this, actually?', apparently.
	// --------------------------------------------------------------------
			// Points a and b are on the same line from the center
			// This checks which is closer to the center	        	
        	var d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
    		var d2 = (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);
    		return 1;
		});
    // --------------------------------------------------------------------
    // Code connected to drawing shadows. 
    // --------------------------------------------------------------------
    		// Also allows the shadow fill to occur. How is this connected to the .fillRect above?
    		// beginPath appears to make it so that the shadow color will move with 
    		// the movement of the rays. The for-loop is also responsible for shadow. 
	   		this.bitmap.context.beginPath();
	        this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
	        this.bitmap.context.moveTo(points[0].x, points[0].y);
	        for(var j = 0; j < points.length; j++) {
	            this.bitmap.context.lineTo(points[j].x, points[j].y);
	        }
	        this.bitmap.context.closePath();
	        this.bitmap.context.fill();
	// --------------------------------------------------------------------
	// Code connected to the lines/rays.
	// --------------------------------------------------------------------
			// ------------------------------------------------------------------
	        // Draw each of the rays on the rayBitmap
	        // This is responsbile for the lines. 
	        // ------------------------------------------------------------------
	        this.rayBitmap.context.beginPath();
	        this.rayBitmap.context.strokeStyle = 'rgb(255, 255, 255)';
	        this.rayBitmap.context.fillStyle = 'rgb(255, 255, 255)';
	        this.rayBitmap.context.moveTo(points[0].x, points[0].y);
	        for(var k = 0; k < points.length; k++) {
	        	// ------------------------------------------------------------------
	        	// When commented out: The only lines that show are from the walls down. 
	            // this.rayBitmap.context.moveTo(light.x, light.y);
	            // ------------------------------------------------------------------
	            this.rayBitmap.context.lineTo(points[k].x, points[k].y);
	            // this.rayBitmap.context.fillRect(points[k].x-2, points[k].y-2, 4, 4);
	        }
	        // And of course, this actually draws the rays in general. 
	        this.rayBitmap.context.stroke(); 
	// --------------------------------------------------------------------
	// Set character velocity and keys for controls. 
	// --------------------------------------------------------------------
			// Character movement 
				// Assign A and D variables for WASD left/right controls
				LB = game.input.keyboard.addKey(Phaser.Keyboard.A);

				RB = game.input.keyboard.addKey(Phaser.Keyboard.D);
				// Set player velocity so he doesn't slide when you're not controlling him.
				player.body.velocity.x = 0;
	// --------------------------------------------------------------------
	// Set left/right player movement.
	// --------------------------------------------------------------------
			    if (LB.isDown)
			    {
			        //  Move to the left
			        player.body.velocity.x = -600;
			    }
			    else if (RB.isDown)
			    {
			        //  Move to the right
			        player.body.velocity.x = 600;
			    }
			     
		    }, this);
	// --------------------------------------------------------------------
	// Clean up the lines. 
	// --------------------------------------------------------------------
		    // Update the texture cache so lines don't do weird shit and hurt your eyes
		    this.bitmap.dirty = true;
		    this.rayBitmap.dirty = true;
		},
	// ----------------------------------------------------------------------------------------------------------------------------------------INTERSECTION FUNCTION
	// --------------------------------------------------------------------
	// This detects the closest ray-wall intersection. 
	// AKA where rays hit walls, but also if it doesn't hit any walls. 
	getWallIntersection: function(ray) {
	// --------------------------------------------------------------------
	// Variables
	// --------------------------------------------------------------------
			var distanceToWall = Number.POSITIVE_INFINITY;
    		var closestIntersection = null;
	// --------------------------------------------------------------------
	// Assign wall edges to each block.
	// --------------------------------------------------------------------
    		// For each wall
    		this.walls.forEach(function(wall) {
    			// -------------------------------------
    			// Array defining all 4 edges of a wall.
    			// Or: 4 walls of a square block
    			// -------------------------------------
    			var lines = [
		            new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
		            new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
		            new Phaser.Line(wall.x + wall.width, wall.y,
		                wall.x + wall.width, wall.y + wall.height),
		            new Phaser.Line(wall.x, wall.y + wall.height,
		                wall.x + wall.width, wall.y + wall.height)
		        ];
	// --------------------------------------------------------------------
	// Ray-to-Wall Intersection.
	// --------------------------------------------------------------------
			// Tests if any of the walls connect with a ray.
			// If it does, then the light is hitting something. 
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
		},
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
}
	// ----------------------------------------------------------------------------------------------------------------------------------------END OF MAIN GAME STATE

// Game Over
var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
		console.log('GameOver: preload');
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
	},
	create: function() {
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
		console.log('GameOver: create');
		game.stage.backgroundColor = "#bb11ee";
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
	},
	update: function() {
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
		// GameOver logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
	// --------------------------------------------------------------------
	// --------------------------------------------------------------------
		}
	}
}



// --------------------------------------------------------------------
// add states to State Manager and start Main Menu
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
// --------------------------------------------------------------------

// Copyright © 2014 John Watson
// Licensed under the terms of the MIT License

//------------------------------------------------------------------------------------------------------------

//                        T R Y I N G  F O R  M A I N  M E N U. N O  L U C K :'( -Dhani

//------------------------------------------------------------------------------------------------------------
// var MainMenu = function(game) {};
// MainMenu.prototype.preload = function() {
//      console.log('MainMenu: preload');
//  };
// MainMenu.prototype.create = function() {
//  console.log('MainMenu: create');
//  game.stage.backgroundColor = "#facade";
// };
// MainMenu.prototype.update = function() {
//  // main menu logic
//  if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
//      game.state.start('GamePlay');
//  }
// };
//------------------------------------------------------------------------------------------------------------

//                                        M A I N  G A M E  L O O P

//------------------------------------------------------------------------------------------------------------
var GameState = function(game) {};
// Load images and sounds
GameState.prototype.preload = function() {
    this.game.load.image("block", "assets/img/wall.png");
    this.game.load.image("light", "assets/img/sun.png");
    this.game.load.image("moon", "assets/img/moon.png");
    this.game.load.image("night", "assets/img/night.png");
};

//------------------------------------------------------------------------------------------------------------

//                                        C R E A T E  F U N C T I O N

//------------------------------------------------------------------------------------------------------------

// Setup the example
GameState.prototype.create = function() {
    // --------------------
    // Here, I'm trying to do global variables, mainly because I want to do 
    // the if-statement detecting night time in the update function. It's still not working! 
    
    // The if-statement in the code is on lines 171-174, please help me D:.

    // Main error is: "night" is not defined

    // --------------------
    var light;
    var night;
    var moon;
    // --------------------

    // Set stage background color to white
    this.game.stage.backgroundColor = 0xffffff;

    // Create light group
    this.lightGroup = this.game.add.group();

//-------------------------------------------------------------------
// Let's us create another light source, if we want to. Keeping it for now
//-------------------------------------------------------------------
    // this.light = this.game.add.sprite(this.game.width/2, this.game.height/2, 'light');
    // this.lightGroup.add(this.light);

    // Set the pivot point of the light to the center of the texture
    // this.light.anchor.setTo(0.5, 0.5);
//-------------------------------------------------------------------

// Sunlight and day cycle ------------------------------------------
    // Add the sun, tween it so that it moves across the sky
    light = this.game.add.sprite(0, this.game.height - 600, 'light');
    light.anchor.setTo(0.5, 0.5);
    this.game.add.tween(light).to({ x: this.game.width - 10 }, 10000,
        Phaser.Easing.Sinusoidal.InOut, true, 0); //, Number.POSITIVE_INFINITY, true);
    this.lightGroup.add(light);

// Fade into night cycle -------------------------------------------
        night = this.game.add.sprite(0, 0, 'night');
        night.alpha = 0;
        game.add.tween(night).to({alpha: 1}, 2000, 'Linear',true,12000);

        moon = this.game.add.sprite(0, 0, 'moon');
        moon.alpha = 0;
        game.add.tween(moon).to({alpha: 1}, 2000, 'Linear',true,12100);
//-------------------------------------------------------------------

//                         BITMAP THINGS

//-------------------------------------------------------------------

    // Create a bitmap texture for drawing light cones
    this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
    this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
    var lightBitmap = this.game.add.image(0, 0, this.bitmap);

    // Since this bitmap is over the background, dark areas of the bitmap
    // will make the background darker. White areas of the bitmap will allow
    // the normal colors of the background to show through.
    lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;

    // Create a bitmap for drawing rays
    this.rayBitmap = this.game.add.bitmapData(this.game.width, this.game.height);
    this.rayBitmapImage = this.game.add.image(0, 0, this.rayBitmap);
    this.rayBitmapImage.visible = false;
//-------------------------------------------------------------------
//-------------------------------------------------------------------
    // Build some walls. These will block line of sight.
    // Generates and disperses them randomly.

    // Warning: I've tested on different shapes, and regardless of what the asset looks like,
    // maybe like a triangle on a transparent background, it still only detects
    // the square/rectangular dimensions of the png, so it will always act like
    // the light is making shadows off of a square/rectangle.
//-------------------------------------------------------------------
    var NUMBER_OF_WALLS = 6;
    this.walls = this.game.add.group();

    var i, x, y;
    for(i = 0; i < NUMBER_OF_WALLS; i++) {
        x = i * this.game.width/NUMBER_OF_WALLS;
        y = this.game.rnd.integerInRange(150, 350);
        this.game.add.image(x, y, 'block', 0, this.walls);
    }
};


//------------------------------------------------------------------------------------------------------------

//                                        U P D A T E  F U N C T I O N

//------------------------------------------------------------------------------------------------------------

GameState.prototype.update = function() {
//-------------------------------------------------------------------
// This was attached to the 2nd lightsource seen in the create function. 
// Keeping for now.
//-------------------------------------------------------------------
    // Move the light to the pointer/touch location
    // this.light.x = this.game.input.activePointer.x;
    // this.light.y = this.game.input.activePointer.y;
//-------------------------------------------------------------------

//-------------------------------------------------------------------
// This controls the shadow colors.
//-------------------------------------------------------------------
    // Fill the entire light bitmap.
    this.bitmap.context.fillStyle = 'rgb(180, 180, 180)';
    this.bitmap.context.fillRect(0, 0, this.game.width, this.game.height);
    this.rayBitmap.context.clearRect(0, 0, this.game.width, this.game.height);



//-------------------------------------------------------------------
//-------------------------------------------------------------------
//                      PLEASE HAS A LOOK
//-------------------------------------------------------------------
//-------------------------------------------------------------------
// Attempt to detect if night is active. 
// ---This is high-ish priority.---
//
// !!!Maybe tackle this once we have state changes and
// a state change to 'Game Over' when not in a shadow!!!
//-------------------------------------------------------------------
//-------------------------------------------------------------------
    // if(night.alpha = 1)
    // {
    //  this.bitmap.context.fillStyle = 'rgb(255,255,255)';
    // }
//-------------------------------------------------------------------
//-------------------------------------------------------------------




//-------------------------------------------------------------------

// I think this is for detecting corners on the shapes
// for the shadows. 

//-------------------------------------------------------------------
    // An array of the stage corners that we'll use later
    var stageCorners = [
        new Phaser.Point(0, 0),
        new Phaser.Point(this.game.width, 0),
        new Phaser.Point(this.game.width, this.game.height),
        new Phaser.Point(0, this.game.height)
    ];

//-------------------------------------------------------------------

//                         RAYCAST THINGS

//-------------------------------------------------------------------

    // Ray casting!
    // Cast rays from each light
    this.lightGroup.forEach(function(light) {
        var points = [];
        var ray = null;
        var intersect;
        var i;

        //-------------------------------------------------------------------   
        // Cast rays through the corners of each wall towards the stage edge.
        // Save all of the intersection points or ray end points if there was no intersection.
        //-------------------------------------------------------------------   
        this.walls.forEach(function(wall) {
            //-------------------------------------------------------------------   
            // Create a ray from the light through each corner out to the edge of the stage.
            // This array defines points just inside of each corner to make sure we hit each one.
            // It also defines points just outside of each corner so we can see to the stage edges.
            //-------------------------------------------------------------------   
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
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
            // Calculate rays through each point to the edge of the stage
            for(i = 0; i < corners.length; i++) {
                var c = corners[i];

                // Here comes the linear algebra.
                // The equation for a line is y = slope * x + b
                // b is where the line crosses the left edge of the stage
                var slope = (c.y - light.y) / (c.x - light.x);
                var b = light.y - slope * light.x;

                var end = null;
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
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
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
                    // Get the actual intersection point
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
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
                // Create a ray
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
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------

        //-------------------------------------------------------------------
        // Shoot rays at each of the stage corners to see if the corner
        // of the stage is in shadow. This needs to be done so that
        // shadows don't cut the corner.
        //-------------------------------------------------------------------
        for(i = 0; i < stageCorners.length; i++) {
            ray = new Phaser.Line(light.x, light.y,
                stageCorners[i].x, stageCorners[i].y);
            intersect = this.getWallIntersection(ray);
            if (!intersect) {
                // Corner is in light
                points.push(stageCorners[i]);
            }
        }
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
        
        //-------------------------------------------------------------------
        // Now sort the points clockwise around the light.
        // Sorting is required so that the points are connected in the right order.
        //
        // This sorting algorithm was copied from Stack Overflow:
        // http://stackoverflow.com/questions/6989100/sort-points-in-clockwise-order
        //
        // Here's a pseudo-code implementation if you want to code it yourself:
        // http://en.wikipedia.org/wiki/Graham_scan
        //-------------------------------------------------------------------

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
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
        // Compute the cross product of vectors (center -> a) x (center -> b)
        var det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);
            if (det < 0)
                return 1;
            if (det > 0)
                return -1;
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
            // Points a and b are on the same line from the center
            // Check which point is closer to the center
            var d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
            var d2 = (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);
            return 1;
        });
    //-------------------------------------------------------------------
    //-------------------------------------------------------------------
        
        //-------------------------------------------------------------------
        // Connect the dots and fill in the shape, which are cones of light,
        // with a bright white color. When multiplied with the background,
        // the white color will allow the full color of the background to
        // shine through.
        //-------------------------------------------------------------------
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
};
//-------------------------------------------------------------------
//-------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------

//                                        WALL INTERSECTION  F U N C T I O N

//------------------------------------------------------------------------------------------------------------

// Given a ray, this function iterates through all of the walls and
// returns the closest wall intersection from the start of the ray
// or null if the ray does not intersect any walls.
GameState.prototype.getWallIntersection = function(ray) {
    var distanceToWall = Number.POSITIVE_INFINITY;
    var closestIntersection = null;

    // For each of the walls...
    this.walls.forEach(function(wall) {
        // Create an array of lines that represent the four edges of each wall
        var lines = [
            new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
            new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
            new Phaser.Line(wall.x + wall.width, wall.y,
                wall.x + wall.width, wall.y + wall.height),
            new Phaser.Line(wall.x, wall.y + wall.height,
                wall.x + wall.width, wall.y + wall.height)
        ];

        // Test each of the edges in this wall against the ray.
        // If the ray intersects any of the edges then the wall must be in the way.
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
};

//------------------------------------------------------------------------------------------------------------
//                                             Setup game
//------------------------------------------------------------------------------------------------------------
var game = new Phaser.Game(1500, 450, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);
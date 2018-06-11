var PIECE_WIDTH = 180,
    PIECE_HEIGHT = 210,
    BOARD_COLS,
    BOARD_ROWS;

var piecesGroup,
    piecesAmount,
    shuffledIndexArray = [];

var incchat = 0;

var edchat2 = function(game) {};
edchat2.prototype = {
    preload: function() {
        game.load.spritesheet("sprite", "assets/img/chat/kissthegirl.png", PIECE_WIDTH, PIECE_HEIGHT);
        game.load.atlas('hearts', 'assets/img/chat/hearts.png', 'assets/img/chat/hearts.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    },

    create: function(){
        this.camera.flash('#000000', 700);

        this.prepareBoard();
    },
    update: function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            game.state.start('phase2');
            game.sound.stopAll();
            if (((localStorage.getItem("incb2") >= 2) && 
                (localStorage.getItem("incsh2") >= 2) && 
                (localStorage.getItem("inctr2") >= 1)))
            {
                game.sound.stopAll();
                game.state.start('phase3');
            } 

        }
    },
    prepareBoard: function(){
        var piecesIndex = 0,
            i, j,
            piece;

        BOARD_COLS = Math.floor(game.world.width / PIECE_WIDTH);
        BOARD_ROWS = Math.floor(game.world.height / PIECE_HEIGHT);
        
        piecesAmount = BOARD_COLS * BOARD_ROWS;

        shuffledIndexArray = this.createShuffledIndexArray();

        piecesGroup = game.add.group();
        
        for (i = 0; i < BOARD_ROWS; i++)
        {
            for (j = 0; j < BOARD_COLS; j++)
            {
                if (shuffledIndexArray[piecesIndex]) {
                    piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "sprite", shuffledIndexArray[piecesIndex]);
                }
                else { //initial position of black piece
                    piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT);
                    piece.black = true;
                }
                piece.name = 'piece' + i.toString() + 'x' + j.toString();
                piece.currentIndex = piecesIndex;
                piece.destIndex = shuffledIndexArray[piecesIndex];
                piece.inputEnabled = true;
                piece.events.onInputDown.add(this.selectPiece, this);
                piece.posX = j;
                piece.posY = i;
                piecesIndex++;
            }
        }
    },

    selectPiece: function(piece) {

        var blackPiece = this.canMove(piece);

        //if there is a black piece in neighborhood
        if (blackPiece) {
            this.movePiece(piece, blackPiece);
        }

    },

    canMove: function(piece) {

        var foundBlackElem = false;

        piecesGroup.children.forEach(function(element) {
            if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
                element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
                element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
                element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
                foundBlackElem = element;
                return;
            }
        });
        return foundBlackElem;
    },

    movePiece: function(piece, blackPiece) {

        var tmpPiece = {
            posX: piece.posX,
            posY: piece.posY,
            currentIndex: piece.currentIndex
        };

        game.add.tween(piece).to({x: blackPiece.posX * PIECE_WIDTH, y: blackPiece.posY * PIECE_HEIGHT}, 300, Phaser.Easing.Linear.None, true);

        //change places of piece and blackPiece
        piece.posX = blackPiece.posX;
        piece.posY = blackPiece.posY;
        piece.currentIndex = blackPiece.currentIndex;
        piece.name ='piece' + piece.posX.toString() + 'x' + piece.posY.toString();

        //piece is the new black
        blackPiece.posX = tmpPiece.posX;
        blackPiece.posY = tmpPiece.posY;
        blackPiece.currentIndex = tmpPiece.currentIndex;
        blackPiece.name ='piece' + blackPiece.posX.toString() + 'x' + blackPiece.posY.toString();

        //after every move check if puzzle is completed
        this.checkIfFinished();
    },

    checkIfFinished: function() {

        var isFinished = true;

        piecesGroup.children.forEach(function(element) {
            if (element.currentIndex !== element.destIndex) {
                isFinished = false;
                return;
            }
        });

        if (isFinished) {
            this.showFinishedText();
        }

    },

    showFinishedText: function() {

        heart = game.add.sprite(game.world.centerX, game.world.centerY, 'hearts');
        heart.animations.add('heart', Phaser.Animation.generateFrameNames('heart',1,7),8,true);
        heart.anchor.setTo(0.5, 0.5);
        heart.scale.setTo(2,2);

        edheart = game.add.sprite(game.world.centerX, game.world.centerY, 'hearts', 'edheart');
        edheart.alpha = 0;
        edheart.anchor.setTo(0.5, 0.5);
        game.add.tween(edheart).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 1000); 

        heart.animations.play('heart');

        incchat += 1;

        localStorage.setItem("incchat", inchat);
    },

    createShuffledIndexArray: function() {

        var indexArray = [];
        for (var i = 0; i < piecesAmount; i++)
        {
            indexArray.push(i);
        }
        return this.shuffle(indexArray);
    },

    shuffle: function(array) {

        var counter = array.length,
            temp,
            index;

        while (counter > 0)
        {
            index = Math.floor(Math.random() * counter);

            counter--;

            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
        
    }
}

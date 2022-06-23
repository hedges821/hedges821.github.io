var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var score = 0;
var scoreText;
var game = new Phaser.Game(config);


function preload ()
{
	this.load.image('sky', 'gfx/phaser3-tutorial-src/assets/sky.png');
    this.load.image('ground', 'gfx/phaser3-tutorial-src/assets/platform.png');
    this.load.image('star', 'gfx/phaser3-tutorial-src/assets/star.png');
    this.load.image('bomb', 'gfx/phaser3-tutorial-src/assets/bomb.png');
    this.load.spritesheet('dude', 
        'gfx/phaser3-tutorial-src/assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create ()
{   
    //background
	this.add.image(400, 300, 'sky');

    //platforms
	platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    //create player
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });



    //adds ability to move the player
    cursors = this.input.keyboard.createCursorKeys();

    //stars
    stars = this.physics.add.group({
        key: 'star',
        //creates 11 more stars
        repeat: 11,
        //positions the 12 stars on the screen
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        //player collides with platforms
        this.physics.add.collider(player, platforms);
    //stars collide with platform
    this.physics.add.collider(stars, platforms);

    //check if player collides with stars. if so, pass to collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    //bombs
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
    
}

function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

    
}

//update score
function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}

//turn the player red if they touch a bomb
function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
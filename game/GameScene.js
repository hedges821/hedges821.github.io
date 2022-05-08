class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' })
	}

	preload() {
		this.load.spritesheet('hero', 'gfx/heroSprite.png', {frameWidth: 302, frameHeight: 455});
		this.load.image('bkgd', 'gfx/bkgd.png');

		//enemy
		this.load.spritesheet('enemy1', 'gfx/enemy1.png', {frameWidth: 200, frameHeight: 250});
		this.load.spritesheet('enemy2', 'gfx/enemy2.png', {frameWidth: 250, frameHeight: 250});
	}


	create() {
		gameState.active = true;	
		
		gameState.bkgd = this.add.image(0, 0, 'bkgd').setOrigin(0, 0);	
		
		//player
		gameState.player = this.physics.add.sprite(20, 20, 'hero').setScale(.15);
		this.anims.create({
  			key: 'run',
  			frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 2 }),
  			frameRate: 5,
  			repeat: -1
		});

		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 0}),
			frameRate: 5,
			repeat: -1
		});
		
		gameState.player.setCollideWorldBounds(true);
	
		this.cameras.main.setBounds(0, 0, gameState.bkgd.width, 
			gameState.bkgd.height);
		this.physics.world.setBounds(0, 0, gameState.bkgd.width,
			gameState.bkgd.height);

		this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
		gameState.cursors = this.input.keyboard.createCursorKeys();	
		
		//purple enemy guy
		gameState.enemy1 = this.physics.add.sprite(148, 147, 'enemy1').setScale(.3);
		this.anims.create({
			key: 'move',
			frames: this.anims.generateFrameNumbers('enemy1', {start: 0, end: 4}),
			frameRate: 5,
			repeat: -1
		});

		gameState.enemy1.move = this.tweens.add({
			targets: gameState.enemy1,
			x: 320,
			ease: 'Back',
			duration: 1800,
			repeat: -1,
			yoyo: true,
			//onRepeat: growSnowman
		});

		  //red enemy guy
		gameState.enemy2 = this.physics.add.sprite(280, 480, 'enemy2').setScale(.3);
		this.anims.create({
		    key: 'cycle',
		    frames: this.anims.generateFrameNumbers('enemy2', {start: 0, end: 3}),
		    frameRate: 5,
		    repeat: -1
		});
  
		gameState.enemy2.move = this.tweens.add({
		    targets: gameState.enemy2,
		    x: 420,
		    ease: 'Linear',
		    duration: 1800,
		    repeat: -1,
		    yoyo: true,
		    //onRepeat: growSnowman
		});
		
		gameState.enemy1.anims.play('move', true);
		gameState.enemy2.anims.play('cycle', true);

		//Overlap
		
		this.physics.add.overlap(gameState.player, gameState.enemy1, () => {
			this.cameras.main.shake(240, .01, false, function(camera, progress) {
				if (progress > .5) {
				this.scene.restart(this.levelKey);
				}
			  });
		  });
		
			
	}

	update() {
		if(gameState.active){
			if (gameState.cursors.left.isDown) {
				gameState.player.setVelocityX(-160);
				gameState.player.anims.play('run', true);
				gameState.player.flipX = false;
			} else if (gameState.cursors.right.isDown) {
				gameState.player.setVelocityX(160);
				gameState.player.anims.play('run', true);
				gameState.player.flipX = true;

			} else if (gameState.cursors.up.isDown) {
				gameState.player.setVelocityY(-160);
				gameState.player.anims.play('run', true);
			} else if (gameState.cursors.down.isDown) {
				gameState.player.setVelocityY(160);
				gameState.player.anims.play('run', true);
			} else {
				gameState.player.setVelocityY(0);
				gameState.player.setVelocityX(0);
				gameState.player.anims.play('idle', true);
			}
		}
	}
}

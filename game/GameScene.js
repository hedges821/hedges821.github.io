class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' })
	}

	preload() {
		this.load.spritesheet('hero', 'gfx/heroSprite.png', {frameWidth: 302, frameHeight: 455});
		this.load.image('bkgd', 'gfx/bkgd.png');
	}


	create() {
		gameState.active = true;	
		
		gameState.bkgd = this.add.image(0, 0, 'bkgd').setOrigin(0, 0);	

		gameState.player = this.physics.add.sprite(20, 20, 'hero').setScale(.15);
		this.anims.create({
  			key: 'run',
  			frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 2 }),
  			frameRate: 5,
  			repeat: -1
			});
		
		gameState.player.setCollideWorldBounds(true);
	
		this.cameras.main.setBounds(0, 0, gameState.bkgd.width, 
			gameState.bkgd.height);
		this.physics.world.setBounds(0, 0, gameState.bkgd.width,
			 gameState.bkgd.height);

		this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
		//gameState.player.setCollideWorldBounds(true);

		
		gameState.cursors = this.input.keyboard.createCursorKeys();		
		
		
		
	}

	update() {
		if (gameState.cursors.left.isDown) {
			gameState.player.setVelocityX(-160);
			gameState.player.anims.play('run', true);
			gameState.player.flipX = false;
		} else if (gameState.cursors.right.isDown) {
			gameState.player.setVelocityX(160);
			gameState.player.anims.play('run', true);
			gameState.player.flipX = true;
		} else {
			gameState.player.setVelocityX(0);
		}
		
		if (gameState.cursors.up.isDown) {
			gameState.player.setVelocityY(-160);
			gameState.player.anims.play('run', true);
			
		} else if (gameState.cursors.down.isDown) {
			gameState.player.setVelocityY(160);
			gameState.player.anims.play('run', true);
		} else {
			gameState.player.setVelocityY(0);
		}

	}
}

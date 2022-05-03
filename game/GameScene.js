class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' })
	}

	preload() {
		this.load.image('hero', 'gfx/hero.png');
		this.load.image('bkgd', 'gfx/bkgd.png');
	}


	create() {
		gameState.active = true;	
		
		gameState.bkgd = this.add.image(0, 0, 'bkgd').setOrigin(0, 0);	

		gameState.player = this.physics.add.sprite(20, 20, 'hero').setScale(.15);
		
		gameState.player.setCollideWorldBounds(true);
	
		this.cameras.main.setBounds(0, 0, gameState.bkgd.width, 
			gameState.bkgd.height);
		this.physics.world.setBounds(0, 0, gameState.width,
			 gameState.bkgd.height);

		this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5)
		gameState.player.setCollideWorldBounds(true);

		

		
		gameState.cursors = this.input.keyboard.createCursorKeys();		
		
		
		
		
	}

	update() {
		if (gameState.cursors.left.isDown) {
			gameState.player.setVelocityX(-160);
		} else if (gameState.cursors.right.isDown) {
			gameState.player.setVelocityX(160);
		} else {
			gameState.player.setVelocityX(0);
		}
		
		if (gameState.cursors.up.isDown) {
			gameState.player.setVelocityY(-160);
		} else if (gameState.cursors.down.isDown) {
			gameState.player.setVelocityY(160);
		} else {
			gameState.player.setVelocityY(0);
		}

	}
}

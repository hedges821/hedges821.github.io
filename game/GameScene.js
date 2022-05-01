class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' })
	}

	preload() {
		
		this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png');
		this.load.image('hero', 'gfx/hero.png');
	}


	create() {

		gameState.player = this.physics.add.sprite(220, 400, 'hero').setScale(.5);
		gameState.player.setCollideWorldBounds(true);

		//gameState.player = this.physics.add.sprite(225, 450, 'codey').setScale(.5);	
		//gameState.player.setCollideWorldBounds(true);
		gameState.scoreText = this.add.text(195, 485, 'Score: 0', { fontSize: '15px', fill: '#000000' });
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

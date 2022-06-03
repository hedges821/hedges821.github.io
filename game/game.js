const gameState = {
	score: 0
};

const config = {
	type: Phaser.AUTO,
	width: 640,
	height: 480,
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			enableBody: true,
		}
	},
	scene: [StartScene, GameScene]

};

const game = new Phaser.Game(config);


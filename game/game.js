const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity:{y:5},
			debug: false,
		},
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	}

};




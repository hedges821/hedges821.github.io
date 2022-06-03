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

let game = new Phaser.Game(config);
let player;
let alien;
let enter;
let shot;
let xSpeed = 0;
let ySpeed = 0;
let alienXSpeed = 1;
let alienYSpeed = 1;
const ACCEL = 8;
let alienAccel = 4;
let accuracy = 50;
let score = 0;
let scoreText = "";
let timerText = "";
let timer = 0;
let interval;
let gameover = false;

function preload(){
	this.load.image('background', 'gfx/space.png');
	this.load.image('crosshair', 'gfx/crosshair.png');
	this.load.spritesheet('alien', 'gfx/enemy1.png', {framWidth: 100, frameHeight: 100});
	this.load.spritesheet('explosion', );
}




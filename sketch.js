let res = 5;
let field = new Array();
let cols, rows;

//noise variables
let noise;
let speedRateX = 0.1;
let speedRateY = 0.1;
let speedRateZ = 0.015;
let zo = 0;

function setup() {
	createCanvas(min(600, windowWidth), min(600, windowHeight));
	// createCanvas(windowWidth, windowHeight);

	noise = new OpenSimplexNoise(Date.now());

	cols = floor(width / res) + 1;
	rows = floor(height / res) + 1;

	for (let i = 0; i < cols; i++) {
		field[i] = new Array();
	}
}

function draw() {
	clear();
	let xo = 0;
	noStroke();
	for (let i = 0; i < cols; i++) {
		xo += speedRateX;
		let yo = 0;
		for (let j = 0; j < rows; j++) {
			yo += speedRateY;
			let depth = noise.noise3D(xo, yo, zo) + 1;
			field[i][j] = depth - 1;
			fill(floor(pow(depth, 3) * 50));
			rect(i * res, j * res, res, res);
		}
	}
	zo += speedRateZ;
	for (let i = 0; i < cols - 1; i++) {
		for (let j = 0; j < rows - 1; j++) {
			let x = i * res;
			let y = j * res;

			let state = getState(
				ceil(field[i][j]),
				ceil(field[i + 1][j]),
				ceil(field[i + 1][j + 1]),
				ceil(field[i][j + 1])
			);

			let a, b, c, d;
			a = createVector(x + res * 0.5, y);
			b = createVector(x + res, y + res * 0.5);
			c = createVector(x + res * 0.5, y + res);
			d = createVector(x, y + res * 0.5);

			strokeWeight(2);
			stroke(250);
			switch (state) {
				case 0:
					break;
				case 1:
					lineV2V(c, d);
					break;
				case 2:
					lineV2V(c, b);
					break;
				case 3:
					lineV2V(b, d);
					break;
				case 4:
					lineV2V(a, b);
					break;
				case 5:
					lineV2V(a, d);
					lineV2V(c, b);
					break;
				case 6:
					lineV2V(a, c);
					break;
				case 7:
					lineV2V(a, d);
					break;
				case 8:
					lineV2V(a, d);
					break;
				case 9:
					lineV2V(a, c);
					break;
				case 10:
					lineV2V(a, b);
					lineV2V(c, d);
					break;
				case 11:
					lineV2V(a, b);
					break;
				case 12:
					lineV2V(b, d);
					break;
				case 13:
					lineV2V(b, c);
					break;
				case 14:
					lineV2V(c, d);
					break;
				case 15:
					break;
			}
		}
	}
}

function getState(a, b, c, d) {
	return a * 8 + b * 4 + c * 2 + d * 1;
}

function lineV2V(a, b) {
	line(a.x, a.y, b.x, b.y);
}

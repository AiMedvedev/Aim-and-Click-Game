const startBtn = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const screens = document.querySelectorAll('.screen');
const timeSpan = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#FA8072', '#008B8B', '#C71585', '#7CFC00', '#FFD700', '#00BFFF', '#4B0082', '#FFDAB9'];

let time = 0;
let score = 0;

const setTime = (value) => {
	timeSpan.innerHTML = `00:${value}`;
}

const getRandomNumber = (min, max) => {
	return Math.round(Math.random() * (max - min) + min);
}

const getRandomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
}

const countDown = () => {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		setTime(current > 9 ? current : '0' + current);
	}
}

const createCircle = () => {
	const circle = document.createElement('div');
	const circleSize = getRandomNumber(5, 20);

	const {
		width,
		height
	} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - circleSize);
	const y = getRandomNumber(0, height - circleSize);

	circle.classList.add('circle');
	circle.style.width = `${circleSize}px`;
	circle.style.height = `${circleSize}px`;
	circle.style.top = `${x}px`;
	circle.style.left = `${y}px`;
	circle.style.background = `${getRandomColor()}`;

	board.append(circle);
}

const startGame = () => {
	setInterval(countDown, 1000);
	createCircle();
	setTime(time);
}

const finishGame = () => {
	timeSpan.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Ваш результат: <span class="primary">${score}</span> очков!</h1>`;
}



startBtn.addEventListener('click', (event) => {
	event.preventDefault();

	screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame();
	}
})

board.addEventListener('click', (event) => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createCircle();
	}
})

document.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		winTheGame(55);
	}
})


function winTheGame(value) {

	function kill() {
		const circle = document.querySelector('.circle');

		if (circle) {
			circle.click();
		}
	}

	setInterval(kill, value);
}
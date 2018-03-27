class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.reset();
        this.laps = [];
        this.results = results;
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
        this.display.innerText = this.format(this.times);
    }

    print() {
        this.display.innerText = this.format(this.times);
	}

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }

    lap() {
        const li = document.createElement('li');
        li.innerText = this.format(this.times);
        this.results.appendChild(li);
    }

    clearList() {
        deleteLaps(this.results);
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
};


function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

function deleteLaps(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'),
document.querySelector('.results'));

var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());
var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());
var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());
var resultsButton = document.getElementById('lap');
resultsButton.addEventListener('click', () => stopwatch.lap());
var resetLapButton = document.getElementById('clearList');
resetLapButton.addEventListener('click', () => stopwatch.clearList());







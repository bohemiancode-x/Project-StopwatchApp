const setTime = document.querySelector('form');
const countDown = document.querySelector('.stopwatch');
const timerDisplay = document.querySelector('.timer');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');

let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let int = null;

const displayTimer = () => {
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }

    let h = (hours < 10) ? "0" + hours : hours;
    let m = (minutes < 10) ? "0" + minutes : minutes;
    let s = (seconds < 10) ? "0" + seconds : seconds;
    let ms = (milliseconds < 10) ? "00" + milliseconds : (milliseconds < 100) ? "0" + milliseconds : milliseconds;

    timerDisplay.innerHTML = `${h}:${m}:${s}:${ms}`;
};

const start = () => {
    if(int!==null){
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
};

const pauseFn = () => {
    clearInterval(int)
};

const resetFn = () => {
    clearInterval(int);
    [milliseconds,seconds,minutes,hours] = [0,0,0,0];
    timerDisplay.innerHTML = '00:00:00:000';
    //setTime.add.value = '';
};

startBtn.addEventListener('click', start );

pauseBtn.addEventListener('click', pauseFn);

resetBtn.addEventListener('click', resetFn);


// Use stopwatch with time limit
setTime.addEventListener('submit', (e) => {
    e.preventDefault();
    const minuteLimit = setTime.add.value.trim();
    const milli = Math.round( minuteLimit * 60000);

    resetFn(e);
    start(e);
    setTimeout(pauseFn, milli)
});


import { fromTimeLeft } from "./index.js";

const MAX_DURATION = 24 * 60 * 60 * 1000 - 1000;

function createTimer(duration) {
  let seed = (Math.random() * 0x100000000) >>> 0;
  duration = duration % MAX_DURATION;
  let elapsedTime = 0;
  let startTime = 0;
  let isRunning = false;

  return {
    start: function () {
      if (!isRunning) {
        startTime = Date.now();
        isRunning = true;
      }
    },
    stop: function () {
      if (isRunning) {
        elapsedTime += Date.now() - startTime;
        isRunning = false;
      }
    },
    reset: function () {
      elapsedTime = 0;
      isRunning = false;
    },
    getRemaining: () => {
      const currentElapsed = isRunning
        ? elapsedTime + (Date.now() - startTime)
        : elapsedTime;
      const millisLeft = Math.max(0, duration - currentElapsed);
      const timeLeft = {
        hour: Math.floor(millisLeft / 3600000),
        minute: Math.floor((millisLeft % 3600000) / 60000),
        second: Math.floor((millisLeft % 60000) / 1000),
      };
      const flowTimeLeft = fromTimeLeft(timeLeft, seed);
      return { timeLeft, flowTimeLeft };
    },
    isRunning,
  };
}

function formatTimeLeft(timeLeft) {
  return `${timeLeft.hour.toString().padStart(2, "0")}:${timeLeft.minute
    .toString()
    .padStart(2, "0")}:${timeLeft.second.toString().padStart(2, "0")}`;
}

function displayTimer(timer) {
  const intervalId = setInterval(() => {
    const { timeLeft, flowTimeLeft } = timer.getRemaining();
    console.log(
      `Time left: ${formatTimeLeft(timeLeft)}`,
      `Flow time left: ${formatTimeLeft(flowTimeLeft)}`
    );
    if (timeLeft.hour <= 0 && timeLeft.minute <= 0 && timeLeft.second <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);

  return function stopDisplay() {
    clearInterval(intervalId);
  };
}

let timer = createTimer(10 * 60 * 1000);
displayTimer(timer);
timer.start();

let pause = document.getElementById("pause");
let play = document.getElementById("play");
let message = document.getElementById("message");
let counter = document.getElementById("counter");
let container = document.getElementById("container");
let natureSounds = document.getElementById("natureSounds");

let isPaused = false;

let meditationStates = [
  {
    message: "Just Inhale",
    seconds: 4,
    color: { r: 94, g: 173, b: 242 }
  },
  {
    message: "Hold",
    seconds: 4,
    color: { r: 85, g: 166, b: 3 }
  },
  {
    message: "Exhale",
    seconds: 6,
    color: { r: 217, g: 174, b: 121 }
  },
  {
    message: "Hold",
    seconds: 4,
    color: { r: 191, g: 99, b: 167 }
  }
];

let stateIndex = 0;

let states = meditationStates;

let getCurrentState = () => meditationStates[stateIndex];

let nextState = () => {
  stateIndex++;
  if (stateIndex == states.length) {
    stateIndex = 0;
  }
};

let seconds = getCurrentState().seconds;

counter.innerHTML = seconds;
message.innerHTML = getCurrentState().message;



let getNextState = () => {
  let nextIndex = stateIndex + 1;
  if (nextIndex == states.length) {
    nextIndex = 0;
  }
  return meditationStates[nextIndex];
};

// Show an element
let show = function (elem) {
  elem.style.display = "block";
};

// Hide an element
let hide = function (elem) {
  elem.style.display = "none";
};

// Toggle element visibility
let toggle = function (elem) {
  // If the element is visible, hide it
  if (window.getComputedStyle(elem).display === "block") {
    hide(elem);
    return;
  }
  // Otherwise, show it
  show(elem);
};

let increaseSeconds = () => {
  counter.innerHTML = seconds;
  message.innerHTML = getCurrentState().message;

  if (!isPaused) {
    seconds--;
  }

  if (seconds == 0) {
    seconds = getNextState().seconds;
    hold();
    nextState()
    fade(
      container,
      "background-color",
      getCurrentState().color,
      getNextState().color,
      getCurrentState().seconds * 1000
    );
  }
};

let timer;

play.onclick = () => {
  natureSounds.play();
  hide(play);
  show(pause);
  isPaused = false;
  timer = setInterval(increaseSeconds, 1000);
  fade(
    container,
    "background-color",
    getCurrentState().color,
    getNextState().color,
    getCurrentState().seconds * 1000
  );
};

pause.onclick = () => {
  natureSounds.pause();
  hide(pause);
  show(play);
  isPaused = true;
  clearInterval(timer);
};

let hold = () => {
  clearInterval(timer);
  setTimeout(function(){  timer = setInterval(increaseSeconds, 1000); }, 500);
}

let lerp = function (a, b, u) {
  return (1 - u) * a + u * b;
};

let fade = function (element, property, start, end, duration) {
  var interval = 10;
  var steps = duration / interval;
  var step_u = 1.0 / steps;
  var u = 0.0;
  var theInterval = setInterval(function () {
    if (u >= 1.0) {
      clearInterval(theInterval);
    }
    var r = parseInt(lerp(start.r, end.r, u));
    var g = parseInt(lerp(start.g, end.g, u));
    var b = parseInt(lerp(start.b, end.b, u));
    var colorname = "rgb(" + r + "," + g + "," + b + ")";
    element.style.setProperty(property, colorname);
    u += step_u;
  }, interval);
};


let questionElm = document.getElementById("question");
let optionAElm = document.getElementById("option-A");
let optionBElm = document.getElementById("option-B");
let optionCElm = document.getElementById("option-C");
let optionDElm = document.getElementById("option-D");
//Event Elms
let scoreElm = document.getElementById("score");
let levelElm = document.getElementById("level");
let lifeElm = document.getElementById("life");

let requiredScoreElm = document.getElementById("requiredScore");
// Progress
let progressBarElm = document.getElementById("progress-bar");
let offlineElm = document.getElementById("offline-status");

//Menu
document.addEventListener("DOMContentLoaded", async function() {
  let instances1 = M.Modal.init(modalmain1, {
    dismissible: false,
    endingTop: "5%"
  });
  instances1.open();
});

const networkSatus = () => {
  if (navigator.onLine)
    offlineElm.innerHTML =
      "You are currently ONLINE , please toggle the switch below.";
  else offlineElm.innerHTML = "No need to toggle you are already OFFLINE";
};
networkSatus();

// Global Vars
let totalScore = 0;
let life = 5;
let score = 0;
let operandA, operandB;
let levelTime = 30;
let levelCurrentTime = 0;
let level = 1;
let currentProgress;
let requiredScoreforLevel = 5;
const generateOperand = () => {
  operandA = Math.ceil(Math.random() * 20);
  operandB = Math.ceil(Math.random() * 20);
};

let ans = 0;

const initialise = () => {
  totalScore = 0;
  life = 5;
  score = 0;
  operandA, operandB;
  levelTime = 30;
  levelCurrentTime = 0;
  level = 1;
  currentProgress;
  requiredScoreforLevel = 5;
  scoreElm.innerHTML = "🍺 : 0";
  levelElm.innerHTML = "📈 x1";
  lifeElm.innerHTML = "❤ x5";
  requiredScoreElm.innerHTML = "Required 🍺 to complete level : 5";
};
//Start

// Num Generate

const addFxn = (a, b) => {
  ans = a + b;
  updateQuestion(a, "+", b);
};

const subFxn = (a, b) => {
  ans = a - b;
  updateQuestion(a, "-", b);
};
const mulFxn = (a, b) => {
  ans = a * b;
  updateQuestion(a, "x", b);
};
const divFxn = (a, b) => {
  ans = a / b;
  updateQuestion(a, "/", b);
};

const updateQuestion = (a, operator, b) => {
  let questionString = a + " " + operator + " " + b;
  questionElm.innerHTML = questionString;
};

//Chage Question
const generate = () => {
  generateOperand();
  a = operandA;
  b = operandB;
  let mathFunctionNumber = Math.ceil(Math.random() * 4);

  if (mathFunctionNumber == 1) addFxn(a, b);
  else if (mathFunctionNumber == 2) subFxn(a, b);
  else if (mathFunctionNumber == 3) mulFxn(a, b);
  else if (mathFunctionNumber == 4) divFxn(a, b);
  //Generate Options
  generateOption();

};
const generateOption = () => {
  optionAElm.innerHTML = Math.ceil(Math.random() * ans) * 2;
  optionBElm.innerHTML = Math.ceil(Math.random() * ans) * 2;
  optionCElm.innerHTML = Math.ceil(Math.random() * ans) * 2;
  optionDElm.innerHTML = Math.ceil(Math.random() * ans) * 2;

  let optionElmArr = [optionAElm, optionBElm, optionCElm, optionDElm];
  let randonAnsInsrt = Math.floor(Math.random() * 4);
  if (ans.toString().length > 3) ans = ans.toFixed(1);

  optionElmArr[randonAnsInsrt].innerHTML = ans;
};

//Check Ans
const checkOption = option => {
  console.log(option + "  " + ans);
  if (option == ans) {
    incrementScore();
  } else {
    decrementLife();
    window.navigator.vibrate(100);
  }
  generate(operandA, operandB);
};

// Options
const optionA = () => {
  checkOption(parseFloat(optionAElm.innerHTML));
};

const optionB = () => {
  checkOption(parseFloat(optionBElm.innerHTML));
};

const optionC = () => {
  checkOption(parseFloat(optionCElm.innerHTML));
};

const optionD = () => {
  checkOption(parseFloat(optionDElm.innerHTML));
};
// Final Update
const update = () => {
  if (life != 0) {
  } else {
  }
};

const levelChange = () => {
  level++;
  life++;
  requiredScoreforLevel += 5;
  levelCurrentTime = 0;
  score = 0;
  scoreElm.innerHTML = "🍺 : 0";
  levelElm.innerHTML = "📈 x" + level;
  requiredScoreElm.innerHTML =
    "Required 🍺 to complete level : " + requiredScoreforLevel;
};
const checkLife = () => {
  if (life < 0) gameOver();
};
const gameOver = () => {
  clearInterval(gameLoop);
  alert("Total Score = " + totalScore);
  let confirmResp = confirm("Restart ??");
  if (confirmResp == true) restartGame();
  else {
    alert("Thank you for playing :D");
    // window.location = "http://github.com/pranshuchittora";
  }
};

const restartGame = () => {
  window.navigator.vibrate(1000);
  initialise();
 
};

const timeup = () => {
  if (score >= requiredScoreforLevel) {
    levelChange();
  } else gameOver();
};

//Events
const incrementScore = () => {
  score++;
  totalScore++;
  scoreElm.innerHTML = "🍺 : " + score;
};
const decrementLife = () => {
  life--;
  lifeElm.innerHTML = "❤ x" + life;
};

const updateProgressBar = () => {
  currentProgress = (levelCurrentTime / levelTime) * 100;
  progressBarElm.style.width = currentProgress + "%";
  console.log(currentProgress);
};

async function time() {
  if (levelCurrentTime <= levelTime) {
    levelCurrentTime += 0.1;
    updateProgressBar();
  } else {
    levelCurrentTime = 0;
    progressBarElm.style.width = "0%";
    timeup();
  }
  checkLife();
}

const gameLoop = ()=>{
    setInterval(time, 100)}
gameLoop();
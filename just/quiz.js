// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
  {
    question: "Which is your favourite fast food ?",
    imgSrc: "img/html.png",
    choiceA: "Momos",
    choiceB: "Maggie",
    choiceC: "White Sauce Pasta",
    correct: "B",
  },
  {
    question: "Which Chocolate do you prefer most ?",
    imgSrc: "img/css.png",
    choiceA: "KitKat",
    choiceB: "Fusion",
    choiceC: "DiaryMilk-Caramelo",
    correct: "C",
  },
  {
    question: "People should call you by which name ?",
    imgSrc: "img/js.png",
    choiceA: "Jyoti",
    choiceB: "Priya",
    choiceC: "Rinkiya",
    correct: "B",
  },
  {
    question: "Which is your favourite Color",
    imgSrc: "img/js.png",
    choiceA: "Red",
    choiceB: "Pink",
    choiceC: "Black",
    correct: "C",
  },
  {
    question: "Which type of Clothes would you like to wear ?",
    imgSrc: "img/js.png",
    choiceA: "Long",
    choiceB: "Bedhanga",
    choiceC: "short",
    correct: "C",
  },
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  // choose the image based on the scorePerCent
  let img =
    scorePerCent >= 80
      ? "img/5.png"
      : scorePerCent >= 60
      ? "img/4.png"
      : scorePerCent >= 40
      ? "img/3.png"
      : scorePerCent >= 20
      ? "img/2.png"
      : "img/1.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";

  function nextp() {
    if (scorePerCent === 100) {
      const aagra = document.createElement("a");
      aagra.id = "new-item";
      aagra.innerHTML = '<a href="./index.html"> SurPrise </a>';
      scoreDiv.appendChild(aagra);
    } else {
      const aagra = document.createElement("a");
      aagra.id = "new-item";
      aagra.innerHTML = '<a href="./Questions.html">Oh No! Try Again</a>';
      scoreDiv.appendChild(aagra);
    }
  }
  nextp();
}

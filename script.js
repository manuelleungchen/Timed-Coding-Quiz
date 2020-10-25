
var timerLeft = document.querySelector("#timer");
var questionSection = document.querySelector("#question-section");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");

var myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
        d: "Manuel Leung"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm",
        d: "JQuery"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];


function showQuestion (questionNum) {
    questionEl.textContent = myQuestions[questionNum].question;

    var choice = document.createElement("li");
    var buttonChoice = document.createElement("button");
    buttonChoice.textContent = "1. " + myQuestions[questionNum].answers.a;
    buttonChoice.setAttribute("data-value", "a");
    choice.appendChild(buttonChoice);
    answersEl.appendChild(choice);
  
    var choice = document.createElement("li");
    var buttonChoice = document.createElement("button");
    buttonChoice.textContent = "2. " + myQuestions[questionNum].answers.b;
    buttonChoice.setAttribute("data-value", "b");
    choice.appendChild(buttonChoice);
    answersEl.appendChild(choice);
  
    var choice = document.createElement("li");
    var buttonChoice = document.createElement("button");
    buttonChoice.textContent = "3. " + myQuestions[questionNum].answers.c;
    buttonChoice.setAttribute("data-value", "c");
    choice.appendChild(buttonChoice);
    answersEl.appendChild(choice);
  
    var choice = document.createElement("li");
    var buttonChoice = document.createElement("button");
    buttonChoice.textContent = "4. " + myQuestions[questionNum].answers.d;
    buttonChoice.setAttribute("data-value", "d");
    choice.appendChild(buttonChoice);
    answersEl.appendChild(choice);
}



var instrutions = document.createElement("p");
var startButton = document.createElement("button");
instrutions.textContent = "Try to answer the following coding-related questions with the time given. Keep in mind that incorrect answers will penalize your score time by 10 seconds.";
startButton.textContent = "Start Quiz";
questionEl.textContent = "Coding Quiz Challenge";
questionSection.appendChild(instrutions);
questionSection.appendChild(startButton);

var timer = 10;

function startQuiz (){

    // Remove Welcome Menu

    console.log(questionSection.childNodes);

    questionSection.removeChild(questionSection.childNodes[4])  // Remove the start button at childNode[4]
    questionSection.removeChild(questionSection.childNodes[3])  // Remove the p tag at childNode[3]


    // Show first question
    showQuestion(0);

    var intervalCallBack = function () {
        if (timer > 0) {
            timerLeft.textContent = timer;
            timer--;
        }
        else {
            timerLeft.textContent = timer;
            clearInterval(quizInterval);
            timer = 10;  // Reset timer
            
        }
    }
    var quizInterval = setInterval (intervalCallBack, 1000);
}

function checkAnswer (e) {
    console.log(e.target.getAttribute("data-value"));
}

startButton.addEventListener("click", startQuiz);
answersEl.addEventListener("click", checkAnswer);



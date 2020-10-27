
// Section Elements
var header = document.querySelector("#header");
var mainArticle = document.querySelector("#main-wrapper");
var scoreArticle = document.querySelector("#scores-wrapper");
var homeSection = document.querySelector("#home-section");
var questionSection = document.querySelector("#question-section");
var resultSection = document.querySelector("#result-section");

// Button Elements
var startButton = document.querySelector("#start-button");
var viewScoresButton = document.querySelector("#view-highscores");
var answerButton1 = document.querySelector(".answer-button1");
var answerButton2 = document.querySelector(".answer-button2");
var answerButton3 = document.querySelector(".answer-button3");
var answerButton4 = document.querySelector(".answer-button4");
var submitButton = document.querySelector("#submit-button");
var backButton = document.querySelector("#back-button");
var clearButton = document.querySelector("#clear-button");

// Elements inside each Section
var timeScoreLeft = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var answersEl = document.querySelector("#answers");
var answerAlert = document.querySelector("#answer-alert");
var initials = document.querySelector("#initials");
var scoresList = document.querySelector("#highscores-list");


// Array of Objects (Questions)
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

// Variable Declaration
var timeScore = 100;   // Variable to storage the Score
var questionCounter = 0;    // Variable to counter and loop through each question
var quizInterval;   // Variable to storage the interval of Quiz
var highscores = [];  // Empty Array that will contain the array of highscore students (objects)

// Check if there is any lcoal storage of highscore
if (localStorage.getItem("highscores") !== null) {
    highscores = JSON.parse(localStorage.getItem("highscores")); // Parse the JSON string into an array
}

// This Function display one question and its answers at the time
function showQuestionAndAnswers (questionNum) {
    // Replace questionEl text for the value of the question property of each question (object)
    questionEl.textContent = myQuestions[questionNum].question;

    // Replace each button text for the value of the answer property of each question (object)
    answersEl.children[0].children[0].textContent = "1. " + myQuestions[questionNum].answers.a;
    answersEl.children[0].children[0].setAttribute("data-value", "a");
  
    answersEl.children[1].children[0].textContent = "2. " + myQuestions[questionNum].answers.b;
    answersEl.children[1].children[0].setAttribute("data-value", "b");
  
    answersEl.children[2].children[0].textContent = "3. " + myQuestions[questionNum].answers.c;
    answersEl.children[2].children[0].setAttribute("data-value", "c");
  
    answersEl.children[3].children[0].textContent = "4. " + myQuestions[questionNum].answers.d;
    answersEl.children[3].children[0].setAttribute("data-value", "d");

    answersEl.style.display = 'block';
}

// This function start the countdown for the quiz
function startQuiz (){
    // Remove Section tag of the main menu and show the question section
    homeSection.style.display = "none";
    questionSection.style.display = "block";
    answerAlert.style.display = "block";

    // This call showQuestionAndAnswers function
    showQuestionAndAnswers(questionCounter);

    var intervalCallBack = function () {
        if (timeScore > 0) {   // If timeScore havent reach 0
            timeScore--; // Reduce the timeScore by 1
        }
        else {
            clearInterval(quizInterval); // Stop calling the intervalCallBack function
            checkForScore();  // Call checkForScore function
        }
        // Update the time left label 
        timeScoreLeft.textContent = "Time: " + timeScore;
    }
    // Recall this function intervalCallBack every 1 second
    quizInterval = setInterval (intervalCallBack, 1000);
}

// This function validate each answer
function checkAnswer (e) {
    // if selected answer matched the correctAnswer property of each question
    if (e.target.getAttribute("data-value") === myQuestions[questionCounter].correctAnswer) {
        answerAlert.children[1].textContent = "Correct!"; // Print Correct 
    }
    else {  
        answerAlert.children[1].textContent = "Wrong!";  // Print Correct 
        timeScore -= 25;   // Reduce the time left by 10
        timeScoreLeft.textContent = "Time: " + timeScore;  // Update the time left label 
    }
    
    // If havent reach the last question
    if (questionCounter < (myQuestions.length - 1)) {
        questionCounter += 1;  // Increase the question counter
        showQuestionAndAnswers(questionCounter);  // Show the next question by calling function showQuestionAndAnswers
    }
    else {
        clearInterval (quizInterval);  // Stop calling the intervalCallBack function
        checkForScore();  // Call checkForScore function
    }
}

// This function adjust score below zero and display result session
function checkForScore () {
    if (timeScore < 0) {    // if timeScoe is below Zero
        timeScore = 0;      // Reset timeScore to 0
        timeScoreLeft.textContent = "Time: " + timeScore;  // Update the time left label 
    }

    questionSection.style.display = "none";     // Hide the question section
    resultSection.style.display = "block";      // Display the result section
    resultSection.children[1].textContent = "Your Score is " + timeScore;  // Print student score
}

// This function save the score on the localStorage
function saveScore () {
    if (initials.value !== "") {    // if student enter initials
        var student = {     // Create a variable to storage the student initials and score
            "initials" : initials.value,    // student initials
            "score" : timeScore     // student score
        };
        highscores.push(student);      // add student object to highscores array
        localStorage.setItem("highscores", JSON.stringify(highscores));  // save highscores array as string on localStorage
    }
    showHighscores();   // call showHighscores function
}

// This function will display the highscores section and loop through highscores array 
function showHighscores () {
    header.style.display = "none";  // Hide header section
    mainArticle.style.display = "none";     // Hide main section
    scoreArticle.style.display = "block";   // Show the score section

    // Loop through highscores list
    for (var counter = 0; counter < highscores.length; counter++) {
        var listItem = document.createElement("li");    // Create a li tag element
        // Assigned the initials and score as li text content
        listItem.textContent = (counter + 1 ) + ". " + highscores[counter].initials + " - " + highscores[counter].score;
        scoresList.appendChild(listItem);   // Append the new li to the ol list
    }
}

// This function will reload page back to main page
function showMainArticle () {
    location.reload();  // Reload page
}

// This function will remove highscores in the local storage and reload the page
function eraseAllScores () {
    localStorage.removeItem("highscores");  // Remove local storage with key (highscores)
    location.reload();  // Reload page
}

// Events Listener for all buttons
viewScoresButton.addEventListener("click", showHighscores);
startButton.addEventListener("click", startQuiz);
answerButton1.addEventListener("click", checkAnswer);
answerButton2.addEventListener("click", checkAnswer);
answerButton3.addEventListener("click", checkAnswer);
answerButton4.addEventListener("click", checkAnswer);
submitButton.addEventListener("click", saveScore);
backButton.addEventListener("click", showMainArticle);
clearButton.addEventListener("click", eraseAllScores);


var score = 0;
var i = 1;

var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", startQuiz);

var prompt = document.querySelector("#prompt");

var questions = ["what's your favorite color?", "how is your day going?", "where are you from?"];

var nextButton = document.querySelector(".next-button");
nextButton.addEventListener("click", nextQuestion);

function startQuiz() {
    score = 0;
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    // startButton.disabled = true;
    prompt.textContent = questions[0];
    // startTimer();
    
  }

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        // timerCount = 75;
        timerCount--;
        timerElement.textContent = timerCount;
        
        // Tests if time has run out
        if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        endQuiz();
        }
    }, 7500);
}

function endQuiz() {
    // pass score to UI and display
    // enter initials, save initials and score in local storage

}

function renderQuestion() {
    console.log(questions[i]);
    startButton.remove();
}

function nextQuestion() {
    prompt.textContent = questions[i];
    i++;
    if (i > questions.length) {
        prompt.textContent = "You've answered all my questions, good job!";
    }
}
var body = document.body;
var score = 0;
var i = 1;

var listEl = document.createElement("ol");
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
// var li4 = document.createElement("li");

var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", startQuiz);

var prompt = document.querySelector("#prompt");

var options = document.querySelector("#optionsList");

const questionsObjArr = [
    {
        question: "what's your favorite color?",
        choices: ["blue", "green", "red", "yellow"],
        answer: "green"
    },
    {
        question: "how is your day going?",
        choices: ["good", "okay", "bad"],
        answer: "good"
    },
    {
        question: "where are you from?",
        choices: ["Kansas City", "Chicago", "India"],
        answer: "Chicago"
    }
  ];

const questions = ["what's up", "how are you", "what's cookin good lookin"];

var nextButton = document.querySelector(".next-button");
nextButton.addEventListener("click", nextQuestion);

function startQuiz() {
    score = 0;
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    // startButton.disabled = true;
    prompt.textContent = questionsObjArr[0].question;
    // startTimer();
    startButton.style.display = "none";
    nextButton.style.display = "inline";
    
    
    

    options.appendChild(listEl);
    listEl.appendChild(li1);
    listEl.appendChild(li2);
    listEl.appendChild(li3);

    li1.textContent = questionsObjArr[0].choices[0];
    li2.textContent = questionsObjArr[0].choices[1];
    li3.textContent = questionsObjArr[0].choices[2];
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
    if (i > 2) {
        prompt.textContent = "You've answered all my questions, good job!";
        return;
    }
    prompt.textContent = questionsObjArr[i].question;
        
    li1.textContent = questionsObjArr[i].choices[0];
    li2.textContent = questionsObjArr[i].choices[1];
    li3.textContent = questionsObjArr[i].choices[2];
    
    i++;
    
}
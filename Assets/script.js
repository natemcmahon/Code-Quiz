var body = document.body;
var score = 0;
var i = 1;

// creating list elements to push quiz question choices to
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");

// Adding a class to the new list elements which I can use to query select
li1.classList.add('option');
li2.classList.add('option');
li3.classList.add('option');

// styling list elements so I can more easily see them when I go to click them
li1.setAttribute("style", "Border-style:solid; background-color:lightgreen; padding:5px; margin:5px");
li2.setAttribute("style", "Border-style:solid; background-color:lightgreen; padding:5px; margin:5px");
li3.setAttribute("style", "Border-style:solid; background-color:lightgreen; padding:5px; margin:5px");

// setting up start button as a DOM event to kick off startQuiz function
var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", startQuiz);

// setting up query selector on my main heading so I can replace it with quiz question when I move into the quiz
var prompt = document.querySelector("#prompt");

// setting up query selector on entire options list, not being used currently
var options = document.querySelector("#optionsList");


// Object array placeholder containing questions, choices and correct answers
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

// Simpler placeholder to reference in place of object array 
//const questions = ["what's up", "how are you", "what's cookin good lookin"];

// Setting up next button so it can be clicked. When it's clicked it instantiates nextQuestion function
var nextButton = document.querySelector(".next-button");
nextButton.addEventListener("click", nextQuestion);

// startQuiz function setup to be instantiated when I click 'Start'
function startQuiz() {
    score = 0;
    timerCount = 75;
    // Prevents start button from being clicked when round is in progress
    // startButton.disabled = true;
    prompt.textContent = questionsObjArr[0].question;
    // startTimer();
    startButton.style.display = "none";
    nextButton.style.display = "inline";
    
    options.appendChild(li1);
    options.appendChild(li2);
    options.appendChild(li3);
    
    li1.textContent = questionsObjArr[0].choices[0];
    li2.textContent = questionsObjArr[0].choices[1];
    li3.textContent = questionsObjArr[0].choices[2];

    var selection = document.querySelector(".option");
    selection.addEventListener("submit", console.log("nice choice"));

}

// Timer function. Should start upon selecting 'Start' button and display in UI
// Yet to be set up
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

// To be called either when timerCount === 0 or answered all questions 
function endQuiz() {
    // pass score to UI and display
    // enter initials, save initials and score in local storage

}

// Renders first question upon starting game. Since I have separate buttons for start and next I had to set it up this way... at least I couldn't figure out how not to
function renderQuestion() {
    console.log(questions[i]);
    startButton.remove();
    
    // Trying to setup choices as clickable and print to console "nice choice"
    // Can't get options to be clickable, "nice choice" is printing to console upon start button click
    var selection = document.querySelector(".option");
    selection.addEventListener("click", function() {
        console.log("nice choice")
    });
    
}

// called when I click "next button". Later will be called upon selecting a choice
// replacing questions and choices content 
// once we run out of questions, displaying "you've answered em all"
function nextQuestion() {
    responseCheck(questionsObjArr[i].answer);
    console.log(score);
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

// Placeholder Responses
var response1 = "green";
var response2 = "good";
var response3 = "Chicago";

// check user selection (placeholder response for now) against questionsObjArr Answer
function responseCheck(string) {
    if (response1 === string /*questionsObjArr[i].answer*/) {
        score++;
    }
}
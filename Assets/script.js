var timerElement = document.querySelector(".timer-count");
var initialsPrompt = document.querySelector(".initials");
var submitButton = document.querySelector("#initial-submit");
var initialsInput = document.querySelector("#initial-text");
var initialsForm = document.querySelector("#initial-form");
// var feedbackSection = document.querySelector("#result-feedback");
var body = document.body;
var score = 0;
var questionNumber = 0;
var rightOrWrongBool;
var timerCount;

// setting up start button as a DOM event to kick off startQuiz function
var startButton = document.querySelector(".start-button");
startButton.addEventListener("click", startQuiz);

// setting up query selector on my main heading so I can replace it with quiz question when I move into the quiz
var prompt = document.querySelector("#prompt");

// setting up query selector on entire options list, not being used currently
var options = document.querySelector("#optionsList");

var page = document.querySelector(".container");
// Object array placeholder containing questions, choices and correct answers

// event listener for initial submit button
submitButton.addEventListener("click", storeHighScore);

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

// Setting up next button so it can be clicked. When it's clicked it instantiates nextQuestion function
var nextButton = document.querySelector(".advance-button");
nextButton.addEventListener("click", nextQuestion);

// startQuiz function setup to be instantiated when I click 'Start'
function startQuiz() {
    score = 0;
    timerCount = 10;
    var firstQuestion = questionsObjArr[0];
    // Prevents start button from being clicked when round is in progress
    // startButton.disabled = true;
    prompt.textContent = questionsObjArr[0].question;
    startTimer();
    startButton.style.display = "none";
    nextButton.style.display = "inline";
    
    // options.appendChild(li1);   
    // li1.textContent = questionsObjArr[0].choices[0];

    var selection = document.querySelectorAll(".option");
    renderQuestion(firstQuestion);
}

// Timer function. Should start upon selecting 'Start' button and display in UI
// Yet to be set up
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        
        // Tests if time has run out
        if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        endQuiz();
        }
    }, 1000);
}

// Renders first question upon starting game. Since I have separate buttons for start and next I had to set it up this way... at least I couldn't figure out how not to
function renderQuestion(q) {
    var currentQuestion = document.getElementById('liEl');
    if (currentQuestion) {
        currentQuestion.remove();
    }
    if (options) {
        options.innerHTML = "";
    }

    prompt.textContent = q.question;
        
    // console.log("we are on question number: " + questionNumber);


    q.choices.forEach((choice, index) => {
        var li = document.createElement("li");
        li.classList.add('option');
        li.setAttribute('id','liEl' + index);
        li.setAttribute("style", "Border-style:solid; background-color:lightgreen; padding:5px; margin:5px");
        options.appendChild(li);
        li.textContent = choice;

        if (choice === q.answer) {
            li.dataset.correct = true;
        }
        
        // console.log(li);
        
        var clickableListEl = document.getElementById("liEl" + index);

        clickableListEl.addEventListener("click", (event) => {
            if (event.target.dataset.correct) {
                score++;
                
                rightOrWrongBool = "Your last selection was correct!";
            }
            else {
                rightOrWrongBool= "Bummer, your last selection was incorrect :(";
            }
            
            feedbackSection = document.getElementById("result-feedback");

            if (!feedbackSection) {
                var feedback = document.createElement("section");
                feedback.setAttribute('id','result-feedback');
                page.appendChild(feedback);

                
                var line = document.createElement("hr");
                line.setAttribute('id','bottom-line');
                feedback.appendChild(line);

                var result = document.createElement("p");
                result.setAttribute('id','correct-or-incorrect');
                feedback.appendChild(result);
                result.textContent = rightOrWrongBool;
            }
            else {
                var result2 = document.getElementById("correct-or-incorrect");

                result2.textContent = rightOrWrongBool;
            }
            
            console.log(score);

            nextQuestion();   
        })
    })

}  

// called when I click "next button". Later will be called upon selecting a choice
// replacing questions and choices content 
// once we run out of questions, displaying "you've answered em all"
function nextQuestion() {
    questionNumber++;
    // console.log("nextQuestion function call. This happens before render Question");
    // console.log("you're on index: " + questionNumber);
   
    if (questionNumber > questionsObjArr.length - 1) {
        endQuiz();
        return;
    }
    renderQuestion(questionsObjArr[questionNumber])
}

// To be called either when timerCount === 0 or answered all questions 
function endQuiz() {
    // Clears interval
    clearInterval(timer);
    
    // pass score to UI and display
    // enter initials, save initials and score in local storage
    prompt.textContent = "All done!";
    options.innerHTML = "";

    var li = document.createElement("h5");
    li.classList.add('score-display');
    // li.setAttribute('id','liEl' + index);
    li.setAttribute("style", "background-color:lightblue; padding:5px; margin:5px");
    options.appendChild(li);
    li.textContent = "Final score is: " + score;

    nextButton.style.display = "none";
    // set up initial entry field
    // "Enter initials: " + text box + submit button
    // submit button should save initials + score to local storage
    initialsPrompt.style.display = "inline";
    console.log("made it here");
    
    
}

function storeHighScore(event) {
    event.preventDefault();

    prompt.textContent = "High Scores:";
    options.innerHTML = "";
    initialsForm.style.display = "none";
    
    // feedbackSection.style.display = "none";

    console.log("User " + initialsInput.value + " scored " + score + " points");
    var highScoresObj = [
        {
            user: "",
            highScore: ""
        }
    ];
    var recentScoreObj = [
        {
            user: initialsInput.value,
            highScore: score
        }
    ];

    // push latest high score to array of key value pairs containing initials:score
    
    highScoresObj.push(recentScoreObj);
    console.log(highScoresObj);

    localStorage.setItem("highScoresObjectArray", highScoresObj);
    

    var storedScores = localStorage.getItem("highScoresObjectArray");

    var scoresTable = document.createElement("h5");
    page.appendChild(scoresTable);
    scoresTable.textContent = storedScores;

    // still need to figure out how to print this list to html
    // ideally I would have a max size of 10, sort them by highest score, only display top 10 scores

}
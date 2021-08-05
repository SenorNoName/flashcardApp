//Code for code.org app https://studio.code.org/projects/applab/HwQJ7uoGxnAb2tTix89G7KQ8VB6J8f4bCvV22G5csJo

// Variables
var averageSeconds;
var currentTerm = 1;
var definitionList = [];
var finalScore;
var flag = false;
var numCompleted = 0;
var numCorrect = 0;
var percentAccurate;
var seconds = 0;
var secondsList = [];
var secondsSum;
var termIndex;
var termList = [];
var timerLoop = timedLoop(1000, timer);
var totalSeconds;

//Functions
//Resets timer and appends the seconds it took to respond to secondsList
function appendAndReset() {
  seconds = 0;
  timedLoop(1000, timer);
  appendItem(secondsList, totalSeconds);
}

//Checks if the input is correct and resets the text boxes
function checkAndReset() {
  stopTimedLoop(timerLoop);
  stopTimedLoop();
  appendAndReset();
  checkAnswer();
  setText("answerInput", "");
}

//Checks if the input is the correct term
function checkAnswer() {
  numCompleted++;
  setText("completionDisplay", numCompleted + "/" + termList.length);
  if (termList[currentTerm-1] == getText("answerInput")) {
    numCorrect++;
    setText("accuracyDisplay", numCorrect + "/" + termList.length);
  }
  completionCheck();
}

//Checks if all flashcards have been answered
function completionCheck() {
  if (currentTerm < termList.length) {
    currentTerm++;
    setText("definitionDisplay", definitionList[currentTerm-1]);
  } else {
    setScreen("resultsScreen");
  }
}

//Updates termList display from added or deleted terms and resets text boxes
function displayAndReset(buttonPressed) {
  var allTerms = termList.toString();
  setText("allTermsDisplay", allTerms);
  if (buttonPressed == "add") {
    setText("addTermInput", "");
    setText("addDefinitionInput", "");
  } else if (buttonPressed == "delete") {
    setText("deleteTermInput", "");
  }
}

//Calculates the accuracy
function getAccuracy() {
  percentAccurate = numCorrect/termList.length;
  setText("accuracyDisplay2", percentAccurate.toFixed(2) * 100 + "%");
}

//Calcuates points earned from average time
function getSecondsScore() {
  if (averageSeconds.toFixed(0) <= 2) {
    return 50 * percentAccurate;
  } else if (averageSeconds.toFixed(0) <= 5) {
    return 20 * percentAccurate;
  } else if (averageSeconds <= 10) {
    return 5 * percentAccurate;
  } else {
    return 0;
  }
}

//Calculates the average time for each flashcard
function getTime() {
  removeItem(secondsList, 0);
  secondsSum = 0;
  for (var length = 0; length < secondsList.length; length++) {
    secondsSum += secondsList[length];
  }
  averageSeconds = secondsSum/secondsList.length;
  setText("timeDisplay2", averageSeconds.toFixed(3) + " seconds");
}

//Calculates total score
function totalScore() {
  getAccuracy();
  getTime();
  finalScore = (percentAccurate * 100) + getSecondsScore();
}

//Searches for string in termList array
function search(searchValue) {
  flag = false;
  for (var i = 0; i < termList.length; i++) {
    if (termList[i] == searchValue) {
      flag = true;
      termIndex = i;
    }
  }
}

//Visible timer for view screen
function timer() {
  seconds++;
  if (seconds > 9) {
    setText("timeDisplay", "0:" + seconds);
  } else {
    setText("timeDisplay", "0:0" + seconds);
  }
  totalSeconds = seconds;
}

//Welcome Screen Code
//To edit screen
onEvent("editFlashcardsButton", "click", function() {
  setScreen("editFlashcardsScreen");
});

// Edit Screen Code
//To view screen
onEvent("toViewScreenButton", "click", function() {
  stopTimedLoop(timerLoop);
  setText("timeDisplay", "");
  setScreen("viewFlashcardsScreen");
});

//Adds term from addTermInput to termList
onEvent("addTermButton", "click", function() {
  appendItem(termList, getText("addTermInput"));
  appendItem(definitionList, getText("addDefinitionInput"));
  displayAndReset("add");
});

//Deletes term in deleteTermInput from termList
onEvent("deleteTermButton", "click", function() {
  search(getText("deleteTermInput"));
  if (flag == true) {
    removeItem(termList, termIndex);
    removeItem(definitionList, termIndex);
    displayAndReset("delete");
  } else {
    setText("deleteTermInput", "No word was found.");
  }
  flag = false;
});

//View Screen Code
//To edit screen
onEvent("toEditScreenButton", "click", function() {
  setScreen("editFlashcardsScreen");
});

//Starts flashcards and timer
onEvent("startButton", "click", function() {
  setText("definitionDisplay", definitionList[0]);
  appendAndReset();
});

//Checks if the string in answerInput matches the corresponding term in termList
onEvent("checkAnswerButton", "click", function() {
  checkAndReset();
});

//Results Screen Code
//Calculates and shows accuracy, average time, and score
onEvent("resultsTitle", "click", function() {
  totalScore();
  setText("scoreDisplay", finalScore.toFixed(0) + " points");
});

//To edit screen the screen
onEvent("toEditScreenButton2", "click", function() {
  setScreen("editFlashcardsScreen");
});

//To view screen
onEvent("toViewScreenButton2", "click", function() {
  setScreen("viewFlashcardsScreen");
});

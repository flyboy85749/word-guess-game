// ****************GLOBAL VARIABLES **************************
// list of words to guess
var words = ["dermatoglyphics", "publisher", "random", "amusing", "ovulate", "posit", "matrix", "purge", "gradient"];

// need an empty array to hold selected word
var chosenWord = "";

// how many letters in the word
var wordLetters = [];

// how many blanks do I need? initially 0
var numBlanks = 0;

// need an array to hold the correct guesses and remaining blanks
var blanksAndSuccesses = [];

// also need an array for incorrect guesses
var wrongLetters = [];

// need two game counters
var wins = 0;
var losses = 0;
var remainingGuesses = 0;

// ****************************************************

// ************************ FUNCTIONS ********************
function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    wordLetters = chosenWord.split("");
    numBlanks = wordLetters.length;

    // reset
    remainingGuesses = 10;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // populate blanks and successes with right number of blanks
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    // go ahead and change HTML

    // put spaces for random word in spaces div
	document.getElementById("spaces").innerHTML = blanksAndSuccesses.join(" ");

    // Remaining guesses
    document.getElementById("remaining").innerHTML = "Remaining Guesses: " + remainingGuesses;

    // display wins counter
    document.getElementById("wins").innerHTML = "Wins: " + wins;

    // display losses counter
    document.getElementById("losses").innerHTML = "Losses: " + losses;

    // display wrong guesses 
    document.getElementById("wrong").innerHTML = "Wrong Guesses: " + wrongLetters;

    // check it's working
    // console.log(chosenWord);
    // console.log(wordLetters);
    // console.log(numBlanks);
    // console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
    var isLetterInWord = false;
    // alert(letter);
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] == letter) {
            isLetterInWord = true;
            // alert("Letter Found");
        }
    }



    // check where letter is in word, and populate the blanks in array with another for loop
    if (isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if (chosenWord[i] == letter) {
                blanksAndSuccesses[i] = letter;

            }
        }
    }

    // letter wasn't found
    else {
        wrongLetters.push(letter);
        remainingGuesses--;
    }

    // make sure it works
    // console.log(blanksAndSuccesses);
}

function roundComplete() {
    // console.log("Win Count: " + wins + " | Loss Count: " + losses + " | Guesses Left: " + remainingGuesses);

    // update the html to reflect most recent count
    document.getElementById("remaining").innerHTML = "Guesses remaining: " + remainingGuesses;
    document.getElementById("spaces").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrong").innerHTML = "Wrong letters guessed: " + wrongLetters.join(" ");
    // check if user won

    if (wordLetters.toString() == blanksAndSuccesses.toString()) {
        wins++;
        alert("You won!");

        // update the wins in html
        document.getElementById("wins").innerHTML = "Wins: " + wins;
        startGame();
    }


    // check if user lost
    else if (remainingGuesses == 0) {
        losses++;
        alert("You lost!");

        // update the html
        document.getElementById("losses").innerHTML = "Losses: " + losses;
        startGame();
    }

}













// **********************************************************
// ******************** MAIN PROCESS ***********************
// begins the game
startGame();

// register key clicks
document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    // make sure it works
    // console.log(letterGuessed);
}









// ****************************************************************

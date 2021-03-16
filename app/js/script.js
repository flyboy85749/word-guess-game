
/********************* ORIGINAL GAME FUNCTIONALITY **********************/

// list of words to guess
const words = ["golden retriever", "beagle", "saint bernard", "yorkie", "alaskan malamute", "siberian husky",
    "bassett hound", "staffordshire terrier", "lapdog", "dirty dog", "baddog", "airedale", "chihuahua",
    "borzoi", "whippet", "greyhound", "foxhound", "poodle", "afghan", "terrier",
    "corgi", "boxer", "daschund", "weimeraner", "bloodhound", "irishsetter"];

// array of hints
const hints = ["has four legs", "is dander free", "is also known as a pit bull", "has a great nose",
    "works at the airport", "is a fighter", "is low and slow", "is also a blanket", "loves to fetch", "says I'm givin 'er all I've got, Jim!",
    "loves bagpipes"];

// need an empty array to hold selected word
let chosenWord = "";

// how many letters in the word
let wordLetters = [];

// how many blanks do I need? initially 0
let numBlanks = 0;

// need an array to hold the correct guesses and remaining blanks
let blanksAndSuccesses = [];

// also need an array for incorrect guesses
let wrongLetters = [];

// need two game counters
let wins = 0;
let losses = 0;
let remainingGuesses = 0;


// ****************************************************

// ************************ FUNCTIONS ********************
function startGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    console.log(chosenWord);
    randomHint = hints[Math.floor(Math.random() * hints.length)];
    console.log(randomHint);
    wordLetters = chosenWord.split("");
    numBlanks = wordLetters.length;



    // reset
    remainingGuesses = 10;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // populate blanks and successes with right number of blanks
    for (let i = 0; i < numBlanks; i++) {
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

    // provide a random hint
    document.getElementById("hint").innerHTML = "This Breed:  " + randomHint;


}



function checkLetters(letter) {
    let isLetterInWord = false;
    // alert(letter);
    for (let i = 0; i < numBlanks; i++) {
        if (chosenWord[i] == letter) {
            isLetterInWord = true;
            // alert("Letter Found");
        }
    }



    // check where letter is in word, and populate the blanks in array with another for loop
    if (isLetterInWord) {
        for (let i = 0; i < numBlanks; i++) {
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

        alert("You won! The answer was " + chosenWord + "!");


        // update the wins in html
        document.getElementById("wins").innerHTML = "Wins: " + wins;
        startGame();
    }


    // check if user lost
    else if (remainingGuesses == 0) {
        losses++;
        alert("You lost! The answer was " + chosenWord + "!");

        // update the html
        document.getElementById("losses").innerHTML = "Losses: " + losses;
        startGame();
    }

}

$(".btn").click(function () {
    startGame();
});

// register key clicks
document.onkeyup = function (event) {
    let letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    // make sure it works
    // console.log(letterGuessed);
}

// startGame();

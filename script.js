/* 
    Guess the number: steps

    1. Generate a random number between 1 and 100

    2. Register the number of the attempt in which the player is

    3. Give the player a way of guessing the number

    4. Once the number was written save it somewhere so the player can see his tries

    5. Check if the number is correct

    6. If it is correct:
               i. Show a message of congratulations
               ii. Do not allow the player to introduce more tries
               iii. Show the button that let's the player restart

    7. If it's incorrect and the player still has tries:
               i. Tell the player he has failed
               ii. Let the player retry 
               iii. Each time he fails increase the number of fails with 1

    8. If the player fails and has no more tries:
               i. Tell the player that the game has finished
               ii. Don't let the player put in more tries
               iii. Show a control that will let the player restart

    9. Once the game restarts make sure that the logic of the game and de UI (user interface) resets completly and go back to step 1.

*/

/*Generate the random number */
let randomNumber = Math.floor(Math.random()*100) + 1 ;

/* We bring the necessary elements from the dom*/
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

/* Attempt for counter variable and for the reset button */
let guessCount = 1;
let resetButton;

/* Function which makes sure if we guessed or not the number*/

function checkGuess() {
    const userGuess = Number(guessField.value);

    if(guessCount === 1) {
        guesses.textContent = "Previous attempt";
    }
    guesses.textContent += userGuess + " ";

    if(userGuess === randomNumber) {
        lastResult.textContent = "Congrats!You guessed the number!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
    } else if(guessCount === 10) {
        lastResult.textContent = "Game over!";
        setGameOver();
    }
    else {
        lastResult.textContent = "Incorrect!";
        lastResult.style.backgroundColor = "red";
        /* Make sure if the number is higher or lower */
        if(userGuess < randomNumber) {
            lowOrHi.textContent = "The number is really low!";
        } else if(userGuess > randomNumber) {
            lowOrHi.textContent = "The number is very high!";
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver(){
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Start again";
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame)
}

function resetGame(){
    guessCount = 1;

    const resetParagraphs = document.querySelectorAll(".resultParagraphs p");

    for(const resetParagraph of resetParagraphs) {
        resetParagraph.textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random()*100) + 1;
}
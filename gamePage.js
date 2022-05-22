
// Update the grid guesses
const guessingGrid = document.querySelector("[data-guess-grid]")


// A function to refresh  the programme to find if the keyboard or mouse has been clicked
refreshInteraction()

// Function to listen out for a button press
function refreshInteraction()                           //refreshInteraction uses the built in addEventListener to listen out for a mouse click on
{                                                       // the buttons of the keyboard on the web page and for when one of the keys on the user's
  document.addEventListener("click", MouseClick )      // keys are pressed
  document.addEventListener("keydown", KeyPressed)
}

function completeInteraction()                           //This function  uses the built in function 'removeEventListener' which will end the listening  
{                                                        // out for an interaction which will be used when a win or loss occurs
  document.removeEventListener("click", MouseClick )
  document.removeEventListener("keydown", KeyPressed)
}

// Function to register which button-key was pressed
function MouseClick(event)                               // An input event button is inputted into the function and checks if it matches   
{                                                        // any of the set alphabet letters. then it returns which button was pressed 
    if (event.target.matches("[data-key]"))
    {
     pressedKey(event.target.dataset.key)    // The specific key that was pressed is sent to a function that will enter it into the row for the guess
     return
    }
}

// Function to register which key on the user's keyboard was pressed
function KeyPressed(event)                
{
    console.log(event)                   // The key that was pressed down is converted to a letter and compared to a letter in the alphabet to
    if (event.key.match(/^[a-z]$/))      // be approved for the input guess
    {
        pressedKey(event.key)
        return
    }

}

function pressedKey(key)
{
    const wordLength = getWordLength()     // This function checks the length of the word to know when the user has completed a guessed word
    if (wordLength.length > 4)             // and if the word is less than 5 letters then it will place the inputted word
    {
        return
    }
    const FollowingTile = guessingGrid.querySelector(":not([data-letter])")
    FollowingTile.dataset.letter = key
    FollowingTile.textContent = key
    FollowingTile.dataset.state = "taken"
}

function getWordLength()  //Returns the length of the word
{
    const wordLen = guessingGrid.querySelectorAll('[data-state="taken"]')
    return wordLen
}

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

    if (event.target.matches("[data-delete]")) 
    {                                           
        DeleteRow()                             // Call the delete function to delete the letters in the row
        return
    }

    if (event.target.matches("[data-enter]"))
    {
        submitGuess()                         // Call the function to check if the 
        return
    }
}

// Function to register which key on the user's keyboard was pressed
function KeyPressed(event)                
{                                        // The key that was pressed down is ompared to a letter in the alphabet to
    if (event.key.match(/^[a-z]$/))      // be approved for the input guess
    {
        pressedKey(event.key)
        return
    }

    if (event.key === "Delete")
    {
        DeleteRow()
        return        
    }

    if (event.key === "Enter")
    {
        submitGuess()
        return        
    }
}

function pressedKey(key)
{
    const wordLength = getWord()     // This function checks the length of the word to know when the user has completed a guessed word
    if (wordLength.length > 4)             // and if the word is less than 5 letters then it will place the inputted word
    {
        return
    }
    const FollowingTile = guessingGrid.querySelector(":not([data-letter])")
    FollowingTile.dataset.letter = key
    FollowingTile.textContent = key
    FollowingTile.dataset.state = "taken"
}

function getWord()  //Returns the word
{
    const wordLen = guessingGrid.querySelectorAll('[data-state="taken"]')  // Returns a string of the word being inputted
    return wordLen
}

function DeleteRow()                             //Function to delete the entire row calls the current word in the row 
{                                                // and each element in the string is deleted and cleared to delete the 
    const filledTiles = getWord()                // entire string/word

    for (let i=0;i < filledTiles.length;i++)
    {
        if (filledTiles == null)
        {
            return                               //Nothing to delete
        }
        filledTiles[i].textContent = ""
        delete filledTiles[i].dataset.state      //empty the string and remove the state to reset it
        delete filledTiles[i].dataset.letter
    }

}

function submitGuess()                        //Function to submit the guess
{
    const filledTiles = getWord()

    if (filledTiles < 4)
    {
        console.log("Word not long enough")    // Function will output an error message if the inputted word 
        return                                 // is smaller than the word to be guessed
    }
}
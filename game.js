import { getRandomNumber } from './random.js';

// Retrieve the balance from localStorage or set it to the starting balance (100)
var balance = parseInt(localStorage.getItem('balance')) || 100;

// Create a message container at the bottom of the screen
var messageContainer = document.createElement('div');
messageContainer.style.position = 'fixed';
messageContainer.style.bottom = '0';
messageContainer.style.left = '0';
messageContainer.style.width = '100%';
messageContainer.style.backgroundColor = '#333';
messageContainer.style.color = '#fff';
messageContainer.style.padding = '10px';
document.body.appendChild(messageContainer);

function startGame() {
    // Get the bet from the user
    var betString = prompt(`Your current balance: $${balance}\nEnter your bet:`);

    // Validate the bet
    var bet = parseInt(betString);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
        displayMessage('Invalid bet. Please enter a valid bet.');
        return;
    }

    // Subtract the initial bet from the balance
    balance -= bet;

    // Get random values for player and dealer
    var player1 = getRandomNumber();
    var player2 = getRandomNumber();
    var dealer1 = getRandomNumber();
    var dealer2 = getRandomNumber();

    // Calculate totals
    var playerTotal = player1 + player2;
    var dealerTotal = dealer1 + dealer2;

    // Display details of the current round
    displayMessage(`Player1: ${player1}`);
    displayMessage(`Player2: ${player2}`);
    displayMessage(`PlayerTotal: ${playerTotal}`, true); // The true parameter indicates a line break
    displayMessage(`Dealer1: ${dealer1}`);
    displayMessage(`Dealer2: ${dealer2}`);
    displayMessage(`DealerTotal: ${dealerTotal}`, true); // The true parameter indicates a line break

    // Determine the winner
    var resultMessage = '';
    if (playerTotal > dealerTotal) {
        balance += 2 * bet; // Adjust the balance
        resultMessage = `Player wins: $${2 * bet}`;
        displayWinnerMessage('Player wins!');
    } else if (playerTotal < dealerTotal) {
        resultMessage = `Player loses: $${bet}`;
        displayWinnerMessage('Dealer wins!');
    } else {
        resultMessage = `It's a tie. No money lost or won.`;
        displayWinnerMessage('It\'s a tie!');
    }

    // Save the updated balance to localStorage
    localStorage.setItem('balance', balance);

    // Display the result message
    displayMessage(resultMessage, true);

    // Display the updated balance
    displayMessage(`Balance: $${balance}`, true);

    // Add "Press to Play Again" button
    addPlayAgainButton();
}

// Function to display a message
function displayMessage(message, lineBreak) {
    var messageElement = document.createElement('p');
    messageElement.innerText = message;

    if (lineBreak) {
        messageElement.style.marginBottom = '20px'; // Add some space between messages
    }

    messageContainer.appendChild(messageElement);
}

// Function to display the winner message
function displayWinnerMessage(winnerMessage) {
    var winnerElement = document.createElement('p');
    winnerElement.style.fontSize = '24px';
    winnerElement.innerText = winnerMessage;
    messageContainer.appendChild(winnerElement);
}

// Function to add "Press to Play Again" button
function addPlayAgainButton() {
    var playAgainButton = document.createElement('button');
    playAgainButton.innerText = 'Press to Play Again';
    playAgainButton.style.marginTop = '20px';
    playAgainButton.style.padding = '10px 20px';
    playAgainButton.style.fontSize = '16px';
    playAgainButton.style.backgroundColor = 'cornflowerblue';
    playAgainButton.style.color = '#fff';
    playAgainButton.style.border = 'none';
    playAgainButton.style.cursor = 'pointer';

    playAgainButton.addEventListener('click', function () {
        startGame(); // Start a new game when the button is clicked
    });

    messageContainer.appendChild(playAgainButton);
}

export { startGame };
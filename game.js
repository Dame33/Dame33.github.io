import { getRandomNumber } from './random.js';

// Retrieve the balance from localStorage or set it to the starting balance (100)
var balance = parseInt(localStorage.getItem('balance')) || 100;

function startGame() {
    // Clear previous messages
    var welcomeContainer = document.getElementById('welcomeContainer');
    welcomeContainer.innerHTML = '';

    // Get the bet from the user
    var betString = prompt(`Your current balance: $${balance}\nEnter your bet:`);

    // Validate the bet
    var bet = parseInt(betString);
    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert('Invalid bet. Please enter a valid bet.');
        startGame(); // Restart the game if the bet is invalid
        return;
    }

    // Get random values for player and dealer
    var player1 = getRandomNumber();
    var player2 = getRandomNumber();
    var dealer1 = getRandomNumber();
    var dealer2 = getRandomNumber();

    // Calculate totals
    var playerTotal = player1 + player2;
    var dealerTotal = dealer1 + dealer2;

    // Display player information
    displayMessage(`Player First Roll: ${player1}`);
    displayMessage(`Player Second Roll: ${player2}`);
    displayMessage(`Player Total: ${playerTotal}`, true); // The true parameter indicates a line break

    // Display dealer information
    displayMessage(`Dealer First Roll: ${dealer1}`);
    displayMessage(`Dealer Second Roll: ${dealer2}`);
    displayMessage(`Dealer Total: ${dealerTotal}`, true); // The true parameter indicates a line break

    // Determine the winner
    var resultMessage = '';
    if (playerTotal > dealerTotal) {
        balance += 2 * bet; // Adjust the balance
        resultMessage = `Player wins: $${2 * bet}`;
    } else if (playerTotal < dealerTotal) {
        balance -= bet; // Adjust the balance
        resultMessage = `Player loses: $${bet}`;
    } else {
        resultMessage = `It's a tie. No money lost or won.`;
    }

    // Save the updated balance to localStorage
    localStorage.setItem('balance', balance);

    // Display the result message
    displayMessage(resultMessage, true);

    // Display the updated balance
    displayMessage(`Balance: $${balance}`, true);

    // Display the winner message
    displayWinnerMessage(playerTotal, dealerTotal);

    // Check if the balance allows for another round
    if (balance > 0 && confirm('Do you want to play another round?')) {
        // Reset player and dealer values for a new round
        startGame();
    } else {
        displayMessage('Game over. Thank you for playing!', true);
    }
}

// Function to display a message
function displayMessage(message, lineBreak) {
    var messageElement = document.createElement('p');
    messageElement.innerText = message;

    if (lineBreak) {
        messageElement.style.marginBottom = '20px'; // Add some space between messages
    }

    document.body.appendChild(messageElement);
}

// Function to display the winner message
function displayWinnerMessage(playerTotal, dealerTotal) {
    var winnerMessage = '';
    if (playerTotal > dealerTotal) {
        winnerMessage = 'Player wins!';
    } else if (playerTotal < dealerTotal) {
        winnerMessage = 'Dealer wins!';
    } else {
        winnerMessage = 'It\'s a tie!';
    }

    displayMessage(winnerMessage, true);
}

export { startGame };
import { getRandomNumber } from './random.js';

var balance = 100; // Starting balance

function startGame() {
    var welcomeContainer = document.getElementById('welcomeContainer');
    welcomeContainer.innerHTML = '';

    var balanceHeader = document.createElement('h2');
    balanceHeader.id = 'balanceHeader';
    balanceHeader.innerText = 'Balance: $' + balance;
    document.body.appendChild(balanceHeader);

    // Ask the user for a bet
    var bet = parseInt(prompt('How much would you like to bet?'));

    // Validate the bet
    if (isNaN(bet) || bet <= 0 || bet > balance) {
        alert('Invalid bet amount. Please retry.');
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

    // Determine the winner
    if (playerTotal > dealerTotal) {
        balance += 2 * bet;
    } else if (playerTotal < dealerTotal) {
        balance -= bet;
    }

    // Check if balance is less than 0
    if (balance < 0) {
        alert('You have been gifted $100!');
        balance = 100; // Reset balance to $100
    }

    // Update the balance display
    balanceHeader.innerText = 'Balance: $' + balance;
}
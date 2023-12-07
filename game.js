import { getRandomNumber } from './random.js';

// Retrieve the balance from localStorage or set it to the starting balance (100)
var balance = parseInt(localStorage.getItem('balance')) || 100;

// Images for different outcomes
var winImages = [
    'https://pbs.twimg.com/media/DsSqKlBV4AAYpVK.jpg',
    'https://media.tenor.com/nT1VS7YVtlQAAAAC/jang-wonyoung.gif',
    'https://media.tenor.com/2hZ29SaqxjkAAAAM/lebron-james-dancing.gif',
    'https://i.kym-cdn.com/photos/images/original/002/621/765/0da.gif',
    'https://media.tenor.com/w-pkPU-ql4UAAAAC/cash-dollars.gif',
    'https://media.tenor.com/JIDQh-6oYQAAAAAd/karina-laughing-karina-aespa.gif',
    'https://i.redd.it/dg9siz5g0wv91.gif',
    'https://media.tenor.com/MllSK8DORaUAAAAd/yunjin-huh-yunjin.gif',
    'https://media.tenor.com/9jhVWNwUHMIAAAAC/iu-laughing-seokrmi.gif',
];

var loseImages = [
    'https://media.tenor.com/WTs_OWCkz_UAAAAM/lebron-james.gif',
    'https://i.pinimg.com/originals/fd/c2/69/fdc269b50052ee6ae6949ebc6b5ae52b.gif',
    'https://media.tenor.com/t9kbbYsvSK0AAAAC/og-anunoby-og.gif',
    'https://media.tenor.com/IRTc7hnKYRwAAAAC/this-is.gif',
    'https://media.tenor.com/aoq31yTKqdsAAAAC/yuqi-idle.gif',
    'https://i.kym-cdn.com/entries/icons/original/000/037/984/thiccomniman.png',
    'https://media.tenor.com/2FxHdvZuzGMAAAAd/laughing-lol.gif',
    'https://i.redd.it/zj7m5n0a2xx91.jpg',
    'https://media.tenor.com/JSMcHbYqHBoAAAAC/iu-sad.gif',
];

var tieImages = [
    'https://media.tenor.com/4ERy1HMz3qUAAAAM/thousand-yard-stare.gif',
    'https://i.guim.co.uk/img/media/3aab8a0699616ac94346c05f667b40844e46322f/0_123_5616_3432/master/5616.jpg?width=445&dpr=1&s=none',
    'https://media.tenor.com/nZIyY5pgxIEAAAAd/showmaker-punch.gif',
    'https://www.hungertv.com/app/uploads/2023/10/bird.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeO74Wf61GutnEyDOdroVrnIKgkmifF6bDhg&usqp=CAU',
    'https://i.pinimg.com/originals/de/a7/90/dea790179d08e88d00985167e0f05cd6.gif',
];

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

// Function to display a message
function displayMessage(message, lineBreak, color) {
    var messageElement = document.createElement('p');
    messageElement.innerText = message;

    if (lineBreak) {
        messageElement.style.marginBottom = '20px'; // Add some space between messages
    }

    if (color) {
        messageElement.style.color = color;
    }

    messageContainer.appendChild(messageElement);
}

function startGame() {
    // Clear previous messages
    messageContainer.innerHTML = '';

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
    displayDetails(`First Roll: ${player1}`);
    displayDetails(`Second Roll: ${player2}`);
    displayDetails(`PlayerTotal: ${playerTotal}`, true, '#a100ff'); // The true parameter indicates a line break
    displayDetails(`Dealer First Roll: ${dealer1}`);
    displayDetails(`Dealer Second Roll: ${dealer2}`);
    displayDetails(`DealerTotal: ${dealerTotal}`, true, '#a100ff'); // The true parameter indicates a line break

    // Determine the winner
    var resultMessage = '';
    if (playerTotal > dealerTotal) {
        balance += 2 * bet; // Adjust the balance
        resultMessage = `Player wins: $${2 * bet}`;
        displayWinnerMessage('Player wins!');
        displayRandomWinnerImage(winImages);
    } else if (playerTotal < dealerTotal) {
        resultMessage = `Player loses: $${bet}`;
        displayWinnerMessage('Dealer wins!');
        displayRandomWinnerImage(loseImages);
    } else {
        balance += bet; // Return the bet money in case of a tie
        resultMessage = `It's a tie. Bet returned: $${bet}`;
        displayWinnerMessage('It\'s a tie!');
        displayRandomWinnerImage(tieImages); // Display a random image for a tie
    }

    // Check if the balance is less than or equal to 0
    if (balance <= 0) {
        alert('$100 has been gifted.');
        balance = 100;
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

// Function to display details
function displayDetails(message, lineBreak, color) {
    var messageElement = document.createElement('p');
    messageElement.innerText = message;

    if (lineBreak) {
        messageElement.style.marginBottom = '20px'; // Add some space between messages
    }

    if (color) {
        messageElement.style.color = color;
    }

    messageContainer.appendChild(messageElement);
}

// Function to display the winner message with color
function displayWinnerMessage(winnerMessage) {
    var winnerElement = document.createElement('p');
    winnerElement.style.fontSize = '24px';

    // Set color based on the winner
    if (winnerMessage.includes('Player wins')) {
        winnerElement.style.color = 'green';
    } else if (winnerMessage.includes('Dealer wins')) {
        winnerElement.style.color = 'red';
    } else {
        winnerElement.style.color = 'white'; // Default color for other messages
    }

    winnerElement.innerText = winnerMessage;
    messageContainer.appendChild(winnerElement);
}

// Function to display a random winner image
function displayRandomWinnerImage(imageArray) {
    var randomIndex = Math.floor(Math.random() * imageArray.length);
    displayWinnerImage(imageArray[randomIndex]);
}

// Function to display the winner image with color
function displayWinnerImage(imageURL) {
    var imageElement = document.createElement('img');
    imageElement.src = imageURL;
    imageElement.style.width = '100px'; // Adjust the size as needed
    imageElement.style.marginTop = '10px';
    messageContainer.appendChild(imageElement);
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
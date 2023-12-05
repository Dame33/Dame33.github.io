import {getRandomNumber} from './random.js';
var balance = 0;

function startGame(){
    balance += 20;

    var welcomeContainer = document.getElementById('welcomeContainer');
    welcomeContainer.innerHTML = '';

    var balanceHeader = document.createElement('h2');
    balanceHeader.id = 'balanceHeader';
    balanceHeader.innerText = 'Balance: $' + balance;
    document.body.appendChild(balanceHeader);

    var player1 = getRandomNumber
}
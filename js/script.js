//Output div
var output = document.getElementById('output');
var result = document.getElementById('result');
var roundsLeft = document.getElementById('roundsLeft');
var gameEnd = document.getElementById('gameEnd');


var params = {
    allRounds: 0,
    playerScore: 0,
    computerScore: 0
}

//Wynik
var score;
// var playerScore = 0;
// var computerScore = 0;
// var allRounds = 0;
var gameContinue = false;

var newGameBtn = document.getElementById('newGameBtn');
var playerMoveButtons = document.querySelectorAll('.player-move');


//Strings
var rock = 'rock';
var scissors = 'scissors';
var paper = 'paper';

var computerWin = 'computerWin';
var playerWin = 'playerWin';
var draw = 'draw';

//Functions
var getPlayerM = function(event) {
    console.log(event.target.getAttribute('data-move'))
    return event.target.getAttribute('data-move');
};

var getComputerM = function() {
    var computerM = Math.floor((Math.random() * 3) + 1);
    if (computerM === 1) {
        return paper;
    } else if (computerM === 2) {
        return rock;
    } else {
        return scissors;
    }
};

var printRoundOutput = function(score, playerM, computerM) {
    console.log('playerM', playerM)
    console.log('computerM', computerM)
    if (score === playerWin) {
        output.innerHTML += 'YOU WON: you played ' + playerM + ', computer played ' + computerM + '<br><br>'
    } else if (score === computerWin) {
        output.innerHTML += 'COMPUTER WON: it played ' + computerM + ', YOU played ' + playerM + '<br><br>'
    } else {
        output.innerHTML += 'REMIS: it played ' + computerM + ', YOU played ' + playerM + '<br><br>'
    }
};


var updateScore = function(score) {
    if (score === playerWin) {
        params.playerScore += 1;
    } else if (score === computerWin) {
        params.computerScore += 1;
    }
};

var printScore = function(params) {
    result.innerHTML = 'playerScore ' + params.playerScore + ' - ' + params.computerScore + ' computerScore';
};

var playerMove = function(event) {
    var playerM = getPlayerM(event);
    var computerM = getComputerM();
    if (computerM ===  playerM) {
        score = draw;
    } else if ((computerM === paper && playerM === rock) || (computerM === rock && playerM === scissors) || (computerM === scissors && playerM === paper)){
        score = computerWin;
    } else if (computerM === paper && playerM === scissors || (computerM === rock && playerM === paper) || (computerM === scissors && playerM === rock)) {
        score = playerWin;
    }
    printRoundOutput(score, playerM, computerM);
    updateScore(score);
    printScore(params);
    printRoundsToWin(params);
    printGameContinue(params);
};

/*Start nowej gry*/
var newGameStart = function() {
    params.allRounds = window.prompt('Do ilu wygranych rund chcesz grać?');
    if (!isNaN(params.allRounds) && params.allRounds.length > 0) {
        gameContinue = true;
        output.innerHTML = 'Let\'s play';
        result.innerHTML = '';
        params.playerScore = 0;
        params.computerScore = 0;
        return params.allRounds
    } else {
        gameContinue = false;
        alert('You have to type number value')
    }
};

var printRoundsToWin = function(params) {
    roundsLeft.innerHTML = 'Wygrywa gracz, który zdobędzie ' + params.allRounds + ' rund' + '<br><br>';
};

var printGameContinue = function(params) {
    if (params.playerScore.toString() === params.allRounds) {
        gameEnd.innerHTML = 'YOU WON THE ENTIRE GAME!!!' + '<br><br>';
        gameContinue = false;
    } else if (params.computerScore.toString() === params.allRounds) {
        gameEnd.innerHTML = 'COMPUTER WON THE ENTIRE GAME!!!' + '<br><br>';
        gameContinue = false;
    }
};

var pressNewGame = function() {
    alert('Press new game')
};

var onButtonClick = function(event) {
    if (gameContinue) {
        return playerMove(event)
    } else {
        return pressNewGame()
    }
};

newGameBtn.addEventListener('click', newGameStart);
playerMoveButtons.forEach(function(element){
    element.addEventListener('click', onButtonClick)
});
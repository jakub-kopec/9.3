//Output div
var output = document.getElementById('output');
var result = document.getElementById('result');
var roundsLeft = document.getElementById('roundsLeft');
var gameEnd = document.getElementById('gameEnd');


//Wynik
var score;
var playerScore = 0;
var computerScore = 0;
var allRounds = 0;
var gameContinue = false;

//Btn's
var papierBtn = document.getElementById('papier');
var kamienBtn = document.getElementById('kamien');
var nozyceBtn = document.getElementById('nozyce');
var newGameBtn = document.getElementById('newGameBtn');

//Strings
var rock = 'kamien';
var scissors = 'nozyce';
var paper = 'papier';

var computerWin = 'computerWin';
var playerWin = 'playerWin';
var draw = 'draw';

//Functions
var getPlayerM = function(event) {
    return event.target.id;
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
        playerScore += 1;
    } else if (score === computerWin) {
        computerScore += 1;
    }
};

var printScore = function(playerScore, computerScore) {
    result.innerHTML = 'playerScore ' + playerScore + ' - ' + computerScore + ' computerScore';
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
    printScore(playerScore, computerScore);
    printRoundsToWin(allRounds);
    printGameContinue(playerScore, computerScore, allRounds);
};

/*Start nowej gry*/
var newGameStart = function() {
    allRounds = window.prompt('Do ilu wygranych rund chcesz grać?');
    if (!isNaN(allRounds) && allRounds.length > 0) {
        gameContinue = true;
        output.innerHTML = 'Let\'s play'
        result.innerHTML = ''
        playerScore = 0
        computerScore = 0
        return allRounds
    } else {
        gameContinue = false
        alert('You have to type number value')
    }
};

var printRoundsToWin = function(allRounds) {
    roundsLeft.innerHTML = 'Wygrywa gracz, który zdobędzie ' + allRounds + ' rund' + '<br><br>';
};

var printGameContinue = function(playerScore, computerScore, allRounds) {
    if (playerScore.toString() === allRounds) {
        gameEnd.innerHTML = 'YOU WON THE ENTIRE GAME!!!' + '<br><br>';
        gameContinue = false;
    } else if (computerScore.toString() === allRounds) {
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

papierBtn.addEventListener('click', onButtonClick);
kamienBtn.addEventListener('click', onButtonClick);
nozyceBtn.addEventListener('click', onButtonClick);
newGameBtn.addEventListener('click', newGameStart);

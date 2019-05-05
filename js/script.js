//Output div
var output = document.getElementById('output');
var result = document.getElementById('result');
var roundsLeft = document.getElementById('roundsLeft');
var gameEnd = document.getElementById('gameEnd');


var params = {
    currentRound: 0,
    allRounds: 0,
    playerScore: 0,
    computerScore: 0,
    gameContinue: false,
    progress: []
}

//Wynik
var score;
// var gameContinue = false;

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
    params.currentRound ++;
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
    params.progress.push({
        currentRound: params.currentRound,
        playerMove: playerM,
        computerMove: computerM,
        roundScore: score,
        scoreAfterRound: params.playerScore + ' - ' + params.computerScore,
    })
    updateModal();
    printScore(params);
    printRoundsToWin(params);
    printGameContinue(params);
};

/*Start nowej gry*/
var newGameStart = function() {
    params.currentRound = 0;
    params.allRounds = window.prompt('Do ilu wygranych rund chcesz grać?');
    if (!isNaN(params.allRounds) && params.allRounds.length > 0) {
        params.gameContinue = true;
        output.innerHTML = 'Let\'s play';
        result.innerHTML = '';
        params.playerScore = 0;
        params.computerScore = 0;
        return params.allRounds
    } else {
        params.gameContinue = false;
        alert('You have to type number value')
    }
};

var printRoundsToWin = function(params) {
    roundsLeft.innerHTML = 'Wygrywa gracz, który zdobędzie ' + params.allRounds + ' rund' + '<br><br>';
};

var printGameContinue = function(params) {
    if (params.playerScore.toString() === params.allRounds) {
        gameEnd.innerHTML = 'YOU WON THE ENTIRE GAME!!!' + '<br><br>';
        params.gameContinue = false;
        showModal()
    } else if (params.computerScore.toString() === params.allRounds) {
        gameEnd.innerHTML = 'COMPUTER WON THE ENTIRE GAME!!!' + '<br><br>';
        params.gameContinue = false;
        showModal()
    }
};

var pressNewGame = function() {
    alert('Press new game')
};

var onButtonClick = function(event) {
    if (params.gameContinue) {
        return playerMove(event)
    } else {
        return pressNewGame()
    }
};

newGameBtn.addEventListener('click', newGameStart);
playerMoveButtons.forEach(function(element){
    element.addEventListener('click', onButtonClick)
});

//Modals

var modals = document.querySelectorAll('.modal');
var resultModal = document.querySelector('#result-modal')


var showModal = function(){
    resultModal.classList.add('show')
    document.querySelector('#modal-overlay').classList.add('show')
};



var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

closeButtons.forEach(function(element) {
    element.addEventListener('click', hideModal);
})

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
        event.stopPropagation();
    });
}

//Table row insert
var progressIndex = 0;

function updateModal() {

    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    var tableCurrentRound = row.insertCell(0);
    var tablePlayerMove = row.insertCell(-1);
    var tableComputerMove = row.insertCell(-1);
    var tableRoundScore = row.insertCell(-1);
    var tableScoreAfterRound = row.insertCell(-1);
    tableCurrentRound.innerHTML = params.progress[progressIndex].currentRound;
    tableComputerMove.innerHTML = params.progress[progressIndex].playerMove;
    tablePlayerMove.innerHTML = params.progress[progressIndex].computerMove;
    tableRoundScore.innerHTML = params.progress[progressIndex].roundScore;
    tableScoreAfterRound.innerHTML = params.progress[progressIndex].scoreAfterRound;
    progressIndex += 1
}
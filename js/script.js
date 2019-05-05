//Output div
var output = document.getElementById('output');
var result = document.getElementById('result');
var roundsLeft = document.getElementById('roundsLeft');
var gameEnd = document.getElementById('gameEnd');


var params = {
    allRounds: 0,
    playerScore: 0,
    computerScore: 0,
    gameContinue: false
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

//do wyrzucenia

var modalLinks = document.querySelectorAll('.show-modal');

modalLinks.forEach(function(element) {
    element.addEventListener('click', showModal);
})
function getComputerChoice() {
    const choice = ['rock', 'paper', 'scissors'];
    return choice[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, ComputerSelection) {
    const playerSelectionCmp = playerSelection.toLowerCase();

    choices.textContent = `Your choice: ${playerSelection} | Computer: ${ComputerSelection}`;

    if (playerSelectionCmp === 'rock') {
        return rockChoice(ComputerSelection);
    } else if (playerSelectionCmp === 'paper') {
        return paperChoice(ComputerSelection);
    } else if (playerSelectionCmp === 'scissors') {
        return scissorsChoice(ComputerSelection);
    } else {
        return ['Wrong input', -1];
    }
}

function rockChoice(ComputerSelection) {
    if (ComputerSelection === 'rock') return ['Draw!', 1];
    if (ComputerSelection === 'scissors') return ['You won! Rock crushes scissors!', 2];
    return ['You lost! Paper covers rock!', 0];
}

function paperChoice(ComputerSelection) {
    if (ComputerSelection === 'paper') return ['Draw!', 1];
    if (ComputerSelection === 'rock') return ['You won! Paper covers rock!', 2];
    return ['You lost! Scissors cut paper!', 0];
}

function scissorsChoice(ComputerSelection) {
    if (ComputerSelection === 'scissors') return ['Draw!', 1];
    if (ComputerSelection === 'paper') return ['You won! Scissors cut paper!', 2];
    return ['You lost! Rock crushes scissors!', 0];
}

function gameover(Winner) {
    buttons.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
    });

    choices.textContent = Winner === 'P' ? 'You won! 🎉' : 'You lost! 😢';

    let btn = document.createElement('button');
    btn.textContent = 'Play Again?';
    btn.classList.add('remove');
    startNode.appendChild(btn);

    btn.addEventListener('click', () => {
        buttons.querySelectorAll('button').forEach(btn => {
            btn.disabled = false;
        });
        text.textContent = '';
        choices.textContent = '';
        player.textContent = '0';
        computer.textContent = '0';
        startNode.removeChild(btn);
    });
}

function game(PlayersChoice) {
    let arr = playRound(PlayersChoice, getComputerChoice());
    if (arr[1] === -1) return;

    text.textContent = arr[0];
    let score = arr[1];

    if (score === 2) {
        let playerScore = Number(player.textContent);
        player.textContent = playerScore + 1;
        if (player.textContent === '5') {
            gameover('P');
        }
    } else if (score === 0) {
        let compScore = Number(computer.textContent);
        computer.textContent = compScore + 1;
        if (computer.textContent === '5') {
            gameover('C');
        }
    }
}

// === DOM Selections ===
const buttons = document.querySelector('.game');
const text = document.querySelector('.text');
const choices = document.querySelector('.choices');
const player = document.querySelector('.player');
const computer = document.querySelector('.computer');
const message = document.querySelector('.message');
const container2 = document.querySelector('.container-2');
const container1 = document.querySelector('.container-1');
const instructionContainer = document.querySelector('.instructions-container');
const footer = document.querySelector('.footer');
let startNode = document.querySelector('.start');
const clickable = document.querySelector('.clickable');
const playBtn = document.querySelector('.play-btn');

// === Animate Welcome Text ===
let container1Children = Array.from(container1.children);
let instructionContainerChildren = Array.from(instructionContainer.children);
let runCount = 0;

container1Children.forEach(child => {
    child.classList.toggle('hidden');
});
instructionContainerChildren.forEach(child => {
    child.classList.toggle('hidden');
});

function addToPage() {
    container1Children[runCount].classList.toggle('hidden');
    runCount++;
    if (runCount >= container1Children.length) clearInterval(timerId);
}
let timerId = setInterval(addToPage, 1000);

let myRunCount = 0;
function addToPageIns() {
    instructionContainerChildren[myRunCount].classList.toggle('hidden');
    myRunCount++;
    if (myRunCount >= instructionContainerChildren.length) clearInterval(timerIdIns);
}
let timerIdIns = setInterval(addToPageIns, 1000);

// === Move Start Game Node ===
startNode = container2.removeChild(startNode);

// === Game Control Logic ===
buttons.addEventListener('click', e => {
    const id = e.target.id;
    if (id === 'rock' || id === 'paper' || id === 'scissors') {
        game(id);
    }
});

// === Start Game Helper ===
function startGame() {
    document.body.removeChild(container1);
    document.body.insertBefore(startNode, footer);
}

// Start game via click or keyboard
clickable.addEventListener('click', startGame, { once: true });
playBtn.addEventListener('click', startGame, { once: true });
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'enter') {
        startGame();
    }
}, { once: true });

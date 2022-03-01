import {GameBoard} from "./gameBoard.js";
import {Player} from "./player.js";

const gameContainer = document.getElementById('game-container');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const fieldContainers = document.querySelectorAll('.game-field');
const currentPlayerContainer = document.getElementById('current-player-info');

const winnigCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const player1 = new Player('X');
const player2 = new Player('O');
const board = new GameBoard();

let flag = true;
let currentPlayer = player1;
let isWinner = false;

export function gameControler() {
    currentPlayerInfo();

    fieldContainers.forEach(field => {

        field.addEventListener('click', (e) => {

            if (field.classList.contains('game-field-seted')) return;


            const index = e.target.dataset.index - 1;
            if (currentPlayer === player2) {
                field.classList.add('player2-color')
            }

            board.setField(index, currentPlayer.sign);
            field.classList.add('game-field-seted');
            endGameCheck()
            board.updateBoard(fieldContainers);
            if(!(isWinner && board.gameBoard.includes(""))){
                changeFlag();
                currentPlayer = flag ? player1 : player2;
                currentPlayerInfo()
            } else {
                fieldContainers.forEach(element => {
                    element.classList.add('game-field-seted');
                })
            }

        })
    })

    resetBtn.addEventListener('click', reset);
    board.updateBoard(fieldContainers);

}

function changeFlag() {
    flag = !flag;
}

function currentPlayerInfo() {
    currentPlayerContainer.innerText = `Current Player : ${currentPlayer.sign}`;
}

function reset() {
    board.clearBoard();
    board.updateBoard(fieldContainers);
    fieldContainers.forEach(field => {
        field.classList.remove('game-field-seted');
        field.classList.remove('player2-color');
    });
    currentPlayer = player1;
    flag = true;
    currentPlayerInfo();
    isWinner = false;
}

function endGameCheck() {

    winnigCombination.forEach(combination =>{
        if(board.gameBoard[combination[0]] === currentPlayer.sign && board.gameBoard[combination[1]] === currentPlayer.sign && board.gameBoard[combination[2]] === currentPlayer.sign){
            currentPlayerContainer.innerText = `${currentPlayer.sign} WON !!!`;
            isWinner = true;

        };
    });
    if (!board.gameBoard.includes("") && isWinner === false) {
        currentPlayerContainer.innerText = 'DRAW'
    }
}


startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    resetBtn.classList.remove('hidden');
    gameContainer.classList.remove('hidden');
})

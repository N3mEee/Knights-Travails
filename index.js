import Cell from "./Cell.js";
import Queue from "./Queue.js";

function createGameBoard() {
    let board = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            board.push([i, j]);
        }
    }
    return board;
}
const gameBoard = createGameBoard();

const knightSteps = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
];

function validMoves(cell) {
    let validMoves = [];
    knightSteps.forEach((move) => {
        let thisMove = new Cell(cell.x + move[0], cell.y + move[1]);
        gameBoard.forEach((square) => {
            if (thisMove.x == square[0] && thisMove.y == square[1]) {
                validMoves.push(thisMove);
            }
        });
    });
    return validMoves;
}

function knightMoves(start, finish) {
    let queue = new Queue();
    queue.enqueue(new Cell(start[0], start[1]));
    while (!queue.isEmpty()) {
        let currentMove = queue.dequeue();
        if (currentMove.x == finish[0] && currentMove.y == finish[1]) {
            return `=> You made it in ${currentMove.dis} moves! Here's your path: ${printMoves(currentMove)}`;
        }
        validMoves(currentMove).forEach((move) => {
            if (move.previous == null) {
                move.previous = currentMove;
                move.dis = currentMove.dis + 1;
                queue.enqueue(move);
            }
        });
    }
}

function printMoves(currentMove) {
    let moveList = [];
    while (currentMove !== null) {
        const square = document.querySelector(`.square-${currentMove.x}-${currentMove.y}`);
        square.classList.add("path");
        square.textContent = currentMove.dis;
        moveList.unshift(`[${currentMove.x},${currentMove.y}]`);
        currentMove = currentMove.previous;
    }
    return moveList;
}
function generateGameBoard() {
    const board = document.createElement("div");
    board.id = "board";
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const cell = document.createElement("div");
            cell.classList.add("square");
            cell.classList.add(`square-${i}-${j}`);
            board.appendChild(cell);
        }
    }
    return board;
}
document.body.appendChild(generateGameBoard());

const form = document.querySelector("form");
const result = document.querySelector("#result");

form.addEventListener("submit", (event) => {
    document.body.removeChild(board);
    document.body.appendChild(generateGameBoard());
    event.preventDefault();
    const startInput = document.querySelector("#start");
    const endInput = document.querySelector("#end");
    const start = startInput.value.split(",").map((coord) => parseInt(coord.trim(), 10));
    const end = endInput.value.split(",").map((coord) => parseInt(coord.trim(), 10));
    const shortestPath = knightMoves(start, end);
    result.textContent = shortestPath;
});

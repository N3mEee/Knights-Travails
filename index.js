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
// Treat all possible moves the knight could make as children in a tree. Don’t allow any moves to go off the board.
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
        moveList.unshift(`[${currentMove.x},${currentMove.y}]`);
        currentMove = currentMove.previous;
    }
    return moveList;
}

console.log(knightMoves([0, 0], [1, 2])); // You made it in 1 moves! Here's your path: [0,0],[1,2]
console.log(knightMoves([0, 0], [3, 3])); // You made it in 2 moves! Here's your path: [0,0],[1,2],[3,3]
console.log(knightMoves([3, 3], [0, 0])); // You made it in 2 moves! Here's your path: [3,3],[2,1],[0,0]

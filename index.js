// TODO:
// Put together a script that creates a game board and a knight.
function createGameBoard() {
    let board = [];
    for (let i = 0; i < 8; i++) {
        board[i] = [];
        for (let j = 1; j <= 8; j++) {
            board[i].push(`${String.fromCharCode(i + 97)}${j}`);
        }
    }
    return board.reverse();
}
console.log(createGameBoard());
// Treat all possible moves the knight could make as children in a tree. Don’t allow any moves to go off the board.
// Decide which search algorithm is best to use for this case. Hint: one of them could be a potentially infinite series.
// Use the chosen search algorithm to find the shortest path between the starting square (or node) and the ending square.

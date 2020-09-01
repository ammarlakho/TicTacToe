/* 
GAME: 
    turn: 
    gameOver: true/false (if true whats the result)
    result: null/draw/x/o

GAMEBOARD:
    render():
        check gameOver 
        toggle turn
    current board state (an array of x and o)
    validMove()

Player:
    constructor(x/o)
    move(): 
        if valid:
            update gameBoard

*/
    

const Player = (type) => {
    let move = (index) => {
        GameBoard.update(type, index);
    }
    return {
        move
    }
};


const Game = (() => {
    const px = Player('x');
    const po = Player('o');
    let gameOver = false;
    let turn = 0;
    const move = (e) => {
        cellNumber = e.target.id.charAt(e.target.id.length-1);
        if(GameBoard.validMove(cellNumber) && !gameOver) {
            if(turn%2==0) {
                px.move(cellNumber);
            }
            else {
                po.move(cellNumber);
            }   
            turn++;
            // isGameOver();
        }
        else {
            alert("INVALID MOVE!");
        }
        
    }
    
    const cells = document.getElementById("gameBoard").children;
    for(let i=0; i<cells.length; i++) {
        cells[i].addEventListener('click', move)
    }

    // let isGameOver = () => {

    // }

    return {   
    }
})();

const GameBoard = (() => {
    let boardState = ['','','','','','','','','']
    let winner = null;
    const render = () => {
        let board = document.getElementById("gameBoard");
        let cells = board.children;
        for(let i=0; i<boardState.length; i++) {
            cells[i].textContent = boardState[i];
        }
        if(isGameOver()) {
            if(winner) {
                let result = document.getElementById("result");
                result.textContent = winner + " WINS!";
            }
            else {
                result.textContent = "ITS A TIE!";
            }
        }
    }
    const update = (playerType, index) => {
        boardState[index] = playerType;
        render();
    }
    const validMove = (index) => {
        return boardState[index] == '' && !isGameOver();
    }

    const isGameOver = () => {
        for(let i=0; i<boardState.length; i+=3) {
            if(boardState[i] === boardState[i+1] && boardState[i+1] == boardState[i+2] && boardState[i] !== '') {
                winner = boardState[i];
                return true;
            }
        }
        for(let i=0; i<3; i++) {
            if(boardState[i] === boardState[i+3] && boardState[i+3] == boardState[i+6] && boardState[i] !== '') {
                winner = boardState[i];
                return true;
            }
        }
        if(boardState[0] === boardState[4] && boardState[4] == boardState[8] && boardState[0] !== '') {
            winner = boardState[0];
            return true;
        }
        return false;
    }

    return {
        render,
        validMove,
        update,
    }
})();

GameBoard.render();

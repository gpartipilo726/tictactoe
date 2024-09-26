

//manages the state of the gameboard
const Gameboard = function () {

    const gameboard = [
        [1,2,3],
        [4,5,1],
        [2,1,3]
        ]

    const getGameboard = () => {
        gameboard.forEach(x => {
           console.log(x.join(' '))

        });
    };

    const updateGameBoard = (row, column, player) =>{
        console.log("inside Update board. Row is" + row + "Col is" + column);
        row -= 1;
        column -= 1;

        if (gameboard[row][column] === 'x' || gameboard[row][column] === 'o') {
            console.log("That Spot is already taken. Please Try again.");
            updateGameBoard(player.getPlayerRowChoice(), player.getPlayerColChoice(), player);
        } else { 
            gameboard[row][column] = player.getPlayerSymbol();
        }
    
    };

    const checkWinner = (player) => {
        let gameOver = false;

        console.log("inside the checkWinner function. Player symbol is " + player.getPlayerSymbol())

        if( 
            //left vertical
            (gameboard[0][0] === gameboard[1][0] && gameboard[1][0] === gameboard[2][0] && gameboard[0][0] === player.getPlayerSymbol()) ||
            //center vertical
            (gameboard[0][1] === gameboard[1][1] && gameboard[1][1] === gameboard[2][1] && gameboard[0][1] === player.getPlayerSymbol()) ||
            //right vertical
            (gameboard[0][2] === gameboard[1][2] && gameboard[1][2] === gameboard[2][2] && gameboard[0][2] === player.getPlayerSymbol()) ||
            //diagonal left to right
            (gameboard[0][0] === gameboard[1][1] && gameboard[1][1] === gameboard[2][2] && gameboard[0][0] === player.getPlayerSymbol()) ||
            //diagonal right to left
            (gameboard[0][2] === gameboard[1][1] && gameboard[1][1] === gameboard[2][0] && gameboard[0][2] === player.getPlayerSymbol()) ||
            //top horizontal
            (gameboard[0][0] === gameboard[0][1] && gameboard[0][1] === gameboard[0][2] && gameboard[0][0] === player.getPlayerSymbol()) ||
            //middle horizontal
            (gameboard[1][0] === gameboard[1][1] && gameboard[1][1] === gameboard[1][2] && gameboard[1][0] === player.getPlayerSymbol()) ||
            //bottom horizontal
            (gameboard[2][0] === gameboard[2][1] && gameboard[2][1] === gameboard[2][2] && gameboard[2][0] === player.getPlayerSymbol())
        ){
            console.log(player.getPlayer() + " is the Winner! GAME OVER!");
            return gameOver = true;
        } else {
            return gameOver;
        }
    };

    const resetGameboard = () => {

    };


    return {getGameboard, updateGameBoard, checkWinner, resetGameboard}

};

//manages players
const player = function () {
    let playerSymbol;
    let playerName;

    const createPlayer = (name) => {
        playerName = name;
        const symbol = prompt(`Hi ${name}, do you want to be X's or O's?`);
        setPlayerSymbol(symbol);
        console.log("inside the createPlayer function. Player symbol is " + getPlayerSymbol())
    }

    const getPlayerRowChoice = () =>{
        let val = prompt("Enter a row number:");
        console.log("row val is " + val)
        return val

    }

    const getPlayerColChoice = () =>{
        let val = prompt("Enter a column number:");
        console.log("col val is " + val)
        return val
    }
    
    const setPlayerSymbol = (symbol) => {
        playerSymbol = symbol
        }

    const getPlayer = () =>{
        return playerName;           
    }

    const getPlayerSymbol = () =>{
        return playerSymbol;
    }
    
    return {createPlayer, getPlayer, getPlayerRowChoice, getPlayerColChoice, getPlayerSymbol};

};


//controls the flow of the game
const gameController = function (){


const startGame = () => {
    let gameboard = Gameboard();
    let endGame = false;

    //ask for player name
    let playerOne = player();
    playerOne.createPlayer("Jim");
    
    let playerTwo = player();
    playerTwo.createPlayer("Ashley");

    //start game
    while (!endGame){
        console.log("----- || Player One's Turn  || -----");
        gameboard.updateGameBoard(playerOne.getPlayerRowChoice(), playerOne.getPlayerColChoice(), playerOne);
        gameboard.getGameboard();
        if(gameboard.checkWinner(playerOne)){
            endGame = true;
            return;
        };

        console.log("----- || Player Two's Turn  || -----");
        gameboard.updateGameBoard(playerTwo.getPlayerRowChoice(), playerTwo.getPlayerColChoice(), playerTwo);
        gameboard.getGameboard();
        if(gameboard.checkWinner(playerTwo)){
            endGame = true;
            return;
        };
    }

}

return {startGame}

};

const game = gameController();
game.startGame();
console.log("end of program")


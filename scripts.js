

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

        return gameboard;
    };

    const updateGameBoard = (row, column, player) =>{
        console.log("inside Update board. Row is" + row + "Col is" + column);
        row -= 1;
        column -= 1;

        if (gameboard[row][column] === 'x' || gameboard[row][column] === 'o') {
            console.log("That Spot is already taken. Please Try again.");
            return;
        } else { 
            gameboard[row][column] = player.getPlayerSymbol();
        }
    
    };

    const checkWinner = () => {
        let gameOver = false;

        if(gameboard[0][0] === gameboard[1][0] && gameboard[1][0] === gameboard[2][0]){
            console.log("WINNER! GAME OVER");
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
    
    //ask for player name
    let playerOne = player();
    playerOne.createPlayer("Jim");
    
    let playerTwo = player();
    playerTwo.createPlayer("Ashley");

    //start game
    while (!gameboard.checkWinner()){
        console.log("----- || Player One's Turn  || -----");
        gameboard.updateGameBoard(playerOne.getPlayerRowChoice(), playerOne.getPlayerColChoice(), playerOne);
        console.log(gameboard.getGameboard());
        gameboard.checkWinner();

        console.log("----- || Player Two's Turn  || -----");
        gameboard.updateGameBoard(playerTwo.getPlayerRowChoice(), playerTwo.getPlayerColChoice(), playerTwo);
        console.log(gameboard.getGameboard());
        gameboard.checkWinner();
    }

}

return {startGame}

};

const game = gameController();
game.startGame();



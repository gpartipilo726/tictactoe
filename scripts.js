

//manages the state of the gameboard
const Gameboard = function () {
    let turn = 1;
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

    const updateGameBoard = (selectedSquare, player) =>{
        const row = selectedSquare.getAttribute("gridrow");
        const column = selectedSquare.getAttribute("gridcol");

        if (selectedSquare.innerHTML === 'X' || selectedSquare.innerHTML === 'O') {
            console.log("That Spot is already taken. Please Try again.");
            return false;
        } else { 
            gameboard[row][column] = player.getPlayerSymbol();
            selectedSquare.innerHTML = player.getPlayerSymbol();
        }
    
    };

    const checkWinner = (player, messageDiv) => {
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
            messageDiv.innerHTML = `${player.getPlayerName()} is the Winner!`;
            return gameOver = true;
        } else {
            return gameOver;
        }
    };

    const getTurn = () => {
        const messageDesc = document.querySelector("#message");

        turn++;
        if (turn % 2 === 0){
            messageDesc.innerHTML =`${playerOne.getPlayerName()}'s Turn!`;
            return 2;
        } else {
            messageDesc.innerHTML =`${playerTwo.getPlayerName()}'s Turn!`;
            return 1;
        };


    }

    const resetGameboard = () => {

    };


    return {getGameboard, updateGameBoard, checkWinner, getTurn, resetGameboard}

};

//manages players
const player = function () {
    let playerSymbol;
    let playerName;

    const createPlayer = (name, symbol) => {
        playerName = name;
        setPlayerSymbol(symbol);
    }
    
    const setPlayerSymbol = (symbol) => {
        playerSymbol = symbol
        }

    const setPlayerChoice = (choice) =>{

    }

    const getPlayerName = () =>{
        return playerName;           
    }

    const getPlayerSymbol = () =>{
        return playerSymbol;
    }
    
    return {createPlayer, getPlayerName, getPlayerSymbol, setPlayerChoice};

};


//controls the flow of the game
const gameController = function (){
    const playerOneName = document.querySelector("#playerOne");
    const playerOneSymbol = document.querySelector("#playerOneSymbol");
    const playerTwoName = document.querySelector("#playerTwo");
    const playerTwoSymbol = document.querySelector("#playerTwoSymbol");
    const startBtn = document.querySelector("#startgame");

const updateDropdown = () => {

    // Get the selected value from the first dropdown
    const playerOneSel = playerOneSymbol.value;
    const playerTwoSel = playerTwoSymbol.value;


    // Enable all options in the second dropdown first
    Array.from(playerTwoSymbol.options).forEach(option => {
        option.disabled = false;
    });

    Array.from(playerOneSymbol.options).forEach(option => {
        option.disabled = false;
    });

    // Disable the selected option in the second dropdown if it's not empty
    if (playerOneSel) {
        playerTwoSymbol.querySelector(`option[value="${playerOneSel}"]`).disabled = true;
    } else if (playerTwoSel) {
        playerOneSymbol.querySelector(`option[value="${playerTwoSel}"]`).disabled = true;
    }

};    

const getPlayerDetails = () =>{


    startBtn.addEventListener("click", (e) =>{
        e.preventDefault();
        console.log("Player One Name: " + playerOneName.value);
        console.log("Player One Symbol: " + playerOneSymbol.value);
        console.log("Player Two Name: " + playerTwoName.value);
        console.log("Player Two Symbol: " + playerTwoSymbol.value);
        
        playerOne = player();
        playerOne.createPlayer(playerOneName.value, playerOneSymbol.value);

        playerTwo = player();
        playerTwo.createPlayer(playerTwoName.value, playerTwoSymbol.value);


        startGame(playerOne, playerTwo);

    });

}

const startGame = (playerOne, playerTwo) => {
    let gameboard = Gameboard();
    let endGame = false;
    const messageDesc = document.querySelector("#message");
    const gameboardDiv = document.querySelector(".gameboard");
    let turn = gameboard.getTurn();

    messageDesc.innerHTML =`${playerOne.getPlayerName()}'s Turn!`;

    gameboardDiv.addEventListener("click", (e) => {
        selectedSquare = e.target.closest(".grid-body");
        let turn = gameboard.getTurn();


        if(turn === 1){
            gameboard.updateGameBoard(selectedSquare, playerOne);
            if(gameboard.checkWinner(playerOne, messageDesc)){
                gameboardDiv.removeEventListener("click", ()=>{
                    console.log("event removed from gameboard")
                });
            };

            console.log("inside player one if statement");
        } else {
            gameboard.updateGameBoard(selectedSquare, playerTwo);
            if(gameboard.checkWinner(playerTwo, messageDesc)){
                gameboardDiv.removeEventListener("click", ()=>{
                    console.log("event removed from gameboard")
                });

            };
        }
        console.log("still inside evetn listener")

        
     
    });

    //messageDesc.innerHTML =`${playerTwo.getPlayerName()}'s Turn!`;
    // gameboardDiv.addEventListener("click", (e) => {
    //     selectedSquare = e.target.closest(".grid-body");
    //     gameboard.updateGameBoard(selectedSquare, playerTwo);
    //     console.log(selectedSquare);
    //     return;

    // });

    console.log("moving on after gameboard clicked");

    //start game
    //const PlayerOneChoice = playerOne.getPlayerChoice();
    //gameboard.updateGameBoard(PlayerOneChoice, playerOne);
    //gameboard.checkWinner(playerOne);

    //const PlayerTwoChoice = playerTwo.getPlayerChoice();
    //gameboard.updateGameBoard(PlayerTwoChoice, playerTwo);
    //gameboard.checkWinner(playerTwo);


    //gameboard.updateGameBoard(playerOne.getPlayerRowChoice(), playerOne.getPlayerColChoice(), playerOne);
    // gameboard.getGameboard();
    // if(gameboard.checkWinner(playerOne)){
    //     endGame = true;
    //     return;
    // };

    // messageDesc.innerHTML =`${playerTwo.getPlayerName()}'s Turn`
    // gameboard.updateGameBoard(playerTwo.getPlayerRowChoice(), playerTwo.getPlayerColChoice(), playerTwo);
    // gameboard.getGameboard();
    // if(gameboard.checkWinner(playerTwo)){
    //     endGame = true;
    //     return;
    // };


}

return {startGame, getPlayerDetails, updateDropdown}

};

const game = gameController();
game.getPlayerDetails();
console.log("end of program")


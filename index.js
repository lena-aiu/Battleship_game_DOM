
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//*We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 
//*using the id property 'board_player2' -> it is the second list (ul) in your index.html file

//*First ask the players for their names (use propmt)

//Now each time the turn player clicks on any cell of the opponent's board 
//(you have to verify if the player is clicking the right board) 
//the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship

//We want you to store the data of each player in two Player objects. 
//Each object has to store: name, remaining boats, and their respective board.

//*Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. 
//*Numbers 1 are representing the 4 positions of the player's ships

//*Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. 

//And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'

//*in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. 
//*We want to see the information of each player in the respective elements

//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first

//*one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. 
//*the reset button has to start the game again and the new game create a new game with new players and a new random board.

// Create Players
var shipNum = "4";

let playerOne = {
  name: prompt("playerOne - What is your first name?"),
  shipCount: parseInt(shipNum),
  gameBoard: [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
}

let playerTwo = {
  name: prompt("playerTwo - What is your first name?"),
  shipCount: parseInt(shipNum),
  gameBoard: [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
}

// Define name for player, boardPlayer and ships 
const namePlayer1 = document.getElementById('name_player1');
const namePlayer2 = document.getElementById('name_player2');
const lives1 = document.getElementById('ships_player1');
const lives2 = document.getElementById('ships_player2');
const board_Player1 = document.getElementById('board_player1');
const board_Player2 = document.getElementById('board_player2');
namePlayer1.textContent = playerOne.name;
namePlayer2.textContent = playerTwo.name;
lives1.innerHTML = parseInt(shipNum);
lives2.innerHTML = parseInt(shipNum);

// Create buttons 
const buttons = document.getElementById('buttons');
const resertButton = document.createElement('button');
const newGameButton = document.createElement('button');
resertButton.innerHTML = 'Resert';
newGameButton.innerHTML = 'New game';

//add new element to their parents
buttons.appendChild(resertButton);
buttons.appendChild(newGameButton);

// Create turn player 
const turnPlayer = document.getElementById('turn_player');

// Function adding ships on the board (console)

const addShips = (player) => {
  for (var i = 0; i < shipNum; i++) {
    let xCoordinate = Math.floor( Math.random() * (3 - 0 + 1) + 0);
    let yCoordinate = Math.floor( Math.random() * (3 - 0 + 1) + 0);
    console.log (xCoordinate, yCoordinate);
    if (player.gameBoard[xCoordinate][yCoordinate] === 0) {
      player.gameBoard[xCoordinate][yCoordinate] = 1;
    } 
  }
}

addShips(playerOne);
console.log (JSON.stringify(playerOne.gameBoard));
addShips(playerTwo);
console.log (JSON.stringify(playerTwo.gameBoard));
console.log(playerOne, playerTwo);

// Start the Game Play
// Define the begginer

let currentPlayer = playerOne;
let opponent = playerTwo;
let activeBoard;
let inactiveBoard;

// Function to choose the begginer
function choiceBegginer () {
  let choice = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    if (choice === 1) {
        currentPlayer = playerOne;
        opponent = playerTwo;
        activeBoard = board_Player2;
        inactiveBoard = board_Player1;
        lives1.innerHTML = currentPlayer.shipCount;
        lives2.innerHTML = opponent.shipCount;
    } else if (choice !== 1) {
        currentPlayer = playerTwo;
        opponent = playerOne;
        activeBoard = board_Player1;
        inactiveBoard = board_Player2;
        lives2.innerHTML = currentPlayer.shipCount;
        lives1.innerHTML = opponent.shipCount;
    }
    turnPlayer.textContent = currentPlayer.name;
}
choiceBegginer();

// Function for the Game on the board
let continueGame;
let message;

const battleship = (player) =>{

  for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = player.gameBoard[x][y];//state of the cell

      //this function adds the click event to each cell
      cell.addEventListener('click', (e) => {
        if(activeBoard.contains(cell)) {
       // change players and boards
        [currentPlayer, opponent] = [opponent, currentPlayer];
        [activeBoard, inactiveBoard] = [inactiveBoard, activeBoard];

          turnPlayer.textContent = currentPlayer.name;
          // set the element clicked
          let cell = e.target; 

          if (cell.value === 1) {
            //condition for hit
            alert("Hit!");
            cell.style.background = "red";
            cell.textContent = "ship!";
            //opponent.shipCount--;
            currentPlayer.shipCount--;
            if (playerOne === opponent) {
              //update of shipcount label content after hit
              lives2.innerHTML -= 1;
            } else {
              lives1.innerHTML -= 1;
            }
          } else if (cell.value === 0) {
            //condition for the failure
            cell.style.background = "purple";
            //cell.style.visibility = "hidden";
            cell.textContent = "no ship!";
            alert("Miss!!");

            // confirm the continue of game    
            continueGame = confirm("Would you like to continue?");
            if (!continueGame) {
            alert (`Stop Game by ${opponent.name}`);
            }
          }
          if (currentPlayer.shipCount === 0) {
            message = opponent.name;
            alert(`Congratulations ${message}!! you win`);
            console.log(`Congratulations ${message}!! you win`);
          }
        }
        console.log(currentPlayer, opponent);
      });
      li.appendChild(cell); //adding each cell into the row number x
    }
  //adding each row into the board
    if (player === playerOne) {
      board_player1.appendChild(li);
    } else if (player === playerTwo) {
      board_player2.appendChild(li);
    }
  }
}

battleship(playerOne);
battleship(playerTwo);

// Function for Reset and New Game

buttons.addEventListener('click', (e) => {
  var shipNum = "4";
  playerOne.shipCount = parseInt(shipNum);
  playerTwo.shipCount = parseInt(shipNum);
  playerOne.gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  playerTwo.gameBoard = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    console.log("Check");
    if (button.textContent === 'New game') {
      window.location.reload();
      console.log("New Game");
      alert("New players!");
    } else if (button.textContent === 'Resert') {
      // use the same name
      console.log("Resert");
      alert("The same players!");
      //clear content of elements
      board_Player1.innerHTML = "";
      board_Player2.innerHTML = "";
      //reset adding ships on the board
      addShips(playerOne);
      console.log (JSON.stringify(playerOne.gameBoard));
      addShips(playerTwo);
      console.log (JSON.stringify(playerTwo.gameBoard));
      //set new game flow
      choiceBegginer();
      battleship(playerOne);
      battleship(playerTwo);
      //set live's number
      lives1.innerHTML = playerOne.shipCount;
      lives2.innerHTML = playerTwo.shipCount; 

      // show info in objects : PlayerOne and PlayerTwo
      console.log(playerOne, playerTwo);
    }
  }
}); 
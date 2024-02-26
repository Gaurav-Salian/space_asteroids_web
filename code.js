// ------------------------SPACE INVADERS GAME----------------------------------

// get HTML elements
const ship = document.getElementById("ship");
const gameContainer = document.getElementById("game-container");
const startButton = document.getElementById("start-button");

// default values
let isGameStarted= false;
let isGameOver= false;


//  When start button is pressed
function startGame(){
    if(!isGameStarted){
        isGameStarted=true;
        startButton.style.display='none';

        const intervalId= (createEnemy,1000) // Create enemy every 1 sec





        function createEnemy(){
            if(!isGameOver){
                const enemy = document.createElement('div')
            }
        }



    }
}


startButton.addEventListener('click', () => {
    startGame();
  });
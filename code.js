// ------------------------SPACE INVADERS GAME----------------------------------

// get HTML elements
const ship = document.getElementById("ship");
const gameContainer = document.getElementById("game-container");
const startButton = document.getElementById("start-button");
const scoreElement = document.getElementById('score');

// default values
let isGameStarted= false;
let isGameOver= false;
var score = 0;
let playerName;

ship.style.left = `${(gameContainer.offsetWidth - ship.offsetWidth) / 2}px`;//ship at start


//  When start button is pressed
function startGame(){
    if(!isGameStarted){
        // playerName = prompt("please,enter your name")
        isGameStarted=true;

        const startMusic = new Audio('music/spaceinvaders1.mp3');
        startMusic.play()
        startButton.style.display='none';



        const intervalIdEnemy1 = setInterval(() => createEnemy('enemy1',3) ,1000); // Create enemy every 1 sec
        const intervalIdEnemy2 = setInterval(() => createEnemy('enemy2',2) ,3000); // Create enemy every 3 sec
        const intervalIdEnemy3 = setInterval(() => createEnemy('enemy3',1) ,5000); // Create enemy every 5 sec


        document.addEventListener('keydown', (event)=>{
            if(!isGameOver && event.key === 'ArrowUp'){
                const shootMusic = new Audio('music/shoot.wav');
                shootMusic.play()
                shoot();
            }

            if(!isGameOver && event.key==='ArrowLeft'){
                moveShip('left')
            }

            if(!isGameOver && event.key==='ArrowRight'){
                moveShip('right')
            }
        });

        function stopGame(){
            isGameOver = true;
            const deathMusic = new Audio('music/explosion.wav');
            deathMusic.play();
            startMusic.pause();
            //  insertHighScore(playerName, score);
            clearInterval(intervalIdEnemy1);
            clearInterval(intervalIdEnemy2);
            clearInterval(intervalIdEnemy3);
            setTimeout(() => {
            alert(`GAME OVER! \nYOUR SCORE IS: ${score} \n DO SHARE FEEDBACKS WITH ME! \n \t a game by GAURAV`);
            location.reload(); // Reload page [new game]            
            },1000)
        }

        

        startButton.addEventListener('click', () => {
            startGame();
        });

       
        function createEnemy(className, bounty) {
            if(!isGameOver){
                const enemy = createEnemyElement(className);
                enemy.dataset.bounty = bounty;  // Set the bounty for this enemy
                moveEnemy(enemy);
            }
        }

        function createEnemyElement(className){
            const enemy = document.createElement('div');
            enemy.classList.add('enemy',className);
                // enemy spawn position
            enemy.style.left = `${Math.random() * (gameContainer.offsetWidth - 20)}px`;
            gameContainer.appendChild(enemy);
            return enemy;
        }
        function moveEnemy(enemy){
            const moveEnemyFunction = () =>{
                if(!isGameOver){
                    const currentTop = parseInt(enemy.style.top) ||0
                    const newTop = currentTop + 2;

                    
                    if (newTop > gameContainer.offsetHeight) {
                        enemy.style.top = '0px';  // Reset enemy position to the top
                        enemy.style.left = `${Math.random() * (gameContainer.offsetWidth - 20)}px`;  // Reset enemy horizontal position
                      } else {
                        enemy.style.top = `${newTop}px`;
                      }

                    if(checkCollision(ship,enemy)) {
                        
                        stopGame()
                    }

                    requestAnimationFrame(moveEnemyFunction);
                }
            };

            requestAnimationFrame(moveEnemyFunction);
        }
    }
}


    



function updateScore(destroyedEnemy) {
    const enemyBounty = parseInt(destroyedEnemy.dataset.bounty, 10);

    // Increment the overall score
    score += enemyBounty;

    // Update the score display on the UI
    scoreElement.textContent = score;

    // Check for enemy destruction based on hits
    if (score % 200 === 0) { // 2 hits (enemy2)
        destroyEnemy('enemy2');
    } else if (score % 300 === 0) { // 3 hits (enemy3)
        destroyEnemy('enemy3');
    }
}


function destroyEnemy(enemyClass) {
    const enemy = document.querySelector(`.${enemyClass}`);
    if (enemy) {
        enemy.remove();
    }
}


function checkCollision(element1,element2, distance= 30){
    const rect1= element1.getBoundingClientRect()
    const rect2= element2.getBoundingClientRect()

     // Calculate the center points of the rectangles
  const center1 = {
    x: rect1.left + rect1.width / 2,
    y: rect1.top + rect1.height / 2,
  };

  const center2 = {
    x: rect2.left + rect2.width / 2,
    y: rect2.top + rect2.height / 2,
  };
    // Calculate the distance between the centers
    const d  = Math.sqrt(Math.pow(center1.x - center2.x, 2) + Math.pow(center1.y - center2.y, 2));
    // Check for collision with distance threshold
    return (
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top &&
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        d  <= distance
      );
}




function shoot(){
    if(!isGameOver){
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left=`${parseInt(ship.style.left) + ship.offsetWidth / 2}px`;
        bullet.style.bottom= `${parseInt(ship.style.bottom) + 20}px`;
        gameContainer.appendChild(bullet);

        const moveBullet = () => {
            if(!isGameOver) {
                const currentBottom = parseInt(bullet.style.bottom) ||0;
                bullet.style.bottom = `${currentBottom + 5}px`;

                const enemies = document.querySelectorAll('.enemy');
                enemies.forEach((enemy) => {
                    if (checkCollision(bullet,enemy)){
                        const killMusic = new Audio('music/invaderkilled.wav');
                        killMusic.play()
                        enemy.remove();
                        bullet.remove();
                        // Increment the score when a bullet hits an enemy
                        updateScore(enemy)

                    }
                });

                if (currentBottom> gameContainer.offsetHeight) {
                    bullet.remove();
                }

                requestAnimationFrame(moveBullet);
            }

        };

        requestAnimationFrame(moveBullet);

    }
}


function moveShip(direction){
    const currentLeft = parseInt(ship.style.left) || 0; //ship direction
    const step = 10; //ship movement speed
    
    if (direction ==='left'){
        ship.style.left =`${Math.max(0, currentLeft - step)}px`
    } else if(direction ==='right') {
        ship.style.left=`${Math.min(gameContainer.offsetWidth - ship.offsetWidth, currentLeft + step)}px`
    }
}

startButton.addEventListener('click', () => {
    startGame();
  });

// ---------MOBILE GAME-----

// Get control buttons
const leftArrowButton = document.getElementById('left-arrow');
const centerCircleButton = document.getElementById('center-circle');
const rightArrowButton = document.getElementById('right-arrow');

leftArrowButton.addEventListener('click', () => {
  moveShip('left');
});

rightArrowButton.addEventListener('click', () => {
  moveShip('right');
});

centerCircleButton.addEventListener('click', () => {
  shoot();
});



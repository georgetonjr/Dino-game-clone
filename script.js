const dino = document.querySelector(".dino");
const background = document.querySelector(".background");
const score = document.querySelector(".score");

let gameOver = false;
let pontuacao = 0;
let speed = 20;
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32 || event.keyCode === 38) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + "px";
        }
      }, 20);
    } else {
    }

    position += 20;

    dino.style.bottom = position + "px";
  }, 20);
}

function createCactus() {
  const cactus = document.createElement("div");

  let cactusPosition = 1000;

  let randomTime = Math.random() * 6000;

  cactus.classList.add("cactus");
  cactus.style.left = 1000 + "px";
  background.appendChild(cactus);

  //-----------------------------------------------
  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      gameOver = true;
      document.body.innerHTML = `<h1 class='game-over'>Fim de jogo!!</h1>  
      <h2 class='score'>Score: ${pontuacao}</h2>
      <button class='playAgain' onclick="playAgain()">Play again</button>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + "px";
      if (!gameOver) {
        addScore();
      }
    }
  }, speed);

  setTimeout(createCactus, randomTime);
}

function addScore() {
  pontuacao += 1; //soma mais há pontuação a cada passa do
  speed -= 0.001; //aumenta a velocidade conforme o score aumenta

  score.innerHTML = `Score: ${pontuacao}`;
}

function playAgain() {
  location.reload();
}

createCactus();
document.addEventListener("keyup", handleKeyUp);

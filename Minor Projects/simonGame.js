let startGame = document.querySelector(".btn_start");
let gameStart = false;
let gameLvl = 0;
let gameBox = ['blue', 'green', 'red', 'yellow'];

let newGameSeq = [];
let gameSeq = [3,2,4,3,1,4,2,1,4,3];
let userSeq = [];

function generatePattern(lvl) {
    let playSeq = [];
    for(let i=0; i<lvl; i++) {
        playSeq.push(gameSeq[i]);
    }
    return playSeq;
}

function flashBox(pattern) {
    for(let i=0; i<pattern.length; i++) {
        let itemColor = gameBox[pattern[i] -1]
        let flashItem = document.querySelector(`.${itemColor}`);

        setTimeout(() => {
            flashItem.classList.add("flash");
            console.log(flashItem.classList);
            setTimeout(() => {
                flashItem.classList.remove("flash");
            }, 250);
        }, i* 1000)
    }
}

function userFlash(btn) {
    btn.classList.add('flash');
    setTimeout(() => {
        btn.classList.remove('flash');
    },100)
}

function levelUp() {
    gameLvl++;
    userSeq = [];
    newGameSeq = [];

    if(gameLvl > 10) {
        alert('Congratulations, You won!');
        resetGame();
    } else {
        let lvlName = document.querySelector('h3');
        lvlName.innerText = `Level ${gameLvl}`;
        for(let i=0; i<gameLvl; i++) {
            newGameSeq.push(gameSeq[i]);
        }
    
        let pattern = generatePattern(gameLvl);
        setTimeout(() => {
            flashBox(pattern);
        }, 1000);
    }

}

function resetGame() {
    gameStart = false;
    startGame.disabled = false;
    gameLvl = 0;
}

function checkSeq(idx) {
    console.log(userSeq);
    console.log(newGameSeq);
    if(userSeq[idx] === newGameSeq[idx]) {
        console.log("Correct!");

        if(userSeq.length == newGameSeq.length) {
            levelUp();
        }
    } else {
        let heading = document.querySelector('h3');
        heading.innerText = 'Game Over, click "Start Game" to play again!';
        let screen = document.querySelector('body');
        screen.classList.add('error_flash');
        setTimeout( () => {
            screen.classList.remove('error_flash');
        }, 200)
        resetGame();
    }
}

function btnPress() {
    let btn = this;

    console.log(this);
    userFlash(btn);
    let userColor = parseInt(btn.getAttribute('id'));
    userSeq.push(userColor);

    checkSeq(userSeq.length-1);
}

let allBox = document.querySelectorAll('.box');
for(box of allBox) {
    box.addEventListener('click', btnPress);
}

startGame.addEventListener('click', () => {
    if(gameStart == false) {
        console.log("game started");
        gameStart = true;
        startGame.disabled = true;

        levelUp();

    }
});
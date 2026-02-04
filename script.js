"use script";
const btn_new = document.querySelector(".btn--new");
const btn_hold = document.querySelector(".btn--hold");
const btn_roll = document.querySelector(".btn--roll");
const dice = document.querySelector(".dice");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
let playing = true;

let scores, activePlayer;

function init () {
    playing = true;
    dice.classList.add("hidden");
    scores = [0,0]; 
    activePlayer = 0;

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');

    document.getElementById("current--0").textContent = 0;
    document.getElementById("current--1").textContent = 0;

    document.getElementById("score--0").textContent = 0;
    document.getElementById("score--1").textContent = 0;
};

function switchPlayer() {
    document.querySelector(`.player--${activePlayer}`).classList
        .toggle("player--active");
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 1? 0: 1;
    document.querySelector(`.player--${activePlayer}`).classList
        .toggle("player--active");  

}

btn_roll.addEventListener("click", 
    function(){
        if (playing){
            let dice_rng = Math.trunc(Math.random() * 6) + 1;

            let currentScoreElement = document.getElementById(`current--${activePlayer}`)
            let currentScore = Number(currentScoreElement.textContent);

            dice.classList.remove("hidden");
            dice.src =  `dice-${dice_rng}.png`;

            if(dice_rng === 1){
                switchPlayer();
                return;
            }
            currentScore += dice_rng;
            currentScoreElement.textContent = currentScore;
        }
    }
)

btn_hold.addEventListener("click", 
    function () {
        if (playing) {
            let currentScore = Number(document.getElementById(`current--${activePlayer}`)
                .textContent);
            scores[activePlayer] += currentScore
            let scoreElement = document.getElementById(`score--${activePlayer}`)
            scoreElement.textContent = scores[activePlayer];
            if (Number(scoreElement.textContent) >= 20 ){
                let winner = document.querySelector(`.player--${activePlayer}`);
                winner.classList.add("player--winner");
                playing = false;
                return;
            }
            switchPlayer();
        }
    }
 )


btn_new.addEventListener("click", init);

init();
function isPlayer1Active(){
    return !p1.classList.contains("not-active") ? true : false;
}

function disableButtons(){
    btn_hold.disabled = true;
    btn_rollDice.disabled = true;
    btn_hold.classList.add("btn-disable");
    btn_rollDice.classList.add("btn-disable");
}

function enableButtons(){
    btn_hold.disabled = false;
    btn_rollDice.disabled = false;
    btn_hold.classList.remove("btn-disable");
    btn_rollDice.classList.remove("btn-disable");
}

function addTotalScore(){
    // If player 1 is active
    if(isPlayer1Active()){
        p1_totalScore.textContent = parseInt(p1_totalScore.textContent) + parseInt(p1_score.textContent);
    }
    //If player 2 is active
    else{
        p2_totalScore.textContent = parseInt(p2_totalScore.textContent) + parseInt(p2_score.textContent);
    }

}

function addCurrentScore(randomNumber){
    // If player 1 is active
    if(isPlayer1Active()){
        p1_score.textContent = parseInt(p1_score.textContent) + randomNumber;
    }
    //If player 2 is active
    else{
        p2_score.textContent = parseInt(p2_score.textContent) + randomNumber;
    }
}

function isThereAWinner(){
    // If player 1 is active have reached the score limit
    if((isPlayer1Active()) && (parseInt(p1_totalScore.textContent) >= 30)){
        p1_title.textContent = "Player 1 Wins! 🎉";
        disableButtons();
        return true;
    }
    // If player 2 is active and have reached the score limit
    else if(parseInt(p2_totalScore.textContent) >= 30){
        p2_title.textContent = "Player 2 Wins! 🎉";
        disableButtons();
        return true;
    }

    return false;
}

function resetScore(){
    // If player 1 is active
    if(isPlayer1Active()){
        p1_score.textContent = "0";
    }
    //If player 2 is active
    else{
        p2_score.textContent = "0";
    }
}

function switchPlayer(){
    p1.classList.toggle("not-active");
    p2.classList.toggle("not-active");
}

function displayDiceImage(randomNumber){
    currentDiceImage.src = "img/dice-" + randomNumber + ".png";
}

function rollDice(){
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    displayDiceImage(randomNumber);
    
    if(randomNumber === 1){
        resetScore();
        disableButtons();
        setTimeout(function(){
            enableButtons();
            switchPlayer();
        }, 2000);
    }
    else{
        addCurrentScore(randomNumber);
    }
    
}

function hold(){
    addTotalScore();
    resetScore();
    if(!isThereAWinner()){ switchPlayer(); }
}

function newGame(){
    p1_title.textContent = "Player 1";
    p2_title.textContent = "Player 2";
    p1_totalScore.textContent = "0";
    p2_totalScore.textContent = "0";
    p1_score.textContent = "0";
    p2_score.textContent = "0";
    currentDiceImage.src = "img/dice-1.png";
    switchPlayer();
    enableButtons();
}

const p1_title = document.querySelector("#playerTitle-1");
const p2_title = document.querySelector("#playerTitle-2");

const p1_totalScore = document.querySelector("#total-score-1");
const p2_totalScore = document.querySelector("#total-score-2");

const p1_score = document.querySelector("#score-1");
const p2_score = document.querySelector("#score-2");

const btn_newGame = document.querySelector("#btn-newGame");
const btn_rollDice = document.querySelector("#btn-rollDice");
const btn_hold = document.querySelector("#btn-hold");

const currentDiceImage = document.querySelector("#currentDiceImage");

const p1 = document.querySelector("#player1");
const p2 = document.querySelector("#player2");

p2.classList.add("not-active");

btn_rollDice.addEventListener("click", rollDice);

btn_hold.addEventListener("click", hold);

btn_newGame.addEventListener("click", newGame);

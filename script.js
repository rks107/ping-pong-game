//---- get tag to show info
var showWinnerInfo = document.getElementById('info');

//---- variable initialize
var playerOneScore = 0;
var playerTwoScore = 1;
var speed = 10;
var isGameStarted = false;
var t = document.getElementById('top-handle');
var b = document.getElementById('bottom-handle');
var ball = document.getElementById('ball');
var w = window.innerWidth;
var h = window.innerHeight;

//---- onloand
window.onload = function(){
    if(localStorage.player === undefined){
         this.localStorage.setItem("score", "0");
    }
    else{
        alert(localStorage.player + " has a maximum score of " + localStorage.score);
    }
    updateHandles();
}


window.addEventListener("resize", updateHandles);
function updateHandles(){
    speed = Math.floor(w/25);
    t.style.width = "250px";
    t.style.left = (w/2 - 100) + "px";
    b.style.width = "250px";
    b.style.left = (w/2 - 100) + "px";
    ball.style.width = "20px";
    ball.style.left = (w/2 - 10) + "px";
    ball.style.top = h - 44 + "px";
}

//---- strat game
window.addEventListener("keydown", onKeyDown, true);
function onKeyDown(event){
    console.log(event.keyCode);
    if(event.keyCode == 13 && isGameStarted == false){
        startGame();
        isGameStarted = true;
    }
    if(isGameStarted){
	    if(event.keyCode ==65 || event.keyCode == 37 ){
       		moveHandlesLeft();
    	}
    	else if(event.keyCode == 68 || event.keyCode == 39){
         	moveHandlesRight();	  
    	}
    }
}

//---- handle left control 
function moveHandlesLeft(){
    console.log("move handles to left " + t.style.left);
    let left = formatVal(t.style.left);
    if(left - speed > 0){
        t.style.left = left - speed + "px";
        b.style.left = left - speed + "px";
    }
    else if(left > 0){
        t.style.left = "0px";
        b.style.left = "0px";
    }
}

//---- handle right control
function moveHandlesRight(){
    console.log("move handles to right " + t.style.left); 
    let left = formatVal(t.style.left);
    if(left + speed < w - 200){
        t.style.left = left + speed + "px";
        b.style.left = left + speed + "px";
    }
    else if(left < w - 200){
        t.style.left = left + (w - 200 - left) + "px";
        b.style.left = left + (w - 200 - left) + "px";
    }
}

var speedX = 2;
var speedY = -3;
var ballSpeed = 10;

//---- update ball pos
function updateBallPos(){
    ball.style.left = formatVal(ball.style.left) + speedX + "px";
    ball.style.top = formatVal(ball.style.top) + speedY + "px";
}

//---- handle ball movement
function moveBall(){
    updateBallPos();
    let top = formatVal(ball.style.top);
    if(top < 10 || top > h-24){
        clearInterval(interval);
        endGame();
    }
    else{
        if(top <= 24 && 
            formatVal(ball.style.left) > formatVal(t.style.left) &&
            formatVal(ball.style.left) < formatVal(t.style.left) + 200){
                speedY *= -1;
                playerOneScore++;
        }
        if(top >= h-44 &&
            formatVal(ball.style.left) > formatVal(b.style.left) &&
            formatVal(ball.style.left) < formatVal(b.style.left) + 200){
                speedY *= -1;
                playerTwoScore++;
        }
    }

    let left = formatVal(ball.style.left);
    if(left <= 5 || left >= w - 25){
        speedX *= -1;
    }
}

//---- start game
function startGame(){
    document.getElementById("info").style.display = "none";
    interval = setInterval(function(){
        moveBall();
    }, ballSpeed)
}
//---- end game
function endGame(){
    isGameStarted = false;
    localStorage.setItem("score", Math.max(playerOneScore, playerTwoScore, localStorage.getItem("score")));
    if(playerOneScore > playerTwoScore){
       

        showWinnerInfo.innerHTML=`
                        <div id="show-winner-info">
                            <h1>${playerOneScore}:${playerTwoScore}</h2>
                            <h2>Player 1 Wins</h3>
                            <h2>Press Enter to restart Game</h2>
                            <h3>Max Score: ${localStorage.getItem("score")}</h4>
                        </div>
                    `;
    }
    else if(playerTwoScore > playerOneScore){

        showWinnerInfo.innerHTML=`
                        <div id="show-winner-info">
                            <h1>${playerOneScore}:${playerTwoScore}</h2>
                            <h2>Player 2 Wins</h3>
                            <h2>Press Enter to restart Game</h2>
                            <h3>Max Score: ${localStorage.getItem("score")}</h4>
                        </div>
                    `;
    }
    else{
        showWinnerInfo.innerHTML=`
                        <div id="show-winner-info">
                            <h1>${playerOneScore}:${playerTwoScore}</h2>
                            <h2>Tie</h3>
                            <h2>Press Enter to restart Game</h2>
                            <h3>Max Score: ${localStorage.getItem("score")}</h4>
                        </div>
                    `;
    }
    if(localStorage.getItem("player") === undefined || (Math.max(playerOneScore, playerTwoScore) > localStorage.getItem("score"))){
        if(playerOneScore > playerTwoScore){
            localStorage.setItem("player", "Player 1");
        }
        else{
            localStorage.setItem("player", "Player 2");
        }
    }
    resetGame();
}

function resetGame(){
    playerOneScore = 0;
    playerTwoScore = 1;
    speedX = 2;
	speedY = -3;
    updateHandles();
    document.getElementById("info").style.display = "block";
}

function formatVal(val){
    return Number(val.replace("px", ""));
}
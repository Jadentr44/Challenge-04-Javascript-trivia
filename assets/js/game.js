// global varaibales
let questions = []

let timerDisplay = document.querySelector("#timer")


//queryselectors
document.querySelector("#startButton").addEventListener("click", playGame)


//functions
function playGame(){
  let secondsLeft = 5;
  displayGame()
  let timer = setInterval(function(){
    secondsLeft--;
    timerDisplay.textContent = secondsLeft
    console.log(secondsLeft)
    if(secondsLeft == 0){
      clearInterval(timer)
      stopGame()
    }
  },1000)
}

function displayGame(){}
function stopGame(){}
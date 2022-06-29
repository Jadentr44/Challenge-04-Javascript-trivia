// global varaibales
let questions = [
  {question:"What HTML element do we put the JavaSript in?",
  options:["<javascript>","<js>","<script>","<scripting>"],
  answer:"<script>"}
]

let buttonsDiv = document.querySelector("#buttons")

let timerDisplay = document.querySelector("#timer")
let mess


//queryselectors
document.querySelector("#startButton").addEventListener("click", playGame)


//functions
function playGame(){
  let secondsLeft = 5;
  newQuestion()
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

function newQuestion(){

  buttonsDiv.innerHTML = "";
  let randomIndex = Math.floor(Math.random() * questions.length);
  questions[randomIndex].options.forEach(e =>{
    let button = document.createElement("button")
    button.textContent = e
    buttonsDiv.appendChild(button)
  })
}
function stopGame(){}
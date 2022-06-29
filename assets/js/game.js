// global varaibales
let questions = [
  {question:"What HTML element do we put the JavaSript in?",
  options:["<javascript>","<js>","<script>","<scripting>"],
  answer:"<script>"}
]

let buttonsDiv = document.querySelector("#buttons")

let timerDisplay = document.querySelector("#timer")
let messageDisplay = document.querySelector("#message")


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
  let randomIndex = Math.floor(Math.random() * questions.length);
  messageDisplay.textContent =  questions[randomIndex].question
  buttonsDiv.innerHTML = "";
  
  questions[randomIndex].options.forEach(e =>{
    let Ebutton = document.createElement("button")
    Ebutton.textContent = e
    Ebutton.style.margin = "2vh 0"
    buttonsDiv.appendChild(Ebutton)
  })
}
function stopGame(){}
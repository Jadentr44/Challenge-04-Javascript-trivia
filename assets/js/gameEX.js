// global varaibales
let questions = [
  {question:"What HTML element do we put the JavaSript in?",
  options:["<javascript>","<js>","<script>","<scripting>"],
  answer:"<script>"},
  {question:`What is the correct syntax for referring to an external script called "xxx.js"?`,
  options:[`<script name="xxx.js">`,`<script src="xxx.js">  `,`<script href="xxx.js">`,],
  answer:"<script>"},
]

let buttonsDiv = $("#buttons")
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
function stopGame(){
  messageDisplay.innerHTML = "Your Time Ran out"
  buttonsDiv.innerHTML=""
  let buttonEL = document.createElement("button")
  buttonEL.textContent = "play again?"
  buttonEL.setAttribute('onclick','playGame();')
  buttonsDiv.appendChild(buttonEL)
}




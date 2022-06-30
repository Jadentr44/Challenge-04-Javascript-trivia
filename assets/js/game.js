// global varaibales
let questions = [
  {question:"What HTML element do we put the JavaSript in?",
  options:["<javascript>","<js>","<script>","<scripting>"],
  answer:"<script>"},
  {question:`What is the correct syntax for referring to an external script called "xxx.js"?`,
  options:[`<script name="xxx.js">`,`<script src="xxx.js">`,`<script href="xxx.js">`,],
  answer:`<script src="xxx.js">`},
  {question:`Which of the following declares a variable?`,
  options:[`var`,`let`,`const`,`all of the above`],
  answer:`all of the above`},
  {question:`Which of the following declares a variable?`,
  options:[`var`,`let`,`const`,`all of the above`],
  answer:`all of the above`},
  {question:`JavaScript is a ___ -side programming language.`,
  options:[`client`,`server`,`both`,`none`],
  answer:`both`},
]

let buttonsDiv = $('#buttons')
let messageDisplay = $('#message')
let timerDisplay = $('#timer')


//start buttons 
$('#startButton').on('click',playGame)

//functions
function playGame(){
  let secondsLeft = 6;
  newQuestion()
  let timer = setInterval(function(){
    secondsLeft--;
    timerDisplay.text(secondsLeft)
    if(secondsLeft == 0){
      clearInterval(timer)
      // stopGame()
    }
  },1000)
}

function newQuestion(){
  
  let randomIndex = Math.floor(Math.random() * questions.length);
  messageDisplay.text(questions[randomIndex].question)
  buttonsDiv.html("")

  questions[randomIndex].options.forEach(e =>{
    let buttonEl = $('<button>')
    if(e ==  questions[randomIndex].answer ){
      buttonEl.attr("data-correct","true")
    }else{buttonEl.attr("data-correct","false")}
    buttonEl.on('click', checkButton)
    buttonEl.text(e)
    buttonEl.css("margin","2vh 0")
    buttonsDiv.append(buttonEl)
  })
}
function stopGame(){
  messageDisplay.text("Your Time Ran Out")
  buttonsDiv.html("")
  let buttonEL = $('<button>')
  buttonEL.text("play again?")
  buttonEL.attr('onclick','playGame();')
  buttonsDiv.append(buttonEL)
}
function checkButton(e){
  let inputCorrect = e.target.dataset.correct
  console.log(inputCorrect)
  if(inputCorrect == "true"){correct()}
  else{wrong()}
}
function correct(){

  flashColor("green")
  newQuestion()
}

function wrong(){
  flashColor("red")
}
function flashColor(color){
  let header = $("#info")
  let index = 1;
  let colorTimer = setInterval(function(){
    if(index == 1){
      header.css("transition",".5s")
  header.css("background-color",color)
    }
    else if(index == 6){
      header.css("transition",".5s")
  header.css("background-color","white")
      clearInterval(colorTimer)
    }
    console.log(index)
    index++;
  },50)
}
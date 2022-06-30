// global varaibales
let allQuestions = [
  {question:"What HTML element do we put the JavaSript in?",
  options:["<javascript>","<js>","<script>","<scripting>"],
  answer:"<script>"},
  {question:`What is the correct syntax for referring to an external script called "xxx.js"?`,
  options:[`<script name="xxx.js">`,`<script src="xxx.js">`,`<script href="xxx.js">`,],
  answer:`<script src="xxx.js">`},
  {question:`Which of the following declares a variable?`,
  options:[`var`,`let`,`const`,`all of them`],
  answer:`all of them`},
  {question:`JavaScript is a ___ -side programming language.`,
  options:[`client`,`server`,`both`,`none`],
  answer:`both`},
]
let questions = [];
let highscoreArr = JSON.parse(localStorage.getItem("highscoreData"));
console.log(highscoreArr)
if(highscoreArr == null){highscoreArr = []}
let score = 0;
let timer;
let initals = $('#input');
let buttonsDiv = $('#buttons')
let messageDisplay = $('#message')
let timerDisplay = $('#timer')
let scoreDisplay = $('#score')



//start buttons 
$('#startButton').on('click',playGame)

document.addEventListener('keydown', function (e) {
  initals = $('#input')
  let key = e.key
  
  if(key == 'Enter'){
    console.log(initals.val())
    if(initals.val()!= undefined){
     let stats={
      initial:"",
      score:""
     }
     stats.initial = initals.val()
     stats.score = score
     initals.val("")
     highscoreArr.unshift(stats)
     localStorage.setItem("highscoreData",JSON.stringify(highscoreArr))
     initals.prop('readonly',true)

    }
  }
});

//functions
function playGame(){
  initals.prop('readonly',false)
  questions =  questions.concat(allQuestions)
  console.log(questions)
  let secondsLeft = 3;
  newQuestion()
  timer = setInterval(function(){
    secondsLeft--;
    timerDisplay.text(secondsLeft)
    if(secondsLeft == 0){
      
      stopGame()
    }
  },1000)
}

function newQuestion(){
  scoreDisplay.text(score)
  if(questions.length > 0){
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
  questions.splice(randomIndex,1)
}else{stopGame()}
  console.log(questions)
}
function stopGame(){
  clearInterval(timer)
  messageDisplay.html("Your Time Ran Out</br>enter initals")
  let inputDiplay = $('<input>')
  inputDiplay.attr("id","input")
  messageDisplay.append(inputDiplay)
  buttonsDiv.html("")
  let buttonEL = $('<button>')
  buttonEL.text("play again?")
  buttonEL.attr('onclick','playGame();')
  buttonsDiv.append(buttonEL)
}
function checkButton(e){
  let inputCorrect = e.target.dataset.correct
  if(inputCorrect == "true"){correct()}
  else{wrong()}
}
function correct(){
  score += 7;
  flashColor("green")
  newQuestion()
}

function wrong(){
  score -= 3;
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
function toggleDisplay(){

}
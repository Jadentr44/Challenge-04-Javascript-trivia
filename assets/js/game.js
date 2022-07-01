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
  {question:`Which of the following is a string`,
  options:[`"number"`,`{type:string}`,`[string]`,`array`],
  answer:`"number"`}
]
let questions = [];
let highscoreArr = JSON.parse(localStorage.getItem("highscoreData"));
if(highscoreArr == null){highscoreArr = []}
let currentAnswer;

let score ;
let timer;
let stopTimer = false;
let initals = $('#input');
let buttonsDiv = $('#buttons')
let messageDisplay = $('#message')
let timerDisplay = $('#timer')
let scoreDisplay = $('#score')
let mainDiv = $('#main')



//start buttons 
$('#startButton').on('click',playGame)
$('#toggle').on('click',toggleDisplay)
document.addEventListener('keydown', function (e) {
  initals = $('#input')
  let key = e.key
  
  if(key == 'Enter'){
    
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
  stopTimer = false
  score = 0;
  initals.prop('readonly',false)
  questions =  questions.concat(allQuestions)
  console.log(questions)
  let secondsLeft = 30;
  timerDisplay.text(secondsLeft)
  newQuestion()
  timer = setInterval(function(){
    if($("main").attr("data-status") != 'game'){
      clearInterval(timer)
    }
    secondsLeft--;
    timerDisplay.text(secondsLeft)
    if(secondsLeft < 1 || stopTimer){
      
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
 currentAnswer = questions[randomIndex].answer
  questions[randomIndex].options.forEach(e =>{
    let buttonEl = $('<button>')
      buttonEl.attr("data-text",e)
    
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
  let buttonText = e.target.dataset.text
  if(buttonText == currentAnswer){correct()}
  else{wrong()}
}
function correct(){
  score += 7;
  flashColor("0,250,0")
  newQuestion()
}

function wrong(){
  score -= 3;
  scoreDisplay.text(score)
  flashColor("250,0,0")
}
function flashColor(color){
  let header = $("#info")
  let index = 1;
  let colorTimer = setInterval(function(){
    if(index == 1){
      header.css("transition",".5s")
     
  header.css("background",`rgb(${color},.7)`)
    }
    else if(index == 8){
      header.css("transition",".5s")
      header.css("background",`rgb(0,0,0,0)`)
      clearInterval(colorTimer)
    }
    console.log(index)
    index++;
  },50)
}
function toggleDisplay(){
  
  if(mainDiv.attr("data-status") == 'game'){
    mainDiv.attr("data-status","highscore")
    let orderedArr = []
    $('#h1').text("top 5 Highscores")
    messageDisplay.text("")
    buttonsDiv.html("")
    highscoreArr.forEach(e =>{
      let index = 0;
      if(orderedArr.length == 0){
        orderedArr.unshift(e)
      }else{
        let maxScoreShowing;
        if(orderedArr.length > 4){maxScoreShowing = 5}
        else{maxScoreShowing = orderedArr}
        console.log(maxScoreShowing)
        for(let i=0;i<maxScoreShowing.length;i++){
          if(e.score > orderedArr[i].score){
            orderedArr.splice(i,0,e);
            break
          } else if(i == orderedArr.length-1){
            orderedArr.push(e)
            break;
          }
          


        
        }
      }
    })
    orderedArr.forEach(e =>{
      let index = 1;
      let li = $('<li>')
      let nameDiv = $('<div>')
      let colon = $('<span>')
      colon.text(':')
      nameDiv.text(e.initial)
      let scoreDiv = $('<div>')
      scoreDiv.text(e.score)
      li.append(nameDiv)
      li.append(colon)
      li.append(scoreDiv)
      $('#scores').append(li)
      index++;
    })
    $("#toggle").text("go to game")
  }
  else{
    mainDiv.attr("data-status","game")
    $('#h1').text("JavaScript Syntax Trivia")
    messageDisplay.text("Try to answer 5 questions in 30 seconds")
    $('#scores').text("")
    let buttonEL = $('<button>')
  buttonEL.text("play game")
  buttonEL.attr('onclick','playGame();')
  buttonsDiv.append(buttonEL)
  $("#toggle").text("see highscores")
  }
}
// global varaibales
let allQuestions = [ //all the questions ill be using
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

//getting previous high scores
let highscoreArr = JSON.parse(localStorage.getItem("highscoreData"));
//if there are no previous high scores making an empty array
if(highscoreArr == null){highscoreArr = []}

//variables use in more than one function
let currentAnswer;
let secondsLeft;
let score ;
let timer;
let questions = [];

//variables that select elements from html
let initals = $('#input');
let buttonsDiv = $('#buttons')
let messageDisplay = $('#message')
let timerDisplay = $('#timer')
let scoreDisplay = $('#score')
let mainDiv = $('#main')



//adding funtions to the html
$('#startButton').on('click',playGame)
$('#toggle').on('click',toggleDisplay)

//when 'enter is pressed it will send the intials to the high scores
document.addEventListener('keydown', function (e) {
  let key = e.key
  //getting the input for initials
  initals = $('#input')
  //checking if enter was pressed
  if(key == 'Enter'){
    //making sure there is a value in the input
    if(initals.val()!= undefined){
     let stats={
      initial:"",
      score:""
     }
     //giving the current stats its info
     stats.initial = initals.val()
     stats.score = score
     //clearing the input
     initals.val("")
     //adding the stat to the high score array, then pushhign the array to local storage
     highscoreArr.unshift(stats)
     localStorage.setItem("highscoreData",JSON.stringify(highscoreArr))
     //once you enter your intials you cant enter another
     initals.prop('readonly',true)
    }
  }
});

//functions
function playGame(){
  //resetting the score
  score = 0;

  //making the input, so you can enter info again
  initals.prop('readonly',false)

  //putting all the possible questions in an array of questions, so they can be deleted after they are asked
  questions =  questions.concat(allQuestions)

  //resetting the clock
  secondsLeft = 30;
  timerDisplay.text(secondsLeft)

  //giving a new question
  newQuestion()

  //setting timer
  timer = setInterval(function(){
    //checking if the high scores are showing, so the clock will stop
    if($("main").attr("data-status") != 'game'){
      clearInterval(timer)
    }

    secondsLeft--;
    timerDisplay.text(secondsLeft)
    if(secondsLeft < 1){
      stopGame()
    }
  },1000)
}

function newQuestion(){
  // if a questions was just answered or the score was reset its showing the new score
  scoreDisplay.text(score)

  //checking if there are more questions
  if(questions.length > 0){
  //getting a random question, and showing it
  let randomIndex = Math.floor(Math.random() * questions.length);
  messageDisplay.text(questions[randomIndex].question)

  //deleting all the current buttons
  buttonsDiv.html("")
  
  //setting the current answer
 currentAnswer = questions[randomIndex].answer

 //looping through each of the question options and making a button for them
  questions[randomIndex].options.forEach(e =>{
    let buttonEl = $('<button>')

    //giving the button element the data of the text its showing, so we can compare it when clicked
    buttonEl.attr("data-text",e)
    buttonEl.on('click', checkButton)
    
    //displaying the current question option
    buttonEl.text(e)

    //styling and adding the button
    buttonEl.css("margin","2vh 0")
    buttonsDiv.append(buttonEl)
  })
  //deleting the question
  questions.splice(randomIndex,1)
}else{stopGame()}//stopping the game if there are no more questions
}


function stopGame(){
  //updating the score, and if there is time left, it will be added to the score
  scoreDisplay.text(score)
  if(secondsLeft > 0){scoreDisplay.text(score+secondsLeft)}
  //stopping the timer
  clearInterval(timer)
  //deleting the buttons
  buttonsDiv.html("")
  //creating the end of game screen and giving an input
  messageDisplay.html("Game over</br>enter initals and</br>click 'enter'")

  let inputDiplay = $('<input>')
  let playAgainButton = $('<button>')

  inputDiplay.attr("id","input")
  playAgainButton.attr('onclick','playGame();')
  playAgainButton.text("play again?")

  messageDisplay.append(inputDiplay)
  buttonsDiv.append(playAgainButton)
}

function checkButton(e){
  //getting the text from the data of the button that was clicked and checking if it were write or wrong
  let buttonText = e.target.dataset.text
  if(buttonText == currentAnswer){correct()}
  else{wrong()}
}

function correct(){
  //adding the score,flashing the top green and giving a new question
  score += 7;
  flashColor("0,250,0")
  newQuestion()
}

function wrong(){
  //taking away from the score, displaying it and flashing red
  score -= 3;
  scoreDisplay.text(score)
  flashColor("250,0,0")
}

function flashColor(color){
  let header = $("#info")
  let index = 1;
  let colorTimer = setInterval(function(){
    if(index == 1){
      //fading into green
      header.css("transition",".5s")
      header.css("background",`rgb(${color},.7)`)
    }
    else if(index == 8){
      //fading to clear
      header.css("transition",".5s")
      header.css("background",`rgb(0,0,0,0)`)
      clearInterval(colorTimer)
    }
    index++;
  },50)
}
function toggleDisplay(){
  //if its showing the game, it will change to the high scores
  if(mainDiv.attr("data-status") == 'game'){
    mainDiv.attr("data-status","highscore")
    //creating an array that will contain the highscores sorted
    let orderedArr = []
    //changing the screen to show the high score screen
    $('#h1').text("top 5 Highscores")
    messageDisplay.text("")
    buttonsDiv.html("")

    
    //going through each of the highscores and sorting them to orderedArr
    highscoreArr.forEach(e =>{
      //if ordered array is empty, add e to it
      if(orderedArr.length == 0){
        orderedArr.unshift(e)
      }else {
      for( let i=0;i<orderedArr.length;i++){
          // if the score is bigger than the current ordered array score, take its place and break the loop
           if(e.score > orderedArr[i].score){
            orderedArr.splice(i,0,e);
            break
          } else if(i == orderedArr.length-1){
            // if we get to the end of the orderedArr, add it to the end of the array and break the loop
            orderedArr.push(e)
            break
          //if none of these work, move to the next score
        }
        }
        
      
    }})

    //giving a max amount of scores that will be showing
    //if the orderedArr is longer than 5, the max will be set to 5
    let maxScoresShowing;
    if(orderedArr.length > 5){maxScoresShowing = 5}
    else{maxScoresShowing = orderedArr.length}

    let index = 0;// so we know how many orderedArr scores weve added to the list

    orderedArr.forEach(e =>{
      //only going if we haven't hit the max number of scores showing
      if(index < maxScoresShowing){
      //creating an list item and putting it in the unordered list

      let li = $('<li>')
      let nameDiv = $('<div>')
      let scoreDiv = $('<div>')
      let colon = $('<span>')

      nameDiv.text(e.initial)
      scoreDiv.text(e.score)
      colon.text(':')
      
      
      li.append(nameDiv)
      li.append(colon)
      li.append(scoreDiv)
      $('#scoresUl').append(li)
      index++;
    }})
    //changing the toggle button to tell the user to go back to the game
    $("#toggle").text("go to game")
  }
  else{
    //deleting the high scores
    $('#scores').text("")
    //changing the high scores back to the games
    mainDiv.attr("data-status","game")
    $('#h1').text("JavaScript Syntax Trivia")
    messageDisplay.text("Try to answer 5 questions in 30 seconds")
    //making the button to play the game
    let buttonEL = $('<button>')
    buttonEL.text("play game")
    buttonEL.attr('onclick','playGame();')
   buttonsDiv.append(buttonEL)
   //making the toggle button say see high schres
    $("#toggle").text("see highscores")
  }
}
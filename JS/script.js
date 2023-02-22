const myBtn = document.querySelector(".my-btn button");
const rulesBox = document.querySelector(".rules-box");
const exitButton = document.querySelector(".new-buttons .exit-button");
const continueButton = document.querySelector(".new-buttons .continue-button");
const Questions = document.querySelector(".Questions");
const optionList = document.querySelector(".my-options");
const timeline = document.querySelector(".Question-header .time-lines");
const timeCount = document.querySelector(".time-count .seconds");


myBtn.onclick = () =>{
  rulesBox.classList.add("activeInfo");
}
exitButton.onclick = () =>{
  rulesBox.classList.remove("activeInfo");
}
continueButton.onclick = () =>{
  rulesBox.classList.remove("activeInfo");
  Questions.classList.add("activeQuiz");
  showQuestions(0);
  startTimer(15);
  startTimerLine(0);
}
const nextBtn = document.querySelector(".next-btn");
const resultBox = document.querySelector(".result-box");
const reStartBtn = document.querySelector(".buttons .restart1");
const quitBtn = document.querySelector(".buttons .quit");

reStartBtn.onclick = () =>{
  resultBox.classList.remove("activeResult");
  Questions.classList.add("activeQuiz");
  showQuestions(0);
  startTimer(15);
  startTimerLine(0);
}

quitBtn.onclick = () =>{
  window.location.reload();
}

let queCount = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

nextBtn.onclick = () =>{
  if(queCount < questions.length - 1){
    queCount ++;
    showQuestions(queCount);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = "none";
  }else{
    console.log("You Have Complete Your Task✌️");
    showResultBox();
  }
}

function showQuestions(index){
  const queText = document.querySelector(".text");
  const optionList = document.querySelector(".my-options");
  let optionTag = '<div class = "options"><span>' + questions[index].options[0] + '</span></div>'
                  + '<div class = "options"><span>' + questions[index].options[1] + '</span></div>'
                  + '<div class = "options"><span>' + questions[index].options[2] + '</span></div>'
                  + '<div class = "options"><span>' + questions[index].options[3] + '</span></div>';
  let queTag = "<span>" + questions[index].numb +"." + questions[index].question + "</span>";
  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;
  const totalQue = document.querySelector(".total-que");
  let totalQueTag = '<p>' + questions[index].numb + ' Of 15 Questions </p>';
  totalQue.innerHTML = totalQueTag;

  const option = optionList.querySelectorAll(".options");
  for(let i = 0; i < option.length; i++){
    option[i].setAttribute("onclick","optionSelected(this)");
  }
}

let tickIcon = '<div class= "tick-icon"><i class= "fa-sharp fa-solid fa-check"></i></div>';
let crossIcon = '<div class= "cross-icon"><i class= "fas-sharp fa-solid fa-xmark"></i></div>';

function optionSelected(answer){
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[queCount].answer;
  let allOptions = optionList.children.length;
  if(userAns == correctAns){
    userScore += 1;
    console.log(userScore)
    answer.classList.add("correct");
    console.log("Answer Is Correct");
    answer.insertAdjacentHTML("beforeend",tickIcon);
  }else{
    answer.classList.add("incorrect");
    console.log("Answer Is Wrong");
    answer.insertAdjacentHTML("beforeend",crossIcon);
    for(let i = 0; i < allOptions; i++){
      if(optionList.children[i].textContent == correctAns){
        optionList.children[i].setAttribute("class","options correct");
        optionList.children[i].insertAdjacentHTML("beforeend",tickIcon);
      }
    }
  }
  for(let i = 0; i < allOptions; i++){
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.style.display = "block";
}

function showResultBox(){
  rulesBox.classList.remove("activeInfo");
  Questions.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = document.querySelector(".score-text");
  if(userScore > 8){
    let scoreTag = '<span> Congratulation You Got <p>'+''+ userScore +''+ '</p> Out of<p>'+''+ questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }else if(userScore > 1){
    let scoreTag = '<span>Carry on 👌 You Got <p> ' + userScore + '</p> Out of <p> ' + questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }else{
    let scoreTag = '<span> I Am Sorry You Got <p> ' + userScore + '</p> Out of <p> '+ questions.length + '</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time){
  counter = setInterval(timer,1000);
  function timer(){
    timeCount.textContent = time;
    time--;
    if(time < 9){
      let addZero = timeCount.textContent;
      timeCount.textContent = 0 + addZero;
    }
     if(time < 0){
      clearInterval(counter);
      timeCount.textContent = "00"
    }
  }
}
function startTimerLine(time){
  counterLine = setInterval(timer, 50);
  function timer(){
    time += 1;
    timeline.style.width = time + "px";
    if(time > 319){
      clearInterval(counterLine);
    }
  }
}


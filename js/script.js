// Obteniendo los elementos requeridos 
const start_btn = document.querySelector(".start__btn button");
const info_box = document.querySelector(".info__box");
const exit_btn = document.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz__box");
const next_btn = document.querySelector(".next__btn");
const button_ques_counter = document.querySelector(".total__que");
const option_list = document.querySelector(".option__list");
const timeCount = document.querySelector(".timer .timer__sec");
const timeLine = document.querySelector("header .time__line");
const timeOff = document.querySelector("header .timer__text");
const resultBox = document.querySelector(".result__box");
const restarQuiz = document.querySelector('.buttons .restart');
const quitQuiz = document.querySelector('.buttons .quit');
const scoreText = document.querySelector(".score__text");
const restart_quiz = resultBox.querySelector(".buttons .restart");
const quit_quiz = resultBox.querySelector(".buttons .quit");
//Cuando de click en iniciar examen
//muestra la info
start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
}

//cuando de click en exit
//Oculta info
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
}

//click en button continuar
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add('activeQuiz')
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
}
  quit_quiz.onclick = () => {
    window.location.reload();
  };

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timerValue = 15;
let widthValue =0;
let userScore = 0;

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  resultBox.classList.remove("activeResult");
  let que_count = 0;
  let que_numb = 1;
  let timerValue = 15;
  let widthValue = 0;
  let userScore = 0;
  showQuestions(que_count);
  queCounter(que_numb);
  clearInterval(counter);
  startTimer(timerValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  next_btn.style.display = "none";
};

// si da click en siguiente pregunta
next_btn.onclick = () => {
  if(que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter)
    startTimer(timerValue);
    clearInterval(counterLine);
    startTimerLine(widthValue)
    next_btn.style.display = "none";
     timeOff.textContent = "Tiempo Restante";
  }else { 
    clearInterval(counter);
    startTimer(timerValue);
    clearInterval(counterLine);
    console.log('Preguntas finalizadas')
    showResultBox();
  }
}

//Obteniendo preguntas y opciones desde el array
function showQuestions(index) {
  const que_text = document.querySelector(".que__text");
  let que_tag =
    "<span>" +
    questions[index].numb + ". "
    +questions[index].question +
    "</span>";
  let option_tag = '<div class="option__list--option"><span>'+ questions[index].options[0] +'</span></div>' +
    '<div class="option__list--option"><span>'+ questions[index].options[1] +'</span></div>' +
    '<div class="option__list--option"><span>'+ questions[index].options[2] +'</span></div>' +
    '<div class="option__list--option"><span>'+ questions[index].options[3] +'</span></div>';
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = document.querySelectorAll(".option__list--option");
  for(let i = 0; i < option.length; i++){
    option[i].setAttribute('onclick','optionSelected(this)');
  }
}
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAnswer = answer.textContent;
  let correctAnswer = questions[que_count].answer;
  let allowOptions = option_list.children.length;
  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore +=1;
    console.log("Respuesta Correcta");
    answer.insertAdjacentHTML('beforeend',tickIcon)
  } else {
    answer.classList.add("incorrect");
    console.log("Respuesta incorrecta");
     answer.insertAdjacentHTML("beforeend", crossIcon);
     // si la respuesta es incorrecta mostrará la correcta
      for (let i = 0; i < allowOptions; i++) {
       if(option_list.children[i].textContent == correctAnswer){
          option_list.children[i].setAttribute(
            "class",
            "option__list--option correct"
          );
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        } 
      }
      clearInterval(counter);
      clearInterval(counterLine);
  }

  //cuando el usuario seleccione deshabilitar opciones
  for (let i = 0; i < allowOptions; i++) {
    option_list.children[i].classList.add('disabled')
  }
  next_btn.style.display = 'block';
}

function showResultBox() {
   info_box.classList.remove("activeInfo");
   quiz_box.classList.remove("activeQuiz");
   resultBox.classList.add('activeResult')
   if(userScore > 4) {
     let scoreTag =
       "<span>Felicidades 🎉, has respondido<p>" +
       userScore +
       "</p>correctas de <p>" +
       questions.length +
       "</p></span";
     scoreText.innerHTML = scoreTag;
   }
   else if(userScore < 3) {
     let scoreTag =
       "<span>Puedes hacerlo mejor 😎, solo tienes <p>" +
       userScore +
       "</p> de <p>" +
       questions.length +
       "</p></span";
     scoreText.innerHTML = scoreTag;
   }
   else {
     let scoreTag =
       "<span>UPS!, Ve a repasar 😐, y vuelve de nuevo has respondido <p>" +
       userScore +
       "</p> de <p>" +
       questions.length +
       "</p></span";
     scoreText.innerHTML = scoreTag;
   }
}


//LLevando conteo de preguntas

function startTimer(time) {
  counter = setInterval(timer,1000)
  function timer(){
    timeCount.textContent = time;
    time--;
    if(time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if(time < 0) {
      clearInterval(counter);
      timeCount.textContent = '00'
      timeOff.textContent = "Se terminó el tiempo";
      let correctAnswer = questions[que_count].answer;
      let allowOptions = option_list.children.length;
      for (let i = 0; i < allowOptions; i++) {
        if (option_list.children[i].textContent == correctAnswer) {
          option_list.children[i].setAttribute(
            "class",
            "option__list--option correct"
          );
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
        }
      }
       for (let i = 0; i < allowOptions; i++) {
         option_list.children[i].classList.add("disabled");
       }
       next_btn.style.display = 'block'
    }
  }
}
function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + 'px';
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}
function queCounter(index) {
  let totalQuesCountTag = "<span><p>"+ index +"</p>de<p>"+ questions.length +"</p>preguntas</span>";
  button_ques_counter.innerHTML = totalQuesCountTag;
}


















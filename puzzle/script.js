
const wrapper = document.createElement("div");
wrapper.className = 'wrapper';
document.body.append(wrapper);

const h1 = document.createElement('h1')
h1.textContent = 'RSS Gem Puzzle'
wrapper.append(h1)

const btnCont = document.createElement('div');
btnCont.className = 'btn-cont';
wrapper.append(btnCont);

let stopBtn;

for(let i = 0; i < 4; i++) {
  let  btn = document.createElement('button');
  btn.className = 'upper-btn';
  switch (i) {
    case 0: 
    btn.textContent = 'Shuffle';
    btn.classList.add('shuffle')
    break;
    case 1: 
    stopBtn = btn;
    btn.textContent = 'Stop';
    break;
    case 2: 
    btn.textContent = 'Save';
    break;
    case 3: 
    btn.textContent = 'Results';
    break;
  }

  btnCont.append(btn);
}

const countCont = document.createElement('div');
countCont.className = 'count-cont'
wrapper.append(countCont)

for(let i = 0; i < 4; i++) {
  let  div = document.createElement('div');
  div.className = 'count';
  switch (i) {
    case 0: 
    div.textContent = 'Moves:';
    break;
    case 1: 
    div.textContent = 0;
    div.classList.add('counter')
    break;
    case 2: 
    div.textContent = 'Time:';
    break;
    case 3:
    div.classList.add('timer');
    div.textContent = '0:00';
    break;
  }

  countCont.append(div);
}

const puzzle = document.createElement('div');
puzzle.className = 'puzzle';
wrapper.append(puzzle);

let numbers = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
numbers.sort(() => Math.round((Math.random() * 100) - 50));


for(let i = 0; i < 16; i++) {
  let card = document.createElement('div');
  card.className = 'card';
  card.textContent = numbers[i];
  puzzle.append(card)
}
// вешаем слушатель на паззл

puzzle.addEventListener('click', moveCard);

const counter = document.querySelector('.counter')

// передвигаем пустые ячейки и считаем движения

function moveCard (event) {
  let target = event.target;
  let current = target.textContent;
  let cards = Array.from(document.querySelectorAll('.card')) ;

  let i = cards.indexOf(target);
  
  if(target.nextSibling && target.nextSibling.textContent === '' && ((i+1) % 4 !== 0) ) {
    target.classList.add('right'); // добавляем анимацию
    setTimeout(() => {
      target.nextSibling.textContent = current;
      target.textContent = '';
      target.classList.remove('right') // убираем анимацию
    }, 1000)
    countMoves () // считаем движения
  }
  
  if(target.previousSibling && target.previousSibling.textContent === '' && ((i % 4 !== 0)))  {
    target.classList.add('left');
    setTimeout(()=>{
      target.previousSibling.textContent = current;
      target.textContent = '';
      target.classList.remove('left')
    }, 1000)
    countMoves ()
  }

  if(cards[i+4] && cards[i+4].textContent === '')  {
    target.classList.add('down');
    setTimeout(() => {
      cards[i+4].textContent = current;
      target.textContent = '';
      target.classList.remove('down')
    }, 1000)
    countMoves ()
  }

  if(cards[i-4] && cards[i-4].textContent === '')  {
    target.classList.add('up');
    setTimeout(()=> {
      cards[i-4].textContent = current;
      target.textContent = '';
      target.classList.remove('up')
    }, 1000)
    countMoves ()
  }}

//  делаем счетчик движений

function countMoves () {
  let current = +counter.textContent;
  counter.textContent = ++current
}

// делаем шаффл и рестарт 
const shuffleBtn = document.querySelector('.shuffle')

shuffleBtn.addEventListener('click', restart)

function restart() {
  // перемешиваем карточки
  numbers.sort(() => Math.round((Math.random() * 100) - 50));
  let cards = document.querySelectorAll('.card');
  for(let i = 0; i < 16; i++) {
    cards[i].textContent = numbers[i]
  }
  counter.textContent = 0;
  // перезапускаем таймер
  start = 0;
  now = 0;
}
// делаем таймер

  const time = document.querySelector('.timer')
  let start; 
  let now = 1;
  window.addEventListener('load', () => {
  start = 0;
 })

let timer = setInterval(() => {
  let seconds = now - start;
  let min = Math.trunc(seconds / 60);
  let sec = seconds%60;
  if(sec>9) {
    time.textContent = `${min}:${sec} `
  } else {
    time.textContent = `${min}:0${sec} `
  }
  now = now + 1;
  
}, 1000)




// остановка таймера
// stopBtn.addEventListener('click', stopTimer);

// function stopTimer() {
//   clearInterval(timer)
// }


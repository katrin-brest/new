
const wrapper = document.createElement("div");
wrapper.className = 'wrapper';
document.body.append(wrapper);

const h1 = document.createElement('h1')
h1.textContent = 'RSS Gem Puzzle'
wrapper.append(h1)

const btnCont = document.createElement('div');
btnCont.className = 'btn-cont';
wrapper.append(btnCont);

let soundBtn;  // для звука
let sound = true  // для звука

for(let i = 0; i < 4; i++) {
  let  btn = document.createElement('button');
  btn.className = 'upper-btn';
  switch (i) {
    case 0: 
    btn.textContent = 'Shuffle';
    btn.classList.add('shuffle')
    break;
    case 1: 
    soundBtn = btn;
    btn.textContent = 'Sound on';
    break;
    case 2: 
    btn.textContent = 'Save';
    btn.classList.add('save')
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

function control (arr) {
  arr.sort(() => Math.round((Math.random() * 100) - 50));

  // определяем решаемость
  let result = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let count = 0; 
    for(let j = i + 1; j < arr.length; j++ ) {
      if((arr[i] > arr[j]) && (arr[j] !== '')) {
        count++
      }
    }
    result += count;
  }
   let row // определяем номер ряда пустой клетки
  switch (arr.indexOf('')) {
    case 0: case 1: case 2: case 3: 
    row = 1;
    break;
    case 4: case 5: case 6: case 7: 
    row = 2;
    break;
    case 8: case 9: case 10: case 11: 
    row = 3;
    break;
    default: 
    row = 4;
  }
   if(((result + row) % 2) === 0) {
    numbers = arr;
   } else {
    control (arr)
  }
}

control(numbers);

// запоминаем игру
const save = document.querySelector('.save');

save.addEventListener('click', saveGame)

// сохраняем в локалсторэдж


function saveGame () {
  localStorage.setItem('moves', counter.textContent);
  localStorage.setItem('time', time.textContent);
  localStorage.setItem('now', now);

  let savedCardArr = [];
  document.querySelectorAll('.card').forEach(el => savedCardArr.push(el.textContent))
  localStorage.setItem('numbers', savedCardArr.join())

  }
// достаем из локалстрэдж

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.moves) {
    counter.textContent = localStorage.getItem('moves');
    time.textContent = localStorage.getItem('time');
    now = +localStorage.getItem('now');
    }
})

for(let i = 0; i < 16; i++) {
  let card = document.createElement('div');
  card.className = 'card';
  let savedNumbers = localStorage.getItem('numbers').split(',')
  if(savedNumbers) {
    card.textContent = savedNumbers[i];
  } else {
     card.textContent = numbers[i];
  }
 
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
    }, 500)
    countMoves () // считаем движения
    audio.play() // проигрываем звук
  }
  
  if(target.previousSibling && target.previousSibling.textContent === '' && ((i % 4 !== 0)))  {
    target.classList.add('left');
    setTimeout(()=>{
      target.previousSibling.textContent = current;
      target.textContent = '';
      target.classList.remove('left')
    }, 500)
    countMoves ()
    audio.play()
  }

  if(cards[i+4] && cards[i+4].textContent === '')  {
    target.classList.add('down');
    setTimeout(() => {
      cards[i+4].textContent = current;
      target.textContent = '';
      target.classList.remove('down')
    }, 500)
    countMoves ()
    audio.play()
  }

  if(cards[i-4] && cards[i-4].textContent === '')  {
    target.classList.add('up');
    setTimeout(()=> {
      cards[i-4].textContent = current;
      target.textContent = '';
      target.classList.remove('up')
    }, 500)
    countMoves ()
    audio.play()
  }}

//  делаем счетчик движений

function countMoves () {
  let current = +counter.textContent;
  counter.textContent = ++current
}

// делаем шаффл и рестарт 
const shuffleBtn = document.querySelector('.shuffle')

shuffleBtn.addEventListener('click', () => restart(numbers))

function restart(array) {
  // перемешиваем карточки
 control (array);
  let cards = document.querySelectorAll('.card');
  for(let i = 0; i < 16; i++) {
    cards[i].textContent = array[i]
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


// делаем звук

const audio = new Audio('move.mp3')
//  делаем кнопку для звука

soundBtn.addEventListener('click', () => {
  if(sound) {
    soundBtn.textContent = 'Sound off'
    audio.muted = true;
    } else {
    soundBtn.textContent = 'Sound on'
    audio.muted = false;
  }
   sound = !sound
})


// удаляем из локалстрэдж
// .....




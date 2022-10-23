
const wrapper = document.createElement("div");
wrapper.className = 'wrapper';
document.body.append(wrapper);

const h1 = document.createElement('h1')
h1.textContent = 'RSS Gem Puzzle'
wrapper.append(h1)

const btnCont = document.createElement('div');
btnCont.className = 'btn-cont';
wrapper.append(btnCont);

for(let i = 0; i < 4; i++) {
  let  btn = document.createElement('button');
  btn.className = 'upper-btn';
  switch (i) {
    case 0: 
    btn.textContent = 'Shuffle';
    break;
    case 1: 
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
    break;
    case 2: 
    div.textContent = 'Time:';
    break;
    case 3: 
    div.textContent = '00:00';
    break;
  }

  countCont.append(div);
}

const puzzle = document.createElement('div');
puzzle.className = 'puzzle';
wrapper.append(puzzle);

let numbers = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
numbers.sort(() => Math.round((Math.random() * 100) - 50))

for(let i = 0; i < 16; i++) {
  let card = document.createElement('div');
  card.className = 'card';
  card.textContent = numbers[i];
  puzzle.append(card)
}

// заполняем матрицу числами


// function shuffle (arr) {
//   return arr.sort(() => {
//     Math.round((Math.random() * 100) - 50)
//   })
// }


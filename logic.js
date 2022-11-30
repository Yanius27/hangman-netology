let answer = '';
let answerState = [];
let mistakesCount = 0;
let lettersState;

startGame();

function startGame() {
  mistakesCount = 0;
  setDefaultKeyboard();
  drawPerson(mistakesCount);
  drawBoard(lettersState);
  generateWord();
}

function generateWord() {
  answerState = [];
  answer = dictionary[Math.floor(Math.random() * dictionary.length)];
  for (let i = 0; i < answer.length; i++) {
    answerState.push('_');
  }
  drawAnswerState(answerState);
}

function onKeyClick(letter) {
  if (mistakesCount == 7) {
    alert(`Вы проиграли!\nЗагаданное слово: ${answer}`);
    startGame();
    return;
  }

  let letterFromState;
  for (let i = 0; i < lettersState.length; i++) {
    if (lettersState[i].char == letter) {
      letterFromState = lettersState[i];
      break;
    }
  }

  if (!answer.includes(letter) && !letterFromState.error) {
    mistakesCount++;
    letterFromState.error = true;
  }
  else if (answer.includes(letter) && !letterFromState.success) {
    letterFromState.success = true;
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] == letter) answerState[i] = letter;
    }
  }

  drawPerson(mistakesCount);
  drawBoard(lettersState);
  drawAnswerState(answerState);

  if (answerState.join('') == answer) winGame();
}
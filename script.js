const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const scoreText = document.getElementById('score-text');

let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];

// Lista de 30 preguntas
const allQuestions = [
  { texto: "Resolver 2x = 8", correcta: "x = 4", incorrectas: ["x = 16", "x = 2"] },
  { texto: "Resolver x/3 = 5", correcta: "x = 15", incorrectas: ["x = 8", "x = 2"] },
  { texto: "Resolver x + 7 = 10", correcta: "x = 3", incorrectas: ["x = 17", "x = -3"] },
  { texto: "Resolver 5x - 10 = 0", correcta: "x = 2", incorrectas: ["x = -2", "x = 10"] },
  { texto: "Resolver 3(x - 2) = 6", correcta: "x = 4", incorrectas: ["x = 2", "x = 0"] },
  { texto: "Resolver 2x + 3 < 7", correcta: "x < 2", incorrectas: ["x > 2", "x < 5"] },
  { texto: "Resolver x/4 + 1 ≥ 3", correcta: "x ≥ 8", incorrectas: ["x ≤ 8", "x ≥ 12"] },
  { texto: "Resolver -x + 5 > 1", correcta: "x < 4", incorrectas: ["x > 4", "x < -4"] },
  { texto: "Resolver 2x - 3 ≤ 5", correcta: "x ≤ 4", incorrectas: ["x ≥ 4", "x ≤ 8"] },
  { texto: "Resolver x/2 - 1 = 3", correcta: "x = 8", incorrectas: ["x = 6", "x = 4"] },
  { texto: "Resolver x - 5 = 0", correcta: "x = 5", incorrectas: ["x = -5", "x = 0"] },
  { texto: "Resolver 4x + 1 = 9", correcta: "x = 2", incorrectas: ["x = 8", "x = 1"] },
  { texto: "Resolver 3x - 2 = 7", correcta: "x = 3", incorrectas: ["x = 5", "x = 2"] },
  { texto: "Resolver x/5 + 2 = 4", correcta: "x = 10", incorrectas: ["x = 2", "x = 5"] },
  { texto: "Resolver 2x - 7 > 1", correcta: "x > 4", incorrectas: ["x < 4", "x > 3"] },
  { texto: "Resolver -3x + 6 ≤ 0", correcta: "x ≥ 2", incorrectas: ["x ≤ 2", "x ≥ -2"] },
  { texto: "Resolver x + 3 < 10", correcta: "x < 7", incorrectas: ["x > 7", "x < 13"] },
  { texto: "Resolver 5 - x ≥ 2", correcta: "x ≤ 3", incorrectas: ["x ≥ 3", "x ≤ 2"] },
  { texto: "Resolver 2x/3 = 4", correcta: "x = 6", incorrectas: ["x = 12", "x = 2"] },
  { texto: "Resolver x/6 + 2 ≤ 5", correcta: "x ≤ 18", incorrectas: ["x ≥ 18", "x ≤ 12"] },
  { texto: "Resolver 7x - 14 = 0", correcta: "x = 2", incorrectas: ["x = 0", "x = -2"] },
  { texto: "Resolver x/2 + 3 > 5", correcta: "x > 4", incorrectas: ["x < 4", "x > 2"] },
  { texto: "Resolver 3x + 1 ≤ 10", correcta: "x ≤ 3", incorrectas: ["x ≥ 3", "x ≤ 4"] },
  { texto: "Resolver x - x/2 = 6", correcta: "x = 12", incorrectas: ["x = 6", "x = 3"] },
  { texto: "Resolver 2(x + 1) = 10", correcta: "x = 4", incorrectas: ["x = 5", "x = 6"] },
  { texto: "Resolver -x/2 + 4 < 2", correcta: "x > 4", incorrectas: ["x < 4", "x > 2"] },
  { texto: "Resolver x/3 - 2 ≥ 1", correcta: "x ≥ 9", incorrectas: ["x ≤ 9", "x ≥ 6"] },
  { texto: "Resolver 4x + 5 = 13", correcta: "x = 2", incorrectas: ["x = 3", "x = 4"] },
  { texto: "Resolver x - 3/2 = 1", correcta: "x = 5/2", incorrectas: ["x = 2", "x = 3/2"] },
  { texto: "Resolver 5x/2 = 10", correcta: "x = 4", incorrectas: ["x = 2", "x = 5"] }
];

// Función para mezclar
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Seleccionar 10 preguntas al azar
function selectRandomQuestions() {
  return shuffle([...allQuestions]).slice(0, 10);
}

// Eventos
startBtn.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  currentQuestion = 0;
  score = 0;
  selectedQuestions = selectRandomQuestions();
  showQuestion();
});

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < selectedQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener('click', () => {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
});

// Mostrar pregunta
function showQuestion() {
  nextBtn.classList.add('hidden');
  answerButtons.innerHTML = '';

  const q = selectedQuestions[currentQuestion];
  questionText.textContent = q.texto;

  const answers = shuffle([q.correcta, ...q.incorrectas]);

  answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

// Seleccionar respuesta
function selectAnswer(answer) {
  const q = selectedQuestions[currentQuestion];
  if (answer === q.correcta) score++;
  
  Array.from(answerButtons.children).forEach(button => {
    if (button.textContent === q.correcta) {
      button.style.backgroundColor = '#4CAF50';
    } else {
      button.style.backgroundColor = '#f44336';
    }
    button.disabled = true;
  });

  nextBtn.classList.remove('hidden');
}

// Mostrar resultados
function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  scoreText.textContent = `Aciertos: ${score} / ${selectedQuestions.length}`;
}

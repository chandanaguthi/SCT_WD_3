const questions = [
  {
    type: "single",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: [2]
  },
  {
    type: "multi",
    question: "Which of these are programming languages?",
    options: ["HTML", "Python", "CSS", "JavaScript"],
    correct: [1, 3]
  },
  {
    type: "single",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: [1]
  }
];

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");

function showQuestion() {
  const q = questions[currentQuestion];
  questionContainer.innerHTML = `
    <h2>${q.question}</h2>
    <div class="answers">
      ${q.options.map((opt, index) => `
        <label class="answer">
          <input type="${q.type === 'multi' ? 'checkbox' : 'radio'}" name="answer" value="${index}">
          ${opt}
        </label>
      `).join('')}
    </div>
  `;
}

function checkAnswer() {
  const q = questions[currentQuestion];
  const selected = Array.from(document.querySelectorAll('input[name="answer"]:checked')).map(input => parseInt(input.value));
  
  const isCorrect = selected.length === q.correct.length && selected.every(val => q.correct.includes(val));

  if (isCorrect) {
    score++;
  }
}

function showScore() {
  questionContainer.classList.add("hide");
  nextButton.classList.add("hide");
  scoreContainer.classList.remove("hide");
  scoreContainer.innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
}

nextButton.addEventListener("click", () => {
  checkAnswer();
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

window.onload = () => {
  showQuestion();
};

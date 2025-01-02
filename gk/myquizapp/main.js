import { hissarData } from "./collection/hissar";
import { gurugramData } from "./collection/gurugram";
import { ambala } from "./collection/ambala";
import { rohtakData } from "./collection/rohtak";
document.querySelector("#app").innerHTML = `
   <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 class="text-3xl font-bold text-center mb-6 text-indigo-600">Quiz App</h1>
          <div id="progress" class="mb-4 text-sm text-gray-600"></div>
          <div id="quiz-container"></div>
          <button id="submit-quiz" class="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors hidden">Submit Quiz</button>
      </div>
      <div id="results" class="bg-white rounded-lg shadow-lg p-6 hidden">
          <h2 class="text-2xl font-bold mb-4">Quiz Results</h2>
          <div id="score" class="text-xl mb-4"></div>
          <div id="wrong-answers" class="space-y-4"></div>
      </div>
  </div>
`;
let quiz = [...hissarData,...gurugramData,...ambala,...rohtakData];
const quizData = shuffleArray([...quiz]); // Using spread operator to create a copy before shuffling
let userAnswers = {};
let checkedQuestions = new Set();

// Fisher-Yates shuffle algorithm for thorough randomization
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createQuizHTML() {
  const container = document.getElementById("quiz-container");
  quizData.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "mb-8 p-4 border rounded-lg";

    // Randomize options order
    const randomizedOptions = shuffleArray(
      Object.entries(q.options).map(([key, value]) => ({ key, value }))
    );

    questionDiv.innerHTML = `
            <div class="mb-4">
                <span class="font-bold text-lg">Q${index + 1}:</span>
                <span class="text-lg">${q.question}</span>
            </div>
            <div class="space-y-2">
                ${randomizedOptions
                  .map(
                    ({ key, value }) => `
                    <div class="flex items-center">
                        <input type="radio" id="q${index}_${key}" name="q${index}" value="${value}"
                            class="mr-2 h-4 w-4 text-indigo-600">
                        <label for="q${index}_${key}" class="text-gray-700">${value}</label>
                    </div>
                `
                  )
                  .join("")}
            </div>
            ${
              q.memo
                ? `
                <button class="show-memo mt-2 text-sm text-indigo-600 hover:text-indigo-800">Show Memo</button>
                <div class="memo hidden mt-2 p-2 bg-gray-100 rounded">${q.memo}</div>
            `
                : ""
            }
            <button class="check-answer mt-4 bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition-colors">
                Check Answer
            </button>
            <div class="feedback mt-2 hidden"></div>
        `;
    container.appendChild(questionDiv);
  });

  document.getElementById("submit-quiz").classList.remove("hidden");
  updateProgress();
}

function updateProgress() {
  const total = quizData.length;
  const answered = Object.keys(userAnswers).length;
  const checked = checkedQuestions.size;
  document.getElementById(
    "progress"
  ).textContent = `Questions Answered: ${answered}/${total} | Checked: ${checked}/${total}`;
}

function checkAnswer(questionIndex) {
  const selectedAnswer = document.querySelector(
    `input[name="q${questionIndex}"]:checked`
  );
  if (!selectedAnswer) {
    alert("Please select an answer first!");
    return;
  }

  const correctAnswer = quizData[questionIndex].answer;
  const isCorrect = selectedAnswer.value === correctAnswer;
  const feedbackDiv = document.querySelectorAll(".feedback")[questionIndex];

  feedbackDiv.classList.remove("hidden");
  feedbackDiv.className = `feedback mt-2 p-2 rounded ${
    isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }`;
  feedbackDiv.textContent = isCorrect
    ? "Correct! ✅"
    : `Incorrect! The correct answer is: ${correctAnswer} ❌`;

  userAnswers[questionIndex] = selectedAnswer.value;
  checkedQuestions.add(questionIndex);
  updateProgress();
}

function showResults() {
  const score = calculateScore();
  const wrongAnswers = getWrongAnswers();

  document.getElementById("score").textContent = `Your Score: ${
    score.correct
  }/${quizData.length} (${Math.round(score.percentage)}%)`;

  const wrongAnswersDiv = document.getElementById("wrong-answers");
  wrongAnswersDiv.innerHTML = "";

  if (wrongAnswers.length > 0) {
    wrongAnswers.forEach((wrong) => {
      const wrongDiv = document.createElement("div");
      wrongDiv.className = "p-4 bg-red-50 rounded-lg";
      wrongDiv.innerHTML = `
                <p class="font-bold">Question: ${wrong.question}</p>
                <p class="text-red-600">Your answer: ${wrong.userAnswer}</p>
                <p class="text-green-600">Correct answer: ${wrong.correctAnswer}</p>
            `;
      wrongAnswersDiv.appendChild(wrongDiv);
    });
  } else {
    wrongAnswersDiv.innerHTML =
      '<p class="text-green-600">Perfect score! No wrong answers!</p>';
  }

  document.getElementById("results").classList.remove("hidden");
}

function calculateScore() {
  let correct = 0;
  Object.entries(userAnswers).forEach(([index, answer]) => {
    if (answer === quizData[index].answer) correct++;
  });
  return {
    correct,
    percentage: (correct / quizData.length) * 100,
  };
}

function getWrongAnswers() {
  return Object.entries(userAnswers)
    .filter(([index, answer]) => answer !== quizData[index].answer)
    .map(([index, answer]) => ({
      question: quizData[index].question,
      userAnswer: answer,
      correctAnswer: quizData[index].answer,
    }));
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  createQuizHTML();

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("check-answer")) {
      const questionDiv = e.target.closest("div");
      const index = Array.from(questionDiv.parentElement.children).indexOf(
        questionDiv
      );
      checkAnswer(index);
    }

    if (e.target.classList.contains("show-memo")) {
      const memoDiv = e.target.nextElementSibling;
      memoDiv.classList.toggle("hidden");
      e.target.textContent = memoDiv.classList.contains("hidden")
        ? "Show Memo"
        : "Hide Memo";
    }
  });

  document.getElementById("submit-quiz").addEventListener("click", () => {
    if (Object.keys(userAnswers).length < quizData.length) {
      alert("Please answer all questions before submitting!");
      return;
    }
    showResults();
  });
});

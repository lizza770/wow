let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const progressElement = document.getElementById("progress");
const questionNumberElement = document.getElementById("question-number");

async function loadQuestions() {
  questionElement.textContent = "Loading questions...";

  try {
    const response = await fetch("https://dummyjson.com/products?limit=10");

    if (!response.ok) {
      throw new Error("Could not load data");
    }

    const data = await response.json();

    questions = data.products.slice(0, 5).map((product) => {
      const otherPrices = data.products
        .filter((item) => item.id !== product.id)
        .slice(0, 2)
        .map((item) => item.price);

      const answers = [product.price, ...otherPrices]
        .sort(() => Math.random() - 0.5);

      return {
        question: `How much does "${product.title}" cost?`,
        answers: answers.map((price) => `$${price}`),
        correct: answers.indexOf(product.price)
      };
    });

    showQuestion();
  } catch (error) {
    questionElement.textContent = "Could not load questions. Please refresh the page.";
    console.error(error);
  }
}

function showQuestion() {
  answered = false;

  const current = questions[currentQuestion];

  questionElement.textContent = current.question;
  answersElement.innerHTML = "";
  resultElement.textContent = "";

  questionNumberElement.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  progressElement.style.width =
    `${(currentQuestion / questions.length) * 100}%`;

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;

    button.addEventListener("click", function () {
      if (answered) return;

      answered = true;

      if (index === current.correct) {
        score++;
        button.style.background = "#166534";
        resultElement.textContent = "Correct! Great job! 🎉";
      } else {
        button.style.background = "#991b1b";
        resultElement.textContent = "Not quite! Try the next one.";
        answersElement.children[current.correct].style.background = "#166534";
      }

      Array.from(answersElement.children).forEach((answerButton) => {
        answerButton.disabled = true;
      });

      scoreElement.textContent = score;
    });

    answersElement.appendChild(button);
  });

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "See My Results →"
      : "Next Question →";
}

nextButton.addEventListener("click", function () {
  if (!answered) {
    resultElement.textContent = "Please choose an answer first!";
    return;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionElement.textContent = "Quiz Completed! 🏆";
    answersElement.innerHTML = "";
    resultElement.textContent =
      `Your final score: ${score} out of ${questions.length}`;

    questionNumberElement.textContent = "Finished";
    progressElement.style.width = "100%";
    nextButton.textContent = "Play Again";

    nextButton.onclick = function () {
      currentQuestion = 0;
      score = 0;
      scoreElement.textContent = "0";
      nextButton.onclick = null;
      nextButton.textContent = "Next Question →";
      loadQuestions();
    };
  }
});

loadQuestions();
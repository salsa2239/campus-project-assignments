const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Apa nama latin dari jagung?",
    choice1: "Manihot Utilissima",
    choice2: "Zea mays L",
    choice3: "Solanum Tuberosum L",
    choice4: "Metroxylon sagu Rottb",
    answer: 2,
  },
  {
    question: "Apa saja manfaat dari konsumsi jagung, kecuali...",
    choice1: "Tinggi karbohidrat, berguna sebagai sumber energi",
    choice2: "Kandungan serat di dalamnya baik untuk pencernaan",
    choice3: "Kaya protein, baik untuk pembentuk tulang dan otot",
    choice4: "Menyebabkan penyakit Alzheimer",
    answer: 4,
  },
  {
    question:
      "Iklim yang cocok untuk budidaya jagung?",
    choice1: "Iklim sedang – subtropis/tropis yang basah",
    choice2: "Iklim tinggi – dataran tinggi",
    choice3: "Iklim rendah – dataran rendah",
    choice4: "Iklim tinggi – sejuk",
    answer: 1,
  },
  {
    question: "Berikut merupakan jenis tanaman musiman, kecuali...",
    choice1: "Jagung",
    choice2: "Padi",
    choice3: "Ubi kayu",
    choice4: "Cokelat",
    answer: 4,
  },
  {
    question: "Olahan makanan tradisional khas Madura dengan bahan dasar jagung?",
    choice1: "Pasta jagung",
    choice2: "Tumis jagung",
    choice3: "Nasi jagung",
    choice4: "Sup jagung",
    answer: 3,
  },
];

const SCORE_POINTS = 20;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();

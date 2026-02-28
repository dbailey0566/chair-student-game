let chairScore = 0;
let studentScore = 0;
let currentPlayer = "Chair";
let timerInterval;
let timeLeft = 20;
let roundEligible = false;

/* =========================
   Start Round
========================= */

function startRound() {

  document.getElementById("debateResponse").value = "";
  document.getElementById("wordCount").innerText = 0;
  document.getElementById("judgeControls").style.display = "none";
  timeLeft = 20;
  roundEligible = false;

  const allQuestions = Object.values(questionBank).flat();
  const randomIndex = Math.floor(Math.random() * allQuestions.length);
  const question = allQuestions[randomIndex];

  document.getElementById("questionText").innerText = question;
  document.getElementById("timer").innerText = timeLeft;

  clearInterval(timerInterval);
  timerInterval = setInterval(countdown, 1000);
}

/* =========================
   Countdown
========================= */

function countdown() {
  timeLeft--;
  document.getElementById("timer").innerText = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    evaluateRound();
  }
}

/* =========================
   Manual Submit
========================= */

function submitRound() {
  clearInterval(timerInterval);
  evaluateRound();
}

/* =========================
   Evaluate Word Count
========================= */

function evaluateRound() {

  const text = document.getElementById("debateResponse").value.trim();
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  document.getElementById("wordCount").innerText = wordCount;

  if (wordCount >= 20) {
    roundEligible = true;
    document.getElementById("judgeControls").style.display = "block";
  } else {
    alert("Minimum 20 words required. No points awarded.");
    switchPlayer();
  }
}

/* =========================
   Judge Decision
========================= */

function judgeAnswer(accepted) {

  document.getElementById("judgeControls").style.display = "none";

  if (accepted && roundEligible) {
    if (currentPlayer === "Chair") {
      chairScore += 10;
      document.getElementById("chairScore").innerText = chairScore;
    } else {
      studentScore += 10;
      document.getElementById("studentScore").innerText = studentScore;
    }
  }

  if (chairScore >= 50 || studentScore >= 50) {
    const winner = chairScore >= 50 ? "Chair" : "Student";
    alert(winner + " wins!");
    resetGame();
    return;
  }

  switchPlayer();
}

/* =========================
   Switch Player
========================= */

function switchPlayer() {
  currentPlayer = currentPlayer === "Chair" ? "Student" : "Chair";
  document.getElementById("currentTurn").innerText = currentPlayer + "'s Turn";
}

/* =========================
   Reset Game
========================= */

function resetGame() {
  chairScore = 0;
  studentScore = 0;
  roundEligible = false;

  document.getElementById("chairScore").innerText = 0;
  document.getElementById("studentScore").innerText = 0;
  document.getElementById("questionText").innerText = "";
  document.getElementById("debateResponse").value = "";
  document.getElementById("timer").innerText = 20;
  document.getElementById("judgeControls").style.display = "none";
}

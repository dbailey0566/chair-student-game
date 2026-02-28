let currentQuestion = "";
let currentSuite = "";
let sessionData = [];
let askedQuestions = [];
let startTime = Date.now();

/* ===============================
   Draw Question
================================ */

function drawQuestion() {
  const suite = document.getElementById("suiteSelect").value;
  currentSuite = suite;

  const questions = questionBank[suite];

  if (!questions || questions.length === 0) {
    alert("No questions available for this suite.");
    return;
  }

  const availableQuestions = questions.filter(
    q => !askedQuestions.includes(q)
  );

  if (availableQuestions.length === 0) {
    alert("All questions in this suite have been used.");
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[randomIndex];

  askedQuestions.push(currentQuestion);

  document.getElementById("questionText").innerText = currentQuestion;
  document.getElementById("responseArea").style.display = "block";

  document.getElementById("chairResponse").value = "";
  document.getElementById("studentResponse").value = "";
}

/* ===============================
   Save Response
================================ */

function saveResponse() {
  if (!currentQuestion) {
    alert("Please draw a question first.");
    return;
  }

  const chair = document.getElementById("chairResponse").value;
  const student = document.getElementById("studentResponse").value;

  if (!chair.trim() || !student.trim()) {
    alert("Both responses are required.");
    return;
  }

  sessionData.push({
    suite: currentSuite,
    question: currentQuestion,
    chairResponse: chair.trim(),
    studentResponse: student.trim()
  });

  drawQuestion();
}

/* ===============================
   End Session
================================ */

function endSession() {
  if (sessionData.length === 0) {
    alert("You must complete at least one question before ending the session.");
    return;
  }

  const endTime = Date.now();
  const durationMinutes = Math.round((endTime - startTime) / 60000);

  let reflection = prompt("What is one key insight from this session?");
  if (reflection === null) reflection = "";

  const sessionTitleInput = document.getElementById("sessionTitle");
  const sessionTitle = sessionTitleInput && sessionTitleInput.value.trim()
    ? sessionTitleInput.value.trim()
    : "Untitled Session";

  const sessionPackage = {
    title: sessionTitle,
    duration: durationMinutes,
    reflection: reflection.trim(),
    responses: sessionData
  };

  localStorage.setItem("sessionSummary", JSON.stringify(sessionPackage));

  window.location.href = "summary.html";
}

/* ===============================
   Timer
================================ */

setInterval(() => {
  const timerElement = document.getElementById("timer");
  if (!timerElement) return;

  const now = Date.now();
  const minutes = Math.round((now - startTime) / 60000);

  timerElement.innerText = "Session Time: " + minutes + " min";
}, 60000);

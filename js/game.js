let currentQuestion = "";
let currentSuite = "";
let sessionData = [];
let askedQuestions = [];
let startTime = Date.now();

function drawQuestion() {
  const suite = document.getElementById("suiteSelect").value;
  currentSuite = suite;

  const questions = questionBank[suite];
  const availableQuestions = questions.filter(q => !askedQuestions.includes(q));

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

function saveResponse() {
  const chair = document.getElementById("chairResponse").value;
  const student = document.getElementById("studentResponse").value;

  if (!chair || !student) {
    alert("Both responses are required.");
    return;
  }

  sessionData.push({
    suite: currentSuite,
    question: currentQuestion,
    chairResponse: chair,
    studentResponse: student
  });

  drawQuestion();
}

function endSession() {
  const endTime = Date.now();
  const durationMinutes = Math.round((endTime - startTime) / 60000);

  const reflection = prompt("What is one key insight from this session?");

  const sessionPackage = {
    title: document.getElementById("sessionTitle").value || "Untitled Session",
    duration: durationMinutes,
    reflection: reflection || "",
    responses: sessionData
  };

  localStorage.setItem("sessionSummary", JSON.stringify(sessionPackage));
  window.location.href = "summary.html";
}

setInterval(() => {
  const now = Date.now();
  const minutes = Math.round((now - startTime) / 60000);
  document.getElementById("timer").innerText = "Session Time: " + minutes + " min";
}, 60000);



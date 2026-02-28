let currentQuestion = "";
let sessionData = [];

function drawQuestion() {
  const suite = document.getElementById("suiteSelect").value;
  const questions = questionBank[suite];

  const randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomIndex];

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
    question: currentQuestion,
    chairResponse: chair,
    studentResponse: student
  });

  drawQuestion();
}

function endSession() {
  localStorage.setItem("sessionSummary", JSON.stringify(sessionData));
  window.location.href = "summary.html";
}

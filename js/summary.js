function loadSummary() {
  const container = document.getElementById("summaryContainer");
  const sessionData = JSON.parse(localStorage.getItem("sessionSummary"));

  if (!sessionData || sessionData.length === 0) {
    container.innerHTML = "<p>No session data found.</p>";
    return;
  }

  sessionData.forEach((item, index) => {
    const block = document.createElement("div");
    block.classList.add("summary-block");

    block.innerHTML = `
      <h3>Question ${index + 1}</h3>
      <p><strong>Prompt:</strong> ${item.question}</p>
      <p><strong>Chair Response:</strong></p>
      <p>${item.chairResponse}</p>
      <p><strong>Student Response:</strong></p>
      <p>${item.studentResponse}</p>
      <hr>
    `;

    container.appendChild(block);
  });
}

function printSummary() {
  window.print();
}

function resetSession() {
  localStorage.removeItem("sessionSummary");
  window.location.href = "game.html";
}

window.onload = loadSummary;

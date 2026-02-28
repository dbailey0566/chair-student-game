function loadSummary() {
  const container = document.getElementById("summaryContainer");
  const data = JSON.parse(localStorage.getItem("sessionSummary"));

  if (!data || !data.responses) {
    container.innerHTML = "<p>No session data found.</p>";
    return;
  }

  const header = document.createElement("div");
  header.innerHTML = `
    <h2>${data.title}</h2>
    <p><strong>Duration:</strong> ${data.duration} minutes</p>
    <p><strong>Reflection:</strong> ${data.reflection}</p>
    <hr>
  `;
  container.appendChild(header);

  data.responses.forEach((item, index) => {
    const block = document.createElement("div");
    block.classList.add("summary-block");

    block.innerHTML = `
      <h3>${item.suite.toUpperCase()} — Question ${index + 1}</h3>
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

function downloadPDF() {
  const content = document.body.innerHTML;
  const win = window.open("", "", "height=700,width=900");
  win.document.write("<html><head><title>Session Summary</title></head><body>");
  win.document.write(content);
  win.document.write("</body></html>");
  win.document.close();
  win.print();
}

function resetSession() {
  localStorage.removeItem("sessionSummary");
  window.location.href = "game.html";
}

window.onload = loadSummary;

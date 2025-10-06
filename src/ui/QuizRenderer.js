const quizContainer = document.getElementById("quizContainer");
const quizForm = document.getElementById("quizForm");
const resultsContainer = document.getElementById("resultsContainer");
const scoreText = document.getElementById("scoreText");
const submitButton = document.getElementById("submitButton");
const restartQuizButton = document.getElementById("restartQuizButton");
const clearAnswersButton = document.getElementById("clearAnswersButton");
const reloadQuizButton = document.getElementById("reloadQuizButton");

let currentQuizData = [];

export function setQuizData(data) {
  currentQuizData = data;
  clearAnswersButton.disabled = false;
  reloadQuizButton.disabled = false;
}

export function generateQuizUI(data) {
  quizForm.innerHTML = "";
  resultsContainer.classList.add("hidden");
  submitButton.classList.remove("hidden");
  submitButton.disabled = false;
  restartQuizButton.classList.add("hidden");

  if (data.length === 0) {
    quizContainer.classList.add("hidden");
    return;
  }

  data.forEach((q, index) => {
    const questionNumber = index + 1;

    const questionDiv = document.createElement("div");
    questionDiv.className =
      "p-5 border rounded-lg shadow-md hover:shadow-lg transition duration-200 question-box dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-xl";

    const questionTitle = document.createElement("h3");
    questionTitle.className =
      "text-lg font-semibold mb-4 question-title dark:text-gray-200";
    questionTitle.innerHTML = `<span class="text-blue-600 font-extrabold mr-2">${questionNumber}.</span> ${q.question}`;
    questionDiv.appendChild(questionTitle);

    q.options.forEach((option, optionIndex) => {
      const optionId = `q${index}_opt${optionIndex}`;
      const nameAttr = `question_${index}`;

      const optionLabel = document.createElement("label");
      optionLabel.setAttribute("for", optionId);
      optionLabel.classList.add(
        "flex",
        "items-center",
        "p-3",
        "mb-2",
        "cursor-pointer",
        "rounded-lg",
        "border",
        "transition",
        "duration-150",
        "ease-in-out",
        "option-label",
        "dark:border-gray-700",
        "dark:bg-gray-700",
        "dark:hover:bg-blue-800"
      );

      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.id = optionId;
      optionInput.name = nameAttr;
      optionInput.value = option;
      optionInput.className =
        "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-3 dark:bg-gray-600 dark:border-gray-500";

      const optionText = document.createElement("span");
      optionText.classList.add(
        "font-medium",
        "option-text",
        "dark:text-gray-300"
      );
      optionText.textContent = option;

      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(optionText);
      questionDiv.appendChild(optionLabel);
    });

    quizForm.appendChild(questionDiv);
  });

  quizContainer.classList.remove("hidden");
}

export function submitQuiz() {
  let correctCount = 0;
  const totalQuestions = currentQuizData.length;
  const formData = new FormData(quizForm);

  resultsContainer.classList.add("hidden");
  document.getElementById("message").classList.add("hidden");

  currentQuizData.forEach((_, index) => {
    const questionElement = quizForm.children[index];
    Array.from(questionElement.querySelectorAll("label")).forEach((label) => {
      label.classList.remove(
        "border-green-500",
        "bg-green-100",
        "border-red-500",
        "bg-red-100",
        "font-bold",
        "dark:bg-green-700",
        "dark:bg-red-700",
        "dark:border-green-700",
        "dark:border-red-700"
      );

      label.classList.add("hover:bg-blue-50");
    });
  });

  currentQuizData.forEach((question, index) => {
    const nameAttr = `question_${index}`;
    const selectedAnswer = formData.get(nameAttr);
    const questionElement = quizForm.children[index];

    const correctAnswerInput = questionElement.querySelector(
      `input[value="${question.correctAnswer}"]`
    );
    const correctLabel = correctAnswerInput
      ? correctAnswerInput.closest("label")
      : null;

    Array.from(questionElement.querySelectorAll("label")).forEach((label) =>
      label.classList.remove("hover:bg-blue-50")
    );
    questionElement
      .querySelectorAll('input[type="radio"]')
      .forEach((input) => (input.disabled = true));

    if (selectedAnswer === question.correctAnswer) {
      correctCount++;
      if (correctLabel) {
        correctLabel.classList.add(
          "border-green-500",
          "bg-green-100",
          "font-bold",
          "dark:bg-green-700",
          "dark:border-green-700"
        );
      }
    } else {
      if (selectedAnswer) {
        const wrongLabel = questionElement
          .querySelector(`input[value="${selectedAnswer}"]`)
          .closest("label");
        if (wrongLabel) {
          wrongLabel.classList.add(
            "border-red-500",
            "bg-red-100",
            "dark:bg-red-700",
            "dark:border-red-700"
          );
        }
      }

      if (correctLabel) {
        correctLabel.classList.add(
          "border-green-500",
          "bg-green-100",
          "font-bold",
          "dark:bg-green-700",
          "dark:border-green-700"
        );
      }
    }
  });

  const percentage = (correctCount / totalQuestions) * 100;
  scoreText.innerHTML = `Obtuviste <span class="text-3xl font-extrabold">${correctCount} de ${totalQuestions}</span> preguntas correctas. (${percentage.toFixed(
    0
  )}%)`;

  resultsContainer.classList.remove("hidden");
  submitButton.classList.add("hidden");
  restartQuizButton.classList.remove("hidden");

  window.scrollTo({
    top: resultsContainer.offsetTop - 20,
    behavior: "smooth",
  });
}

export function restartQuiz() {
  if (currentQuizData.length === 0) {
    alert("No hay examen cargado para reiniciar.");
    return;
  }
  generateQuizUI(currentQuizData);
  quizForm.reset();
  resultsContainer.classList.add("hidden");
  submitButton.classList.remove("hidden");
  restartQuizButton.classList.add("hidden");
  window.scrollTo({
    top: quizContainer.offsetTop - 20,
    behavior: "smooth",
  });
}

export function reloadQuiz() {
  if (currentQuizData.length === 0) {
    alert("No hay examen cargado para recargar.");
    return;
  }
  if (
    confirm(
      "⚠️ Advertencia: ¿Estás seguro de que quieres recargar el examen? Esto borrará tus respuestas actuales, volverá a mezclar las opciones y puede reordenar las preguntas."
    )
  ) {
    generateQuizUI(currentQuizData);
    quizForm.reset();

    const messageElement = document.getElementById("message");
    messageElement.textContent = `Examen recargado y respuestas borradas.`;
    messageElement.classList.add("text-green-600");
    messageElement.classList.remove("text-red-600", "hidden");
  }
}

export function clearAnswers() {
  if (currentQuizData.length === 0) {
    alert("No hay examen cargado para borrar respuestas.");
    return;
  }

  if (
    confirm(
      "⚠️ Advertencia: ¿Estás seguro de que quieres borrar todas tus respuestas marcadas?"
    )
  ) {
    quizForm.reset();
    resultsContainer.classList.add("hidden");
    submitButton.classList.remove("hidden");
    restartQuizButton.classList.add("hidden");

    currentQuizData.forEach((question, index) => {
      const questionElement = quizForm.children[index];
      if (!questionElement) return;

      questionElement
        .querySelectorAll('input[type="radio"]')
        .forEach((input) => (input.disabled = false));

      Array.from(questionElement.querySelectorAll("label")).forEach((label) => {
        label.classList.remove(
          "border-green-500",
          "bg-green-100",
          "font-bold",
          "border-red-500",
          "bg-red-100",
          "dark:bg-green-700",
          "dark:bg-red-700",
          "dark:border-green-700",
          "dark:border-red-700"
        );
        label.classList.add("hover:bg-blue-50");
      });
    });

    const messageElement = document.getElementById("message");
    messageElement.textContent = `Respuestas borradas con éxito.`;
    messageElement.classList.add("text-green-600");
    messageElement.classList.remove("text-red-600", "hidden");
  }
}

let questions = [];
let editIndex = -1;
let questionsListContainer;
let noQuestionsMessage;
const MAX_DISTRACTORS = 6;

function renderQuestion(q, index) {
  const li = document.createElement("li");
  li.className =
    "question-box p-4 border rounded-lg shadow-sm flex justify-between items-start light:bg-white light:border-gray-200 dark:bg-gray-700 dark:border-gray-600";
  li.innerHTML = `
        <div class="flex-grow">
            <p class="font-semibold text-lg question-title mb-2 light:text-gray-800 dark:text-gray-100">
                ${index + 1}. ${q.question}
            </p>
            <p class="text-sm text-green-600 dark:text-green-400 font-medium">
                Correcta: ${q.correctAnswer}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
                Incorrectas: ${q.options
                  .filter((opt) => opt !== q.correctAnswer)
                  .join(" | ")}
            </p>
        </div>
        <div class="flex space-x-2 ml-4 flex-shrink-0">
            <button
                data-index="${index}"
                class="edit-btn px-3 py-1 text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-100 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-150"
            >
                Editar
            </button>
            <button
                data-index="${index}"
                class="delete-btn px-3 py-1 text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-100 dark:bg-red-600 dark:hover:bg-red-700 transition duration-150"
            >
                Eliminar
            </button>
        </div>
    `;

  li.querySelector(".edit-btn").addEventListener("click", () =>
    startEdit(index)
  );
  li.querySelector(".delete-btn").addEventListener("click", () =>
    deleteQuestion(index)
  );

  return li;
}

function renderQuestionsList() {
  questionsListContainer.innerHTML = "";
  if (questions.length === 0) {
    noQuestionsMessage.classList.remove("hidden");
    document.getElementById("exportExamButton").disabled = true;
    return;
  }

  noQuestionsMessage.classList.add("hidden");
  document.getElementById("exportExamButton").disabled = false;
  questions.forEach((q, index) => {
    questionsListContainer.appendChild(renderQuestion(q, index));
  });
}

function addDistractorInput(value = "") {
  const container = document.getElementById("distractorsContainer");

  const currentInputCount = container.children.length - 1;

  if (currentInputCount >= MAX_DISTRACTORS) return;

  const inputGroup = document.createElement("div");
  inputGroup.className = "flex space-x-2 items-center distractor-input-group";

  const input = document.createElement("input");
  input.type = "text";

  input.placeholder = `Distractor ${currentInputCount + 1}`;
  input.value = value;
  input.className =
    "distractor-input mt-1 block w-full p-2 border border-red-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500";

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "✖";
  removeButton.className =
    "text-red-500 hover:text-red-700 font-bold p-2 text-lg transition duration-150";
  removeButton.onclick = () => {
    inputGroup.remove();
    updateDistractorPlaceholders();

    document.getElementById("addDistractorButton").disabled = false;
  };

  inputGroup.appendChild(input);
  inputGroup.appendChild(removeButton);
  container.appendChild(inputGroup);

  if (container.children.length - 1 >= MAX_DISTRACTORS) {
    document.getElementById("addDistractorButton").disabled = true;
  }
}

function updateDistractorPlaceholders() {
  const inputs = document.querySelectorAll(
    "#distractorsContainer .distractor-input-group input"
  );
  inputs.forEach((input, index) => {
    input.placeholder = `Distractor ${index + 1}`;
  });

  document.getElementById("addDistractorButton").disabled =
    inputs.length >= MAX_DISTRACTORS;
}

export function resetForm() {
  document.getElementById("questionText").value = "";
  document.getElementById("correctAnswerText").value = "";
  const container = document.getElementById("distractorsContainer");

  const distractorGroups = document.querySelectorAll(".distractor-input-group");
  distractorGroups.forEach((group) => group.remove());

  document.getElementById("saveQuestionButton").textContent =
    "Guardar Pregunta";
  editIndex = -1;

  addDistractorInput();
  addDistractorInput();
  updateDistractorPlaceholders();
}

function saveQuestion() {
  const question = document.getElementById("questionText").value.trim();
  const correctAnswer = document
    .getElementById("correctAnswerText")
    .value.trim();
  const distractorInputs = document.querySelectorAll(".distractor-input");

  const distractors = Array.from(distractorInputs)
    .map((input) => input.value.trim())
    .filter((val) => val !== "" && val !== correctAnswer);

  if (!question || !correctAnswer || distractors.length === 0) {
    alert(
      "Debes ingresar una pregunta, la respuesta correcta y al menos un distractor único."
    );
    return;
  }

  const allOptions = [correctAnswer, ...distractors];

  const uniqueOptions = new Set(allOptions.map((opt) => opt.toLowerCase()));
  if (uniqueOptions.size < allOptions.length) {
    alert("Las opciones (correcta y distractores) no deben estar duplicadas.");
    return;
  }

  const newQuestion = {
    question,
    correctAnswer,
    options: allOptions,
  };

  if (editIndex === -1) {
    questions.push(newQuestion);
  } else {
    questions[editIndex] = newQuestion;
  }

  resetForm();
  renderQuestionsList();
}

function startEdit(index) {
  editIndex = index;
  const q = questions[index];

  document.getElementById("questionText").value = q.question;
  document.getElementById("correctAnswerText").value = q.correctAnswer;
  document.getElementById("saveQuestionButton").textContent =
    "Actualizar Pregunta";

  const distractorGroups = document.querySelectorAll(".distractor-input-group");
  distractorGroups.forEach((group) => group.remove());

  const currentDistractors = q.options.filter((opt) => opt !== q.correctAnswer);
  currentDistractors.forEach((distractor) => addDistractorInput(distractor));

  while (
    document.querySelectorAll(".distractor-input-group").length <
    MAX_DISTRACTORS
  ) {
    addDistractorInput();
  }
  updateDistractorPlaceholders();
}

function deleteQuestion(index) {
  if (confirm("¿Estás seguro de que quieres eliminar esta pregunta?")) {
    questions.splice(index, 1);
    renderQuestionsList();
    if (editIndex === index) {
      resetForm();
    }
  }
}

export function initializeQuestionManager(containerElement) {
  questionsListContainer = containerElement;
  noQuestionsMessage = document.getElementById("noQuestionsMessage");
  document
    .getElementById("saveQuestionButton")
    .addEventListener("click", saveQuestion);
  document
    .getElementById("addDistractorButton")
    .addEventListener("click", () => addDistractorInput(""));

  renderQuestionsList();
}

export function getQuestions() {
  return questions;
}

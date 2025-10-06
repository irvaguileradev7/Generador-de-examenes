import { initializeTheme } from "./core/themeManager.js";
import {
  processExcelFile,
  downloadTemplate,
  exportQuestionsToExcel,
} from "./core/excelProcessor.js";
import {
  setQuizData,
  generateQuizUI,
  submitQuiz,
  restartQuiz,
  reloadQuiz,
  clearAnswers,
} from "./ui/QuizRenderer.js";
import {
  initializeQuestionManager,
  getQuestions,
  resetForm,
} from "./ui/QuestionManager.js";

const excelFileInput = document.getElementById("excelFile");
const downloadTemplateButton = document.getElementById(
  "downloadTemplateButton"
);
const submitButton = document.getElementById("submitButton");
const restartQuizButton = document.getElementById("restartQuizButton");
const reloadQuizButton = document.getElementById("reloadQuizButton");
const clearAnswersButton = document.getElementById("clearAnswersButton");
const messageElement = document.getElementById("message");
const quizContainer = document.getElementById("quizContainer");

const newExamButton = document.getElementById("newExamButton");
const uploadExamButton = document.getElementById("uploadExamButton");
const examCreatorContainer = document.getElementById("examCreatorContainer");
const excelUploaderContainer = document.getElementById(
  "excelUploaderContainer"
);
const exportExamButton = document.getElementById("exportExamButton");

function toggleView(view) {
  excelUploaderContainer.classList.add("hidden");
  examCreatorContainer.classList.add("hidden");
  quizContainer.classList.add("hidden");

  messageElement.classList.add("hidden");
  document.getElementById("resultsContainer").classList.add("hidden");
  setQuizData([]);
  document.getElementById("quizForm").innerHTML = "";

  if (view === "upload") {
    excelUploaderContainer.classList.remove("hidden");
  } else if (view === "create") {
    examCreatorContainer.classList.remove("hidden");
    resetForm();
  }
}

async function handleFileChange(event) {
  messageElement.classList.add("hidden");
  quizContainer.classList.add("hidden");

  setQuizData([]);

  const file = event.target.files[0];
  if (!file) return;

  try {
    const questions = await processExcelFile(file);
    setQuizData(questions);
    generateQuizUI(questions);
    quizContainer.classList.remove("hidden");
    messageElement.textContent = `Éxito: Se cargaron ${questions.length} preguntas.`;
    messageElement.classList.remove("text-red-600");
    messageElement.classList.add("text-green-600");
    messageElement.classList.remove("hidden");
  } catch (error) {
    console.error("Error al procesar el archivo Excel:", error);
    messageElement.textContent = `Error: ${error.message}`;
    messageElement.classList.add("text-red-600");
    messageElement.classList.remove("text-green-600");
    messageElement.classList.remove("hidden");
    excelFileInput.value = "";
  }
}

function handleExportExam() {
  const questions = getQuestions();
  if (questions.length === 0) {
    alert("Agrega al menos una pregunta para exportar.");
    return;
  }
  exportQuestionsToExcel(questions);
}

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();

  initializeQuestionManager(document.getElementById("questionsList"));
  toggleView("upload");

  excelFileInput.addEventListener("change", handleFileChange);
  downloadTemplateButton.addEventListener("click", downloadTemplate);
  submitButton.addEventListener("click", submitQuiz);
  restartQuizButton.addEventListener("click", restartQuiz);
  reloadQuizButton.addEventListener("click", reloadQuiz);
  clearAnswersButton.addEventListener("click", clearAnswers);

  newExamButton.addEventListener("click", () => toggleView("create"));
  uploadExamButton.addEventListener("click", () => toggleView("upload"));
  exportExamButton.addEventListener("click", handleExportExam);
});

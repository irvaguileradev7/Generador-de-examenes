import { initializeTheme } from "./core/themeManager.js";
import { processExcelFile, downloadTemplate } from "./core/excelProcessor.js";
import {
  setQuizData,
  generateQuizUI,
  submitQuiz,
  restartQuiz,
  reloadQuiz,
  clearAnswers,
} from "./ui/QuizRenderer.js";

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

document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();

  excelFileInput.addEventListener("change", handleFileChange);
  downloadTemplateButton.addEventListener("click", downloadTemplate);
  submitButton.addEventListener("click", submitQuiz);
  restartQuizButton.addEventListener("click", restartQuiz);
  reloadQuizButton.addEventListener("click", reloadQuiz);
  clearAnswersButton.addEventListener("click", clearAnswers);
});

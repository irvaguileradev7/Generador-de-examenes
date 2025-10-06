import { shuffleArray } from "./utils.js";

export async function processExcelFile(file) {
  if (typeof XLSX === "undefined") {
    throw new Error(
      "La librería XLSX no está cargada. Verifica el CDN en index.html."
    );
  }

  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const questions = excelData
    .slice(1)
    .map((row) => {
      const questionText = row[0];
      const correctAnswer = row[1];
      const distractors = row
        .slice(2)
        .filter(
          (opt) =>
            opt !== undefined && opt !== null && String(opt).trim() !== ""
        );

      if (!questionText || !correctAnswer || distractors.length === 0) {
        return null;
      }

      const allOptions = [
        String(correctAnswer).trim(),
        ...distractors.map(String).map((s) => s.trim()),
      ];
      shuffleArray(allOptions);

      return {
        question: String(questionText).trim(),
        correctAnswer: String(correctAnswer).trim(),
        options: allOptions,
      };
    })
    .filter((q) => q !== null);

  if (questions.length === 0) {
    throw new Error(
      "No se encontraron preguntas válidas. Verifica que tengas al menos Pregunta, Respuesta Correcta y un Distractor."
    );
  }

  return questions;
}

export function downloadTemplate() {
  if (typeof XLSX === "undefined") {
    alert("La librería XLSX no está cargada. Verifica el CDN.");
    return;
  }

  const ws_data = [
    [
      "Pregunta",
      "Respuesta Correcta",
      "Distractor 1",
      "Distractor 2",
      "Distractor 3",
    ],
    ["¿Cuál es la capital de Francia?", "París", "Londres", "Berlín", "Madrid"],
    [
      "El cuerpo humano tiene 206 huesos. (Verdadero/Falso)",
      "Verdadero",
      "Falso",
      "",
      "",
    ],
    ["¿En qué año llegó el hombre a la luna?", "1969", "1972", "1965", "1980"],
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  ws["!cols"] = [
    { wch: 40 },
    { wch: 25 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Preguntas");
  XLSX.writeFile(wb, "Formato_Examen_Plantilla.xlsx");
}

export function exportQuestionsToExcel(questions) {
  if (typeof XLSX === "undefined") {
    alert("La librería XLSX no está cargada. Verifica el CDN.");
    return;
  }

  const MAX_DISTRACTORS_EXPORT = 6;
  const header = [
    "Pregunta",
    "Respuesta Correcta",
    ...Array.from(
      { length: MAX_DISTRACTORS_EXPORT },
      (_, i) => `Distractor ${i + 1}`
    ),
  ];

  const data = questions.map((q) => {
    const row = [q.question, q.correctAnswer];

    const distractors = q.options.filter((opt) => opt !== q.correctAnswer);

    for (let i = 0; i < MAX_DISTRACTORS_EXPORT; i++) {
      row.push(distractors[i] || "");
    }

    return row;
  });

  const ws_data = [header, ...data];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  ws["!cols"] = [
    { wch: 40 },
    { wch: 25 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Examen Creado");
  XLSX.writeFile(wb, "Examen_Personalizado.xlsx");
}

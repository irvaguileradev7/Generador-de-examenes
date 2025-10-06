# Generador de Exámenes desde Excel

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Una aplicación web de una sola página (SPA) que permite a los usuarios **cargar un archivo Excel (.xlsx)** y transformarlo instantáneamente en un **examen interactivo** con opciones de respuesta mezcladas y corrección automática. Diseñado con una arquitectura modular y enfocado en la usabilidad y la compatibilidad con diferentes temas (Claro/Oscuro).

---

## 🌟 Características

* **Carga de Archivos:** Procesa archivos `.xlsx` usando la librería `SheetJS/js-xlsx`.
* **Generación Dinámica:** Convierte filas de Excel en preguntas con opciones de respuesta aleatorias.
* **Corrección Automática:** Evalúa las respuestas del usuario y muestra la puntuación y las respuestas correctas/incorrectas.
* **Gestión de Temas:** Soporte para modo **Claro**, **Oscuro** y la preferencia del **Sistema**, con persistencia local.
* **Diseño Responsivo:** Interfaz construida con **Tailwind CSS** para una excelente experiencia en escritorio y móvil.
* **Arquitectura Modular:** Código refactorizado con módulos ES6 (`import/export`) para una fácil escalabilidad y mantenimiento.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías y librerías, cargadas a través de CDN para máxima simplicidad de ejecución:

* **HTML5 / JavaScript (ES6 Modules)**
* **Estilización:** **Tailwind CSS** (v3)
* **Procesamiento de Excel:** **SheetJS/js-xlsx**
* **Estructura del Código:** Módulos JavaScript para separar la lógica de negocio (`/core`) de la interfaz de usuario (`/ui`).

---

## 🚀 Uso e Instalación

Este proyecto está diseñado para funcionar de forma completamente local y no requiere de ningún servidor web ni instalación de dependencias (Node.js, etc.).

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/irvaguileradev7/Generador-de-examenes.git
    cd generador-de-examenes
    ```
2.  **Ejecutar:** Simplemente abre el archivo **`index.html`** en cualquier navegador moderno.
3.  **Cargar Examen:** Utiliza el botón **"Descargar plantilla de Excel"** para conocer el formato requerido (Columna A: Pregunta, Columna B: Respuesta Correcta, C en adelante: Distractores). Luego, sube tu archivo con el botón **"Seleccionar Archivo Excel"**.

---

## 🗂️ Estructura del Proyecto

La aplicación sigue una arquitectura modular para mejorar la organización del código:
/generador-examenes/
├── index.html             # Punto de entrada principal (la aplicación web)
├── LICENSE                # Archivo de licencia (actualmente MIT)
├── README.md              # Documentación principal del proyecto (este archivo)
└── src/                   # Contiene todo el código fuente de la aplicación
    ├── core/              # Lógica central del negocio (independiente de la UI)
    │   ├── excelProcessor.js  # Carga y parseo de datos desde archivos Excel.
    │   ├── themeManager.js    # Manejo del modo Claro/Oscuro y persistencia de la preferencia.
    │   └── utils.js           # Colección de funciones auxiliares (ej. shuffleArray).
    ├── ui/                    # Componentes y lógica de la Interfaz de Usuario (UI)
    │   ├── QuizRenderer.js    # Lógica de renderizado del examen, manejo de respuestas y corrección.
    │   └── TopBar.js          # Manejo de la barra de navegación superior (eventos, interacciones).
    ├── styles/                # Hojas de estilo
    │   └── styles.css         # Estilos personalizados de la aplicación y reglas de Dark Mode.
    └── main.js                # Coordinador principal: Inicializa los módulos de /core/, /ui/ y configura los listeners.

---

## 📄 Licencia

Este proyecto es **Open Source** y está liberado bajo la **Licencia MIT**.

Eres libre de usar, modificar y distribuir el código, siempre y cuando se incluya la nota de copyright y el texto de la licencia. Para más detalles, consulta el archivo [LICENSE](LICENSE).

&copy; 2025 Kevin Irving Aguilera Pérez
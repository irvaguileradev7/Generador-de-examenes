# Generador de Exámenes desde Excel (Prueba Técnica)

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
    cd generador-examenes
    ```
2.  **Ejecutar:** Simplemente abre el archivo **`index.html`** en cualquier navegador moderno.
3.  **Cargar Examen:** Utiliza el botón **"Descargar plantilla de Excel"** para conocer el formato requerido (Columna A: Pregunta, Columna B: Respuesta Correcta, C en adelante: Distractores). Luego, sube tu archivo con el botón **"Seleccionar Archivo Excel"**.

---

## 🗂️ Estructura del Proyecto

La aplicación sigue una arquitectura modular para mejorar la organización del código:
// backend/src/utils/generarComentariosSimulados.ts

/**
 * @file Utilidad para generar comentarios simulados para el análisis de percepción.
 * @module utils/generarComentariosSimulados
 */

// Define un tipo para la estructura de un comentario simulado
export interface SimulatedComment {
  id: string; // ID único para el comentario simulado
  text: string; // Contenido del comentario
  countryCode: string; // Código de país al que pertenece el comentario (ej. '170' para Colombia)
  language: string; // Idioma del comentario (ej. 'es' para español)
  timestamp: Date; // Marca de tiempo de la simulación
}

/**
 * Genera un array de comentarios simulados para un país y una cantidad específica.
 * Los comentarios incluyen variaciones de sentimiento y palabras clave relacionadas con Omotenashi.
 *
 * @param countryCode El código numérico ISO del país (ej. '170' para Colombia).
 * @param count La cantidad de comentarios a generar.
 * @returns Un array de objetos SimulatedComment.
 */
export const generarComentariosSimulados = (countryCode: string, count: number): SimulatedComment[] => {
  const comments: SimulatedComment[] = [];
  const positiveKeywords = ['excelente servicio', 'amabilidad', 'atención al cliente excepcional', 'hospitalidad', 'trato excelente', 'super amables', 'siempre dispuestos a ayudar'];
  const negativeKeywords = ['mal servicio', 'grosero', 'mala atención', 'poca ayuda', 'desagradable', 'retraso', 'ineficiente'];
  const neutralKeywords = ['ok', 'normal', 'correcto', 'estándar', 'sin novedad'];

  const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  for (let i = 0; i < count; i++) {
    let commentText: string;
    const randomType = Math.random(); // Decide si es positivo, negativo o neutral

    if (randomType < 0.6) { // 60% positivos
      commentText = `La experiencia fue ${getRandomElement(positiveKeywords)}. Muy recomendado.`;
    } else if (randomType < 0.8) { // 20% negativos
      commentText = `Tuve un ${getRandomElement(negativeKeywords)}. Podría mejorar.`;
    } else { // 20% neutrales
      commentText = `El servicio fue ${getRandomElement(neutralKeywords)}. Nada fuera de lo común.`;
    }

    comments.push({
      id: `${countryCode}-${i}-${Date.now()}`, // ID simple para simulación
      text: commentText,
      countryCode: countryCode,
      language: 'es', // Por simplicidad, asumimos español
      timestamp: new Date(),
    });
  }

  return comments;
};

// Ejemplo de uso (esto no se ejecutará al importar, solo para referencia)
// const colombiaComments = generarComentariosSimulados('170', 10);
// console.log(colombiaComments);
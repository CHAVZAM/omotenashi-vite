// backend/utils/analizarComentariosPorPais.ts
import Sentiment from 'sentiment';

const palabrasClaveOmotenashi = [
  'amabilidad', 'puntualidad', 'respeto', 'atención', 'hospitalidad',
  'servicio', 'cordialidad', 'trato', 'excelente', 'eficiencia',
  'cortesía', 'detalle', 'calidez', 'agrado', 'simpatía'
];

interface Comentario {
  pais: string;
  texto: string;
}

interface ResultadoPais {
  pais: string;
  sentimientoPromedio: number;
  coincidenciasClave: number;
  totalComentarios: number;
}

export function analizarComentariosPorPais(comentarios: Comentario[]): ResultadoPais[] {
  const sentiment = new Sentiment();

  const resultadosPorPais: Record<string, { sentimientoTotal: number; coincidencias: number; total: number }> = {};

  for (const comentario of comentarios) {
    const { pais, texto } = comentario;
    const resultado = sentiment.analyze(texto);
    const coincidencias = palabrasClaveOmotenashi.filter(palabra =>
      texto.toLowerCase().includes(palabra)
    ).length;

    if (!resultadosPorPais[pais]) {
      resultadosPorPais[pais] = { sentimientoTotal: 0, coincidencias: 0, total: 0 };
    }

    resultadosPorPais[pais].sentimientoTotal += resultado.score;
    resultadosPorPais[pais].coincidencias += coincidencias;
    resultadosPorPais[pais].total += 1;
  }

  return Object.entries(resultadosPorPais).map(([pais, data]) => ({
    pais,
    sentimientoPromedio: parseFloat((data.sentimientoTotal / data.total).toFixed(2)),
    coincidenciasClave: data.coincidencias,
    totalComentarios: data.total,
  }));
}

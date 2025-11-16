// backend/services/perceptionService.ts

import { scrapeTripAdvisorPuppeteer } from '../utils/scrapeTripAdvisorPuppeteer';
import Sentiment from 'sentiment';
import pool from '../db';
import { generarComentariosSimulados } from '../utils/generarComentariosSimulados';

type ScrapedComment = {
  text: string;
  rating?: number;
};

const omotenashiLexicon = {
  'excelente servicio': 5, 'amabilidad': 4, 'atención excepcional': 5, 'hospitalidad': 5,
  'trato excelente': 4, 'super amables': 4, 'dispuestos a ayudar': 4, 'calidad humana': 5,
  'profesionalismo': 3, 'cortesía': 3, 'eficiente': 2, 'bueno': 2, 'buena': 2, 'buena calidad': 3,
  'puntuales': 3, 'maravillosa': 4, 'impecable': 4, 'atento': 3, 'atenta': 3, 'servicial': 4,
  'excepcional': 5, 'increíble': 4, 'fantástico': 4, 'delicioso': 2, 'limpio': 3, 'limpia': 3,
  'recomendable': 3, 'volvería': 4, 'superó expectativas': 5, 'detalle': 3, 'detalles': 3,
  'cuidado': 3, 'resolvieron': 3, 'ágil': 2, 'rápido': 2, 'ágiles': 2, 'rápidos': 2,
  'bienvenidos': 3, 'bienvenido': 3, 'bienvenida': 3, 'personalizado': 4, 'agradable': 3,
  'cómodo': 3, 'cómoda': 3, 'experiencia única': 5, 'memorables': 4, 'memorable': 4,
  'un placer': 4, 'sorprendente': 4,
  'mal servicio': -5, 'grosero': -4, 'mala atención': -5, 'poca ayuda': -3, 'desagradable': -4,
  'retraso': -2, 'ineficiente': -3, 'descortés': -3, 'indiferente': -4, 'mal': -2, 'mala': -2,
  'pesima': -4, 'horrible': -5, 'sucio': -3, 'sucia': -3, 'lento': -2, 'lenta': -2, 'espera': -2,
  'descuidado': -3, 'ruidoso': -2, 'ruidosa': -2, 'problema': -3, 'problemas': -3,
  'decepcionante': -4, 'caro': -2, 'demora': -2, 'ignoraron': -3, 'pésimo': -4, 'terrible': -4,
  'decaído': -3, 'nunca más': -5, 'no volvería': -5, 'no recomendable': -4, 'inaccesible': -3,
  'confuso': -2, 'confusa': -2, 'desorganizado': -3, 'desorganizada': -3, 'fraude': -5,
  'engaño': -5, 'queja': -3, 'quejas': -3, 'insatisfecho': -4, 'insatisfecha': -4,
};

const S = new Sentiment(omotenashiLexicon);

const analyzeCommentSentiment = (text: string): number => {
  const result = S.analyze(text);
  return result.score;
};

export const updatePerceptionScoreForCountry = async (
  countryCode: string,
  commentCount: number = 100
): Promise<number | null> => {
  try {
    const rawComments = await scrapeTripAdvisorPuppeteer(
      "https://www.tripadvisor.com.mx/Hotel_Review-g10487549-d12921262-Reviews-Grandvrio_Ocean_Resort_Danang-Dien_Ban_Quang_Nam_Province.html"
    );

    if (rawComments.length === 0) {
      console.warn(`No se encontraron comentarios reales para el país: ${countryCode}`);
      return null;
    }

    const comments = rawComments.slice(0, commentCount).map((comment) => ({
      text: comment.text,
      rating: comment.rating || 5,
    }));

    let totalScore = 0;
    comments.forEach((comment) => {
      const sentiment = analyzeCommentSentiment(comment.text);
      const normalizedRating = comment.rating * 2;
      const combinedScore = sentiment * 0.7 + normalizedRating * 0.3;
      totalScore += combinedScore;
    });

    const avgSentiment = totalScore / comments.length;
    const mappedScore = Math.max(0, Math.min(10, ((avgSentiment + 5) * 10) / 10));
    const finalScore = parseFloat(mappedScore.toFixed(1));

    const query = `
      INSERT INTO paises_percepcion (country_code, country_name, score, source, data_count)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        score = VALUES(score),
        source = VALUES(source),
        data_count = VALUES(data_count);
    `;

    let countryName = `País ${countryCode}`;
    if (countryCode === '170') countryName = 'Colombia';
    if (countryCode === '840') countryName = 'United States';
    if (countryCode === '392') countryName = 'Japan';

    await pool.query(query, [
      countryCode,
      countryName,
      finalScore,
      `TripAdvisor: ${comments.length} comentarios`,
      comments.length,
    ]);

    console.log(`Percepción Omotenashi para ${countryName} (${countryCode}) actualizada a: ${finalScore}`);
    return finalScore;
  } catch (error) {
    console.error(`Error al actualizar percepción para país ${countryCode}:`, error);
    throw error;
  }
};

export const updateAllPerceptionScores = async (): Promise<void> => {
  const countryCodesToUpdate = ['170', '840', '392', '076', '250', '276', '356', '724'];
  console.log('Iniciando actualización global de percepción Omotenashi...');
  for (const code of countryCodesToUpdate) {
    await updatePerceptionScoreForCountry(code);
  }
  console.log('Actualización completa.');
};

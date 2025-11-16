// backend/utils/sources/scrapeTripAdvisor.ts

import axios from "axios";
import * as cheerio from "cheerio";

export interface ScrapedComment {
  text: string;
  rating: number; // de 1.0 a 5.0
}

/**
 * Scrapea comentarios públicos desde una URL de TripAdvisor.
 * @param url URL completa de TripAdvisor (página de reseñas públicas)
 * @param limit Número máximo de comentarios a extraer (por defecto: 20)
 * @returns Lista de comentarios con su texto y puntuación
 */
export async function scrapeTripAdvisor(url: string, limit: number = 20): Promise<ScrapedComment[]> {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OmotenashiBot/1.0)",
      },
    });

    const $ = cheerio.load(response.data);
    const reviews: ScrapedComment[] = [];

    // Seleccionamos los contenedores de comentarios visibles
    $("div[data-reviewid]").each((_, el) => {
      const text = $(el).find("q span").first().text().trim();

      // Buscamos la clase que indica la puntuación, ej: bubble_50 (5 estrellas)
      const ratingClass = $(el).find(".ui_bubble_rating").attr("class");
      let rating = 0;

      const match = ratingClass?.match(/bubble_(\d+)/);
      if (match && match[1]) {
        rating = parseInt(match[1], 10) / 10; // bubble_50 → 5.0
      }

      if (text && rating > 0) {
        reviews.push({ text, rating });
      }

      if (reviews.length >= limit) return false; // salir del bucle
    });

    return reviews;
  } catch (error) {
    console.error("Error al scrapear TripAdvisor:", error);
    return [];
  }
}

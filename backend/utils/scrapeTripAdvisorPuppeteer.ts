import { launchServerlessBrowser } from "./browser";

export interface ScrapedComment {
  text: string;
  rating: number; // de 0.0 a 10.0 (escala de 0 a 5 de TripAdvisor convertida)
}

/**
 * Scrapea comentarios visibles de la primera página de TripAdvisor usando Puppeteer.
 * Extrae tanto el texto del comentario como la puntuación de estrellas.
 * @param url URL del sitio de TripAdvisor.
 * @param limit Número máximo de comentarios a extraer (por defecto: 20)
 * @returns Array de objetos { text: string, rating: number }.
 */
export const scrapeTripAdvisorPuppeteer = async (
  url: string,
  limit: number = 20
): Promise<ScrapedComment[]> => {
  const browser = await launchServerlessBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    // Nuevo selector para el contenedor del comentario
    await page.waitForSelector(".YibKl.MC._a.Gi.z.Z.Bb.pBbQr", {
      timeout: 15000,
    });

    const reviews = await page.$$eval(
      ".YibKl.MC._a.Gi.z.Z.Bb.pBbQr",
      (reviewNodes: Element[], limit: number) => {
        const scrapedData: { text: string; rating: number }[] = [];

        for (const node of reviewNodes) {
          if (scrapedData.length >= limit) break;

          // Nuevo selector para el texto del comentario
          const textElement = node.querySelector(".QewHA.H4._a");
          const text = textElement?.textContent?.trim() || "";

          // Nuevo selector para la puntuación de estrellas
          const ratingElement = node.querySelector(".Istars.f.u0");
          let rating = 0;

          if (ratingElement) {
            // Extraer la puntuación de la clase CSS, por ejemplo 'bubble_50' para 5 estrellas
            const ratingClass = ratingElement.getAttribute("class");
            const match = ratingClass?.match(/bubble_(\d+)/);
            if (match && match[1]) {
              const stars = parseInt(match[1], 10) / 10; // Convierte 50 -> 5.0
              rating = (stars / 5) * 10; // Escala a 10
            }
          }

          if (text && rating > 0) {
            scrapedData.push({ text, rating });
          }
        }

        return scrapedData;
      },
      limit
    );

    console.log(
      `🟢 Se extrajeron ${reviews.length} comentarios de TripAdvisor`
    );
    return reviews;
  } catch (err: any) {
    console.error("❌ Error durante el scraping con Puppeteer:", err.message);
    return [];
  } finally {
    await browser.close();
  }
};

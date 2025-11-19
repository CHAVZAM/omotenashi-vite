// backend/utils/scrapers/scrapeTrustpilot.ts
import { launchServerlessBrowser } from './browser';

export interface ScrapedComment {
  text: string;
  rating: number; // escala 0 a 10, normalizada desde estrellas (1–5)
}

/**
 * Scrapea comentarios visibles de la primera página de Trustpilot.
 * @param url URL pública de Trustpilot (ej: https://www.trustpilot.com/review/www.booking.com)
 * @param limit Máximo número de comentarios a extraer
 */
export const scrapeTrustpilot = async (url: string, limit: number = 20): Promise<ScrapedComment[]> => {
  const browser = await launchServerlessBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('section.styles_reviewCard__hcAvl', { timeout: 15000 });

    const reviews = await page.$$eval(
      'section.styles_reviewCard__hcAvl',
      (reviewNodes: Element[], limit: number) => {
        const scraped: ScrapedComment[] = [];

        for (const node of reviewNodes) {
          if (scraped.length >= limit) break;

          const text = node.querySelector('p.styles_reviewContent__0Q2Tg')?.textContent?.trim() || '';

          const ratingTag = node.querySelector('div.star-rating')?.getAttribute('data-service-review-rating');
          let rating = 0;

          if (ratingTag) {
            const parsed = parseInt(ratingTag, 10);
            if (!isNaN(parsed)) {
              rating = (parsed / 5) * 10; // normalizamos a escala 10
            }
          }

          if (text && rating > 0) {
            scraped.push({ text, rating });
          }
        }

        return scraped;
      },
      limit
    );

    console.log(`🟢 Se extrajeron ${reviews.length} comentarios de Trustpilot`);
    return reviews;
  } catch (err: any) {
    console.error('❌ Error durante el scraping de Trustpilot:', err.message);
    return [];
  } finally {
    await browser.close();
  }
};

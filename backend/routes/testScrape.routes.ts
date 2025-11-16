// backend/routes/testScrape.routes.ts
import { Router, Request, Response } from 'express';
import { scrapeTripAdvisorPuppeteer } from '../utils/scrapeTripAdvisorPuppeteer';

const router = Router();

router.get('/test-scrape', async (req: Request, res: Response) => {
  const url = req.query.url as string || 'https://www.tripadvisor.com.mx/ShowUserReviews-g147249-d148673-r823715031-Eagle_Aruba_Resort-Palm_Eagle_Beach_Aruba.html';

  try {
    const data = await scrapeTripAdvisorPuppeteer(url, 20);

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se extrajeron comentarios. Revisa los selectores o cambia de URL.',
      });
    }

    return res.json({
      success: true,
      total: data.length,
      comentarios: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error al scrapear la URL.' });
  }
});

export default router;

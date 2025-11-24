// import chromium from "@sparticuz/chromium"; // <-- ELIMINAR IMPORT EAGER
import type { Browser } from "puppeteer-core";
// import puppeteer from "puppeteer-core"; // <-- ELIMINAR IMPORT EAGER

const resolveExecutablePath = async (): Promise<string> => {
  if (process.env.CHROME_EXECUTABLE_PATH) {
    return process.env.CHROME_EXECUTABLE_PATH;
  }

  // ✅ Lazy Import
  const chromium = (await import("@sparticuz/chromium")).default;
  const chromiumPath = await chromium.executablePath();
  if (chromiumPath) {
    return chromiumPath;
  }

  try {
    const fullPuppeteer = await import("puppeteer");
    return fullPuppeteer.executablePath();
  } catch (error) {
    console.error(
      "No se encontró un binario de Chrome disponible. Define CHROME_EXECUTABLE_PATH."
    );
    throw error;
  }
};

export const launchServerlessBrowser = async (): Promise<Browser> => {
  // ✅ Lazy Imports
  const chromium = (await import("@sparticuz/chromium")).default;
  const puppeteer = (await import("puppeteer-core")).default;

  const executablePath = await resolveExecutablePath();
  const headlessValue =
    chromium.headless === "shell" ? "shell" : Boolean(chromium.headless);

  return puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: headlessValue,
  });
};

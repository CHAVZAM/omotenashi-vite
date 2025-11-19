import chromium from "@sparticuz/chromium";
import type { Browser } from "puppeteer-core";
import puppeteer from "puppeteer-core";

const resolveExecutablePath = async (): Promise<string> => {
  if (process.env.CHROME_EXECUTABLE_PATH) {
    return process.env.CHROME_EXECUTABLE_PATH;
  }

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

// backend/upload.ts

import fs from "fs";
import path from "path";
import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

const isServerlessRuntime = Boolean(
  process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_VERSION ||
    process.env.LAMBDA_TASK_ROOT
);

const serverlessUploadsDir = path.posix.join("/tmp", "uploads");
const localUploadsDir = path.join(process.cwd(), "uploads");

const userDefinedDir = process.env.UPLOADS_DIR;

const computeUploadsDir = (): string => {
  if (isServerlessRuntime) {
    if (userDefinedDir && userDefinedDir.startsWith("/tmp")) {
      return userDefinedDir;
    }
    return serverlessUploadsDir;
  }

  if (userDefinedDir) {
    return path.resolve(userDefinedDir);
  }

  return localUploadsDir;
};

export const uploadsDir = computeUploadsDir();

const ensureUploadsDir = () => {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (error) {
    if (!isServerlessRuntime) {
      throw error;
    }
    console.warn("No se pudo crear el directorio temporal en serverless:", error);
  }
};

ensureUploadsDir();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        encodeURIComponent(file.originalname.replace(/\s/g, "_"))
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Tipo de archivo no soportado. Solo se aceptan JPG, PNG, o PDF."
      )
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

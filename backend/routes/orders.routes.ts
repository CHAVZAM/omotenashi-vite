// backend/routes/orders.routes.ts

import { Router } from "express";
import { upload } from "../upload";           // 👈 OJO AQUÍ: ../upload
import { createOrder } from "../controllers/orders.controller";
import catchAsync from "../utils/catchAsync";

const ordersRouter = Router();

ordersRouter.post(
  "/create-order",
  upload.single("proofFile"),
  catchAsync(createOrder)
);

export default ordersRouter;

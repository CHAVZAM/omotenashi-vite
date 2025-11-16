import express from "express";
import pool from "../db";

const router = express.Router();

// GET /api/posts
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener posts:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;

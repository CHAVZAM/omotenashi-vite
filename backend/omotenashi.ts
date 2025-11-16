import express from 'express';
import pool from './db';

const router = express.Router();

// GET: obtener todas las evaluaciones
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM omotenashi_evaluaciones ORDER BY fecha DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener evaluaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST: registrar una nueva evaluación
router.post('/', async (req, res) => {
  try {
    const {
      tipo,
      nombre,
      correo,
      profesion,
      empresa,
      correo_empresa,
      sector,
      empleados,
      pais,
      ciudad,
      respuestas,
      igo_scores,
      cso,
      leyenda
    } = req.body;

    const query = `
      INSERT INTO omotenashi_evaluaciones 
      (tipo, nombre, correo, profesion, empresa, correo_empresa, sector, empleados, pais, ciudad, respuestas, igo_scores, cso, leyenda)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      tipo, nombre, correo, profesion, empresa, correo_empresa,
      sector, empleados, pais, ciudad, JSON.stringify(respuestas),
      JSON.stringify(igo_scores), cso, leyenda
    ];

    const [result] = await pool.query(query, values);

    res.status(201).json({
      message: 'Evaluación registrada correctamente',
      id: (result as any).insertId
    });
  } catch (error) {
    console.error('Error al guardar evaluación:', error);
    res.status(500).json({ error: 'Error al registrar evaluación' });
  }
});

export default router;

// backend/controllers/formacion.controller.ts

import { Request, Response } from 'express';
import db from '../db'; 

// 1. Endpoint para OBTENER el progreso del usuario
export const getProgreso = async (req: Request, res: Response) => {
    try {
        // En una app real, el userId se obtendría del token de sesión.
        const userId = parseInt(req.params.userId); 

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'ID de usuario no válido.' });
        }

        const [rows] = await db.execute(
            `SELECT nivel, completado, aprobado 
             FROM user_progreso 
             WHERE user_id = ?`,
            [userId]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error al obtener progreso:', error);
        res.status(500).json({ message: 'Error interno del servidor al cargar el progreso.' });
    }
};

// 2. Endpoint para GUARDAR (o actualizar) el progreso del usuario
export const completarNivel = async (req: Request, res: Response) => {
    try {
        // En una app real, userId se obtendría del token.
        const { userId, nivel, completado, aprobado } = req.body;
        
        if (!userId || !nivel) {
            return res.status(400).json({ message: 'Datos de progreso incompletos.' });
        }
        
        const fechaAprobacion = aprobado ? new Date() : null;

        // Utiliza INSERT... ON DUPLICATE KEY UPDATE para insertar o actualizar
        await db.execute(
            `INSERT INTO user_progreso (user_id, nivel, completado, aprobado, fecha_aprobacion) 
             VALUES (?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
             completado = VALUES(completado), 
             aprobado = VALUES(aprobado), 
             fecha_aprobacion = IF(VALUES(aprobado), VALUES(fecha_aprobacion), fecha_aprobacion)`,
            [userId, nivel, completado, aprobado, fechaAprobacion]
        );

        res.status(201).json({ 
            message: `Progreso del Nivel ${nivel} guardado/actualizado.`
        });
    } catch (error) {
        console.error('Error al guardar progreso:', error);
        res.status(500).json({ message: 'Error interno del servidor al guardar el progreso.' });
    }
};
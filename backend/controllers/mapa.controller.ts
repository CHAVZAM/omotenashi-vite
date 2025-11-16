// backend/controllers/mapa.controller.ts

/**
 * @file Controlador para manejar las operaciones relacionadas con el mapa de percepción global.
 * @module controllers/mapaController
 * @description Este módulo maneja la lógica para obtener y actualizar los datos de percepción Omotenashi de los países.
 */

import { Request, Response } from 'express';
import db from '../db'; // Importa tu pool de conexión a la base de datos (nombrado 'db' aquí)

// Importamos la función para actualizar todos los scores de percepción desde el nuevo servicio
// La ruta es '../services/perceptionService' porque 'services' está en el mismo nivel que 'controllers'
import { updateAllPerceptionScores } from '../services/perceptionService'; // <-- LÍNEA AÑADIDA/ACTUALIZADA!

/**
 * Obtiene todos los datos de percepción de los países desde la base de datos.
 * @route GET /api/mapa
 * @param req Objeto de solicitud de Express.
 * @param res Objeto de respuesta de Express.
 */
export const getMapaData = async (req: Request, res: Response) => {
    try {
        // Ejecuta una consulta para seleccionar todos los campos relevantes de la tabla paises_percepcion
        const [rows]: any = await db.execute('SELECT country_code, country_name, score, source, data_count FROM paises_percepcion');

        // ==== INICIO DEL CAMBIO: Procesar los datos antes de enviarlos ====
        const processedRows = rows.map((row: any) => ({
            ...row,
            score: parseFloat(row.score) // Convertir el score a número flotante
        }));
        // ==== FIN DEL CAMBIO ====

        // Envía los datos procesados como una respuesta JSON
        res.json(processedRows); // ¡Enviar processedRows en lugar de rows!
    } catch (error: any) {
        // Captura y registra cualquier error durante la obtención de datos
        console.error('Error al obtener datos del mapa:', error.message);
        // Envía una respuesta de error 500 al cliente
        res.status(500).json({ message: 'Error interno del servidor al obtener datos del mapa.' });
    }
};

/**
 * Obtiene los datos de percepción para un país específico por su código.
 * @route GET /api/mapa/:countryCode
 * @param req Objeto de solicitud de Express que contiene el parámetro `countryCode`.
 * @param res Objeto de respuesta de Express.
 */
export const getCountryData = async (req: Request, res: Response) => {
    const { countryCode } = req.params; // Extrae el código del país de los parámetros de la URL
    try {
        // Ejecuta una consulta para obtener los datos del país específico
        const [rows]: any = await db.execute('SELECT country_code, country_name, score, source, data_count FROM paises_percepcion WHERE country_code = ?', [countryCode]);
        if (rows.length > 0) {
            // ==== INICIO DEL CAMBIO: Procesar el score del país único ====
            const countryData = {
                ...rows[0],
                score: parseFloat(rows[0].score) // Convertir el score a número flotante
            };
            // ==== FIN DEL CAMBIO ====
            res.json(countryData); // Envía los datos procesados
        } else {
            // Si el país no se encuentra, envía un error 404
            res.status(404).json({ message: 'País no encontrado.' });
        }
    } catch (error: any) {
        // Captura y registra cualquier error
        console.error(`Error al obtener datos del país ${countryCode}:`, error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener datos del país.' });
    }
};

/**
 * Actualiza el score de percepción y otros datos para un país específico.
 * @route PUT /api/mapa/:countryCode
 * @param req Objeto de solicitud de Express que contiene `countryCode` y el cuerpo con `score`, `source`, `data_count`.
 * @param res Objeto de respuesta de Express.
 */
export const updateCountryScore = async (req: Request, res: Response) => {
    const { countryCode } = req.params; // Extrae el código del país
    const { score, source, data_count } = req.body; // Extrae los datos del cuerpo de la solicitud

    // Valida que todos los campos requeridos estén presentes
    if (score === undefined || source === undefined || data_count === undefined) {
        return res.status(400).json({ message: 'Faltan campos requeridos (score, source, data_count).' });
    }

    try {
        // Ejecuta una consulta de actualización en la base de datos
        const [result]: any = await db.execute(
            'UPDATE paises_percepcion SET score = ?, source = ?, data_count = ? WHERE country_code = ?',
            [score, source, data_count, countryCode]
        );

        if (result.affectedRows > 0) {
            // Si la actualización fue exitosa, envía un mensaje de éxito
            res.json({ message: `Datos del país ${countryCode} actualizados exitosamente.` });
        } else {
            // Si no se afectaron filas, el país no fue encontrado para actualizar
            res.status(404).json({ message: 'País no encontrado para actualizar.' });
        }
    } catch (error: any) {
        // Captura y registra cualquier error
        console.error(`Error al actualizar datos del país ${countryCode}:`, error.message);
        res.status(500).json({ message: 'Error interno del servidor al actualizar datos del país.' });
    }
};

/**
 * Gatilla la actualización de los scores de percepción Omotenashi para todos los países.
 * Esta función invoca el servicio de percepción para realizar el análisis y la actualización en la DB.
 * Este endpoint es principalmente para administración o pruebas.
 * @route POST /api/mapa/update-scores
 * @param req Objeto de solicitud de Express.
 * @param res Objeto de respuesta de Express.
 */
export const updatePerceptionScores = async (req: Request, res: Response) => {
  try {
    console.log('Solicitud recibida para actualizar scores de percepción.');
    // Llama a la función del servicio que se encarga de todo el proceso de análisis y actualización
    await updateAllPerceptionScores();
    console.log('Scores de percepción actualizados exitosamente.');
    res.status(200).json({ message: 'Scores de percepción actualizados exitosamente.' });
  } catch (error) {
    // Captura y registra errores en el proceso de actualización
    console.error('Error al actualizar scores de percepción:', error);
    res.status(500).json({ message: 'Error interno del servidor al actualizar scores de percepción.' });
  }
};
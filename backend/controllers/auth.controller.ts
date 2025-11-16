import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, avatar_url } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if ((existing as any[]).length > 0) {
      return res.status(409).json({ message: 'El correo ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (username, email, password, avatar_url) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, avatar_url || null]
    );

    res.status(201).json({ message: 'Usuario registrado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [results] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = results as any[];

    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    // No usamos JWT por ahora, solo devolvemos datos básicos
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM roles');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM roles WHERE id_role = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Rôle introuvable' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { nom } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO roles (nom) VALUES ($1) RETURNING *',
      [nom]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { nom } = req.body;
  try {
    const result = await pool.query(
      'UPDATE roles SET nom = $1 WHERE id_role = $2 RETURNING *',
      [nom, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Rôle introuvable' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM roles WHERE id_role = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Rôle introuvable' });
    res.json({ message: 'Rôle supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
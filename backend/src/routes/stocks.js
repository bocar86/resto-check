import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, c.nom AS categorie
      FROM stock s
      LEFT JOIN categories c ON s.id_categorie = c.id_categorie
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/alerte', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM stock WHERE quantite <= seuil_alerte
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stock WHERE id_stock = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produit introuvable' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { nom, quantite, unite, id_categorie, seuil_alerte, emballage } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO stock (nom, quantite, unite, id_categorie, seuil_alerte, emballage)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nom, quantite, unite, id_categorie, seuil_alerte, emballage]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { nom, quantite, unite, id_categorie, seuil_alerte, emballage } = req.body;
  try {
    const result = await pool.query(
      `UPDATE stock SET nom=$1, quantite=$2, unite=$3, id_categorie=$4,
       seuil_alerte=$5, emballage=$6 WHERE id_stock=$7 RETURNING *`,
      [nom, quantite, unite, id_categorie, seuil_alerte, emballage, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produit introuvable' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM stock WHERE id_stock = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produit introuvable' });
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
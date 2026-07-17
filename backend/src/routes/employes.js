import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employes');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employes WHERE id_employes = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Employé introuvable' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { nom, prenom, email, telephone, mot_de_passe } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO employes (nom, prenom, email, telephone, mot_de_passe)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nom, prenom, email, telephone, mot_de_passe]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { nom, prenom, email, telephone, mot_de_passe } = req.body;
  try {
    const result = await pool.query(
      `UPDATE employes SET nom=$1, prenom=$2, email=$3, telephone=$4,
       mot_de_passe=$5 WHERE id_employes=$6 RETURNING *`,
      [nom, prenom, email, telephone, mot_de_passe, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Employé introuvable' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM employes WHERE id_employes = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Employé introuvable' });
    res.json({ message: 'Employé supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
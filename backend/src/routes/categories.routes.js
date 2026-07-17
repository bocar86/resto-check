import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// GET /categories | liste tout
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM categories ORDER BY id_categorie",
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /categories/:id | une seule catégorie
router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM categories WHERE id_categorie = $1",
            [req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Catégorie introuvable" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /categories | crée
router.post("/", async (req, res) => {
    try {
        const { nom } = req.body;
        const result = await pool.query(
            "INSERT INTO categories (nom) VALUES ($1) RETURNING *",
            [nom],
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /categories/:id | modifie
router.put("/:id", async (req, res) => {
    try {
        const { nom } = req.body;
        const result = await pool.query(
            "UPDATE categories SET nom = $1 WHERE id_categorie = $2 RETURNING *",
            [nom, req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Catégorie introuvable" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /categories/:id | supprime
router.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM categories WHERE id_categorie = $1 RETURNING *",
            [req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Catégorie introuvable" });
        }
        res.json({ message: "Catégorie supprimée", categorie: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

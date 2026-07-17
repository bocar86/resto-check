import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// GET /stock | liste tous
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM stock ORDER BY id_stock",
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /stock/:id | un seul
router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM stock WHERE id_stock = $1",
            [req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Article introuvable" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /stock | crée
router.post("/", async (req, res) => {
    try {
        const { nom, quantite, unite, id_categorie, seuil_alerte, emballage } =
            req.body;
        const result = await pool.query(
            `INSERT INTO stock (nom, quantite, unite, id_categorie, seuil_alerte, emballage)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [nom, quantite, unite, id_categorie, seuil_alerte, emballage],
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /stock/:id | modifie
router.put("/:id", async (req, res) => {
    try {
        const { nom, quantite, unite, id_categorie, seuil_alerte, emballage } =
            req.body;
        const result = await pool.query(
            `UPDATE stock
            SET nom = $1, quantite = $2, unite = $3, id_categorie = $4, seuil_alerte = $5, emballage = $6
             WHERE id_stock = $7 RETURNING *`,
            [
                nom,
                quantite,
                unite,
                id_categorie,
                seuil_alerte,
                emballage,
                req.params.id,
            ],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Article introuvable" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /stock/:id | supprime
router.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM stock WHERE id_stock = $1 RETURNING *",
            [req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Article introuvable" });
        }
        res.json({ message: "Article supprimé", article: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

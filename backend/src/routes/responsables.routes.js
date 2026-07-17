import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// GET /responsables | liste tous
router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM responsables ORDER BY id_responsables",
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /responsables/:id | un seul responsable
router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM responsables WHERE id_responsables = $1",
            [req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Responsable introuvable" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /responsables | crée
router.post("/", async (req, res) => {
    try {
        const { nom, prenom, email, telephone, mot_de_passe, id_role } =
            req.body;
        const result = await pool.query(
            `INSERT INTO responsables (nom, prenom, email, telephone, mot_de_passe, id_role)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [nom, prenom, email, telephone, mot_de_passe, id_role],
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /responsables/:id | modifie
router.put("/:id", async (req, res) => {
    try {
        const { nom, prenom, email, telephone, mot_de_passe, id_role } =
            req.body;
        const result = await pool.query(
            `UPDATE responsables
            SET nom = $1, prenom = $2, email = $3, telephone = $4, mot_de_passe = $5, id_role = $6
             WHERE id_responsables = $7 RETURNING *`,
            [
                nom,
                prenom,
                email,
                telephone,
                mot_de_passe,
                id_role,
                req.params.id,
            ],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Responsable introuvable" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /responsables/:id | supprime
router.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM responsables WHERE id_responsables = $1 RETURNING *",
            [req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Responsable introuvable" });
        }
        res.json({
            message: "Responsable supprimé",
            responsable: result.rows[0],
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

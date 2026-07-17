import { Router } from "express";
import pool from "../config/db.js";

const router = Router();

// GET /roles | liste tous
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM roles ORDER BY id_role");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /roles/:id | un seul rôle
router.get("/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM roles WHERE id_role = $1",
            [req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Rôle introuvable" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /roles | crée
router.post("/", async (req, res) => {
    try {
        const { nom } = req.body;
        const result = await pool.query(
            "INSERT INTO roles (nom) VALUES ($1) RETURNING *",
            [nom],
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /roles/:id | modifie
router.put("/:id", async (req, res) => {
    try {
        const { nom } = req.body;
        const result = await pool.query(
            "UPDATE roles SET nom = $1 WHERE id_role = $2 RETURNING *",
            [nom, req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Rôle introuvable" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /roles/:id | supprime
router.delete("/:id", async (req, res) => {
    try {
        const result = await pool.query(
            "DELETE FROM roles WHERE id_role = $1 RETURNING *",
            [req.params.id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Rôle introuvable" });
        }
        res.json({ message: "Rôle supprimé", role: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;

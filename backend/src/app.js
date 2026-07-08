import express from "express";
import cors from "cors";
import pool from "./config/db.js";

const app = express();

// Middlewares (s'exécutent avant tes routes)
app.use(cors()); // autorise le frontend à appeler l'API
app.use(express.json()); // permet de lire le body JSON

// Route de test : vérifier que le serveur répond
app.get("/", (req, res) => {
    res.json({ message: "API opérationnelle 🚀" });
});

// Route de test : vérifier que la base de données répond
app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// (Ici viendront tes routes : app.use("/tasks", tasksRoutes) etc.)

export default app;

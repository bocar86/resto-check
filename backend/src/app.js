import express from "express";
import cors from "cors";
import pool from "./config/db.js";
<<<<<<< HEAD
import rolesRoutes from "./routes/roles.routes.js";
import responsablesRoutes from "./routes/responsables.routes.js";
import employesRoutes from "./routes/employes.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";
import stockRoutes from "./routes/stock.routes.js";
=======
>>>>>>> 7cb3ba9df1d3e731a292595711d29953fd1de4e1

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

<<<<<<< HEAD
app.use("/roles", rolesRoutes);
app.use("/responsables", responsablesRoutes);
app.use("/employes", employesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/stock", stockRoutes);
=======
// (Ici viendront tes routes : app.use("/tasks", tasksRoutes) etc.)
>>>>>>> 7cb3ba9df1d3e731a292595711d29953fd1de4e1

export default app;

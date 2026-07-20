import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import rolesRoutes from "./routes/roles.js";
import responsablesRoutes from "./routes/responsables.js";
import employesRoutes from "./routes/employes.js";
import categoriesRoutes from "./routes/categories.js";
import stockRoutes from "./routes/stock.routes.js";

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

// Routes de l'application
app.use("/roles", rolesRoutes);
app.use("/responsables", responsablesRoutes);
app.use("/employes", employesRoutes);
app.use("/categories", categoriesRoutes);
app.use("/stock", stockRoutes);

export default app;

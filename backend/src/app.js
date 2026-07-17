import express from "express";
import cors from "cors";
import pool from "./config/db.js";

// Import des routes
import rolesRouter from "./routes/roles.js";
import responsablesRouter from "./routes/responsables.js";
import employesRouter from "./routes/employes.js";
import categoriesRouter from "./routes/categories.js";
import stocksRouter from "./routes/stocks.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test serveur
app.get("/", (req, res) => {
  res.json({ message: "API opérationnelle 🚀" });
});

// Route de test BDD
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes API
app.use("/api/roles", rolesRouter);
app.use("/api/responsables", responsablesRouter);
app.use("/api/employes", employesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/stocks", stocksRouter);

export default app;
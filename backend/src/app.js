import express from "express";
import cors from "cors";

const app = express();

// Middlewares (s'exécutent avant tes routes)
app.use(cors()); // autorise le frontend à appeler l'API
app.use(express.json()); // permet de lire le body JSON

// Route de test : vérifier que le serveur répond
app.get("/", (req, res) => {
    res.json({ message: "API opérationnelle 🚀" });
});

// (Ici viendront tes routes : app.use("/tasks", tasksRoutes) etc.)

export default app;

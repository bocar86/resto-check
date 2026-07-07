# Guide d'installation — Projet Fullstack (Node/Express + PostgreSQL + React)

*Guide pas-à-pas, vulgarisé pour débutants. Objectif : repartir sur un projet propre et bien rangé.*

---

## 0. L'idée générale (à lire avant de taper quoi que ce soit)

On construit une application en **deux morceaux séparés** qui discutent entre eux :

| Morceau | Rôle | Analogie |
|---|---|---|
| **`backend`** (Node/Express + PostgreSQL) | La **cuisine** : il stocke les données, applique les règles, et sert des réponses | On ne le voit pas, mais c'est lui qui prépare tout |
| **`frontend`** (React) | La **salle** : ce que l'utilisateur voit et clique dans son navigateur | Le décor, les boutons, les écrans |
| **`docs`** | La **documentation** du projet (schémas, notes, specs) | Le classeur d'explications |

Le frontend **ne parle jamais directement à la base de données**. Il envoie des requêtes HTTP au backend (comme dans le cours précédent), et le backend répond. C'est une règle d'or de sécurité et d'organisation.

> ⚠️ **Note de transparence** : tous les numéros de version cités plus bas (Node, React, packages…) correspondent à ce que je connais à ma date de connaissance et **peuvent être obsolètes aujourd'hui**. À chaque étape, vérifiez la version réellement installée avec les commandes fournies, et consultez les sites officiels pour les versions LTS à jour. Je le répète parce que c'est le piège n°1.

---

## 1. Vérifier les prérequis

Avant tout, on vérifie ce qui est déjà installé. Ouvrez un terminal et tapez :

```bash
node -v      # doit afficher une version de Node.js (ex : v20.x ou plus)
npm -v       # gestionnaire de paquets, installé avec Node
psql --version   # PostgreSQL (tu m'as dit qu'il est déjà installé)
git --version
```

> 💡 **Si `node -v` ne répond rien** : Node n'est pas installé. Installez la version **LTS** (Long Term Support = stable) depuis le site officiel de Node.js.
>
> ⚠️ Je ne cite volontairement **pas** de numéro de version LTS précis ici : il change régulièrement et je risquerais de vous donner un chiffre périmé. **Vérifiez la version LTS actuelle sur nodejs.org.**

---

## 2. Créer la structure de dossiers

On crée le dossier racine du projet et les trois sous-dossiers de ton image.

```bash
mkdir mon-projet
cd mon-projet

mkdir backend
mkdir frontend
mkdir docs
```

On initialise Git à la racine :

```bash
git init
```

On crée un `.gitignore` et un `README.md` à la racine (comme sur ta capture) :

```bash
touch .gitignore
touch README.md
```

Contenu minimal du **`.gitignore` racine** (on ne veut PAS envoyer certaines choses sur GitHub) :

```gitignore
# Dépendances (lourdes, réinstallables)
node_modules/

# Variables d'environnement (SECRETS — jamais sur GitHub !)
.env

# Fichiers de build
dist/
build/

# Logs
*.log

# Fichiers système
.DS_Store
```

> 🔒 **Point crucial** : le fichier `.env` contiendra le mot de passe de la base de données. Il ne doit **jamais** être poussé sur GitHub. C'est pour ça qu'on l'ignore dès le début.

Ta structure ressemble maintenant à ça :

```
mon-projet/
├── backend/
├── docs/
├── frontend/
├── .gitignore
└── README.md
```

---

## 3. Le BACKEND (Node/Express + PostgreSQL)

### 3.1 — Initialiser le projet Node

```bash
cd backend
npm init -y
```

`npm init -y` crée un fichier **`package.json`** : c'est la **carte d'identité** du projet (nom, dépendances, scripts). Le `-y` accepte les valeurs par défaut sans poser de questions.

### 3.2 — Installer les dépendances

```bash
npm install express pg cors dotenv
npm install --save-dev nodemon
```

À quoi sert chaque paquet :

| Paquet | Rôle vulgarisé |
|---|---|
| `express` | Le framework qui gère les routes et les requêtes HTTP |
| `pg` | Le **driver** qui permet à Node de parler à PostgreSQL |
| `cors` | Autorise le frontend (autre adresse) à appeler le backend. Sans lui, le navigateur bloque |
| `dotenv` | Lit le fichier `.env` pour charger les secrets (mot de passe BDD…) |
| `nodemon` (dev) | Redémarre le serveur automatiquement à chaque modif. Confort pendant le dev |

> ⚠️ Je ne fige aucun numéro de version ici volontairement. `npm install` prendra les versions récentes au moment où vous tapez la commande. Si un tuto plus ancien impose une version précise, vérifiez qu'elle est toujours d'actualité.

### 3.3 — L'arborescence du backend

On range le code proprement. Crée cette structure dans `backend/` :

```
backend/
├── src/
│   ├── controllers/     # Gèrent req/res (comme dans le cours précédent)
│   ├── services/        # La logique métier + les requêtes SQL
│   ├── routes/          # Associent une URL à un controller
│   ├── config/          # Connexion à la base de données
│   └── app.js           # Assemble l'application Express
├── .env                 # Secrets (JAMAIS sur GitHub)
├── .env.example         # Modèle SANS secrets (celui-là va sur GitHub)
├── .gitignore
├── package.json
└── server.js            # Point de démarrage
```

Pour créer les dossiers d'un coup :

```bash
mkdir -p src/controllers src/services src/routes src/config
```

> 💡 **Pourquoi séparer `controllers` / `services` / `routes` ?** C'est le principe vu dans le cours : chaque fichier a **une seule responsabilité**. Le controller gère le HTTP, le service gère la logique et le SQL, la route fait le lien. Ça rend le code lisible et testable.

### 3.4 — Le fichier `.env` (les secrets)

Crée `backend/.env` :

```env
# Configuration base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ton_mot_de_passe_ici
DB_NAME=nom_de_ta_base

# Port du serveur backend
PORT=3000
```

> ⚠️ **Les valeurs ci-dessus sont des exemples génériques.**
> - `DB_PORT=5432` est le port **par défaut** de PostgreSQL, mais il **peut être différent** sur votre machine. Vérifiez votre configuration réelle.
> - `DB_USER=postgres` est l'utilisateur par défaut habituel, mais **là aussi ça peut varier**. À confirmer selon votre installation.
> - `DB_PASSWORD` et `DB_NAME` : mettez vos vraies valeurs.

Crée aussi **`backend/.env.example`** (le modèle sans secrets, celui qui ira sur GitHub) :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=3000
```

Et un **`.gitignore` dans `backend/`** :

```gitignore
node_modules/
.env
```

### 3.5 — La connexion à PostgreSQL

Crée `backend/src/config/db.js` :

```js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Un "pool" = un ensemble de connexions réutilisables à la base.
// Plus efficace que d'ouvrir/fermer une connexion à chaque requête.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export default pool;
```

> 💡 **Analogie du "pool"** : plutôt que d'ouvrir une nouvelle porte vers la base à chaque visite, on garde un petit trousseau de portes déjà ouvertes qu'on réutilise. C'est plus rapide.
>
> ⚠️ **Choix de configuration** : j'utilise ici la syntaxe `import`/`export` (ES Modules), cohérente avec ton fichier `tasksControllers.js`. Pour que ça marche, il faut **ajouter `"type": "module"`** dans le `package.json` (voir 3.7). Si votre projet utilise `require()` (CommonJS) à la place, il faudra adapter. À vérifier selon votre choix d'équipe.

### 3.6 — Un premier serveur Express

Crée `backend/src/app.js` :

```js
import express from "express";
import cors from "cors";

const app = express();

// Middlewares (s'exécutent avant tes routes)
app.use(cors());          // autorise le frontend à appeler l'API
app.use(express.json());  // permet de lire le body JSON

// Route de test : vérifier que le serveur répond
app.get("/", (req, res) => {
  res.json({ message: "API opérationnelle 🚀" });
});

// (Ici viendront tes routes : app.use("/tasks", tasksRoutes) etc.)

export default app;
```

Crée `backend/server.js` (le point de démarrage) :

```js
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
```

### 3.7 — Configurer les scripts de démarrage

Ouvre `backend/package.json` et modifie/ajoute ces deux lignes :

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

- `"type": "module"` → active la syntaxe `import`/`export`.
- `npm run dev` → lance le serveur en mode développement (redémarrage auto).
- `npm start` → lance en mode normal.

### 3.8 — Tester le backend

```bash
npm run dev
```

Ouvre ton navigateur sur **http://localhost:3000** → tu dois voir `{ "message": "API opérationnelle 🚀" }`.

✅ Si tu vois ça, ton backend tourne et la partie Express fonctionne. (La connexion BDD sera testée quand tu feras ta première vraie requête SQL.)

---

## 4. Le FRONTEND (React)

> ⚠️ **Point d'actualité important** : la façon recommandée de créer un projet React **a changé** ces dernières années. L'ancien outil `create-react-app` est considéré comme dépassé par beaucoup, et l'écosystème recommande souvent **Vite** aujourd'hui. **Mais les recommandations évoluent vite** — je peux me tromper sur ce qui est "la" bonne pratique au moment où tu lis ceci. **Vérifiez sur la documentation officielle de React quelle méthode est recommandée actuellement.**
>
> Je pars sur **Vite** ci-dessous car c'est ce qui était le plus courant à ma date de connaissance, mais considère ça comme "à confirmer".

### 4.1 — Créer le projet React avec Vite

Depuis la **racine** du projet :

```bash
npm create vite@latest frontend -- --template react
```

Cette commande crée le projet React dans le dossier `frontend`.

> ⚠️ La syntaxe exacte de cette commande **peut évoluer** selon la version de Vite. Si elle échoue, consultez la doc officielle de Vite pour la commande à jour.

Puis :

```bash
cd frontend
npm install
```

`npm install` télécharge toutes les dépendances React listées dans le `package.json` généré.

### 4.2 — Lancer le frontend

```bash
npm run dev
```

Vite affichera une adresse locale (souvent quelque chose comme **http://localhost:5173**).

> ⚠️ Le port `5173` est le port par défaut de Vite **à ma connaissance**, mais il peut différer. **Lisez l'adresse exacte affichée dans votre terminal** plutôt que de supposer.

### 4.3 — Faire parler le frontend au backend

Dans un composant React, un appel typique vers ton backend ressemble à :

```js
const reponse = await fetch("http://localhost:3000/");
const data = await reponse.json();
console.log(data); // { message: "API opérationnelle 🚀" }
```

> 💡 C'est ici que le `cors` installé côté backend devient indispensable : sans lui, le navigateur bloquerait cet appel entre deux adresses différentes (`5173` → `3000`).
>
> 💡 **Bonne pratique** (optionnelle, à voir plus tard) : Vite permet de configurer un "proxy" pour éviter d'écrire l'URL complète du backend partout. Je ne le détaille pas ici pour ne pas surcharger, mais c'est une piste d'amélioration.

---

## 5. Ordre de démarrage au quotidien

Une fois tout installé, pour travailler il faut lancer **les deux serveurs en même temps**, dans **deux terminaux séparés** :

```bash
# Terminal 1 — le backend
cd backend
npm run dev

# Terminal 2 — le frontend
cd frontend
npm run dev
```

Analogie : la cuisine (backend) et la salle (frontend) doivent être ouvertes toutes les deux pour que le restaurant fonctionne.

---

## 6. Le dossier `docs`

Le dossier `docs/` accueille tout ce qui explique le projet sans être du code :

- Le **schéma de la base de données** (MCD/MLD — ton domaine !).
- La **liste des endpoints** de l'API (méthode, route, codes de retour).
- Les **user stories**.
- Les notes d'installation ou de configuration spécifiques à votre équipe.

C'est votre mémoire commune. Un projet bien documenté est un projet où un nouveau membre peut démarrer seul.

---

## 7. Récapitulatif — La structure finale

```
mon-projet/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── config/
│   │   │   └── db.js
│   │   └── app.js
│   ├── .env              (secrets, ignoré par Git)
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── docs/
├── frontend/             (projet React généré par Vite)
├── .gitignore
└── README.md
```

---

## 8. Checklist de fin d'installation

- [ ] `node -v`, `npm -v`, `psql --version` répondent bien
- [ ] La structure `backend` / `docs` / `frontend` est créée
- [ ] `.gitignore` racine créé, avec `node_modules/` et `.env` dedans
- [ ] Backend : dépendances installées (`express`, `pg`, `cors`, `dotenv`, `nodemon`)
- [ ] Backend : fichier `.env` rempli avec les vraies infos PostgreSQL
- [ ] Backend : `npm run dev` → http://localhost:3000 affiche le message de test
- [ ] Frontend : projet React créé, `npm run dev` lance l'app
- [ ] Frontend : un `fetch` vers le backend fonctionne (CORS OK)
- [ ] Le `.env` n'est **PAS** visible dans `git status` (bien ignoré)

---

## ⚠️ Rappel final des points à vérifier vous-mêmes

Je préfère être transparent : plusieurs éléments de ce guide dépendent de choses que je ne peux pas voir ou qui évoluent :

1. **Les versions** (Node LTS, React, Vite, packages) changent régulièrement → vérifiez les versions actuelles sur les sites officiels.
2. **La config PostgreSQL** (port, utilisateur, mot de passe) dépend de votre installation → je ne connais que les valeurs *par défaut* habituelles, pas les vôtres.
3. **L'outil de création React recommandé** (Vite vs autre) peut avoir changé → confirmez sur la doc officielle de React.
4. **Le choix ES Modules (`import`) vs CommonJS (`require`)** est une décision d'équipe → j'ai supposé ES Modules pour être cohérent avec votre code existant.
5. **Sans ORM** : j'ai choisi le driver `pg` brut pour rester pédagogique. Si vous voulez un ORM (Sequelize, Prisma…), la structure et les commandes changent.

En cas de doute sur un de ces points, la source primaire (doc officielle du produit concerné) doit primer sur ce guide.

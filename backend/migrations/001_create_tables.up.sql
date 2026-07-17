-- Migration UP : création des tables initiales

CREATE TABLE roles (
    id_role SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE responsables (
    id_responsables SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    mot_de_passe VARCHAR(100) NOT NULL,
    id_role INT NOT NULL REFERENCES roles(id_role)
);

CREATE TABLE employes (
    id_employes SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    mot_de_passe VARCHAR(100) NOT NULL
);

CREATE TABLE categories (
    id_categorie SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE stock (
    id_stock SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    quantite DECIMAL(10,2), -- ex: 50, 200 ...
    unite VARCHAR(20),      -- ex: ml, kg, piece ...
    id_categorie INT REFERENCES categories(id_categorie),
    seuil_alerte DECIMAL(10,2),
    emballage VARCHAR(50)
);
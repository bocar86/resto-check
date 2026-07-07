CREATE TABLE responsables{
id_responsables SERIAL PRIMARY KEY,
nom VARCHAR(50) NOT NULL,
prenom VARCHAR(50) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
telephone VARCHAR(20),
mot_de_passe VARCHAR(50) NOT NULL,
id_role VARCHAR(50) NOT NULL 
}
 
CREATE TABLE employes{ 
id_employes SERIAL PRIMARY KEY, 
nom VARCHAR(50) NOT NULL, 
prenom VARCHAR(50) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL, 
telephone VARCHAR(20), 
mot_de_passe VARCHAR(50) NOT NULL
} 
 

CREATE TABLE stock {
  id_stock SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  quantite DECIMAL(10,2) /* 50, 200 exct .. /
  unite VARCHAR(20)   /ml, kg, piece ...*/
  id_categorie INT UNIQUE, 
  seuil_alerte DECIMAL(10,2),
  emballage VARCHAR(50)
}

CREATE TABLE roles{
id_role SERIAL PRIMARY KEY,
nom VARCHAR(50) NOT NULL
} 

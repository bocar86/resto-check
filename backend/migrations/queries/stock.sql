-- CREATE
INSERT INTO stock (nom, quantite, unite, id_categorie, seuil_alerte, emballage)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;

-- READ (tout, avec le nom de la catégorie en jointure)
SELECT s.*, c.nom AS categorie_nom
FROM stock s
JOIN categories c ON s.id_categorie = c.id_categorie;

-- READ (par id)
SELECT s.*, c.nom AS categorie_nom
FROM stock s
JOIN categories c ON s.id_categorie = c.id_categorie
WHERE s.id_stock = $1;

-- READ (articles sous le seuil d'alerte, utile pour tes notifications de stock bas)
SELECT * FROM stock WHERE quantite <= seuil_alerte;

-- UPDATE
UPDATE stock
SET nom = $1, quantite = $2, unite = $3, id_categorie = $4, seuil_alerte = $5, emballage = $6
WHERE id_stock = $7 RETURNING *;

-- DELETE
DELETE FROM stock WHERE id_stock = $1;
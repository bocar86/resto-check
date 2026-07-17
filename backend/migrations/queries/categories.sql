-- CREATE
INSERT INTO categories (nom) VALUES ($1) RETURNING *;

-- READ (toutes)
SELECT * FROM categories;

-- READ (par id)
SELECT * FROM categories WHERE id_categorie = $1;

-- UPDATE
UPDATE categories SET nom = $1 WHERE id_categorie = $2 RETURNING *;

-- DELETE
DELETE FROM categories WHERE id_categorie = $1;
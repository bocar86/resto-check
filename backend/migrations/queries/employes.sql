-- CREATE
INSERT INTO employes (nom, prenom, email, telephone, mot_de_passe)
VALUES ($1, $2, $3, $4, $5) RETURNING *;

-- READ (tous)
SELECT * FROM employes;

-- READ (par id)
SELECT * FROM employes WHERE id_employes = $1;

-- READ (par email, utile pour le login)
SELECT * FROM employes WHERE email = $1;

-- UPDATE
UPDATE employes
SET nom = $1, prenom = $2, email = $3, telephone = $4
WHERE id_employes = $5 RETURNING *;

-- DELETE
DELETE FROM employes WHERE id_employes = $1;
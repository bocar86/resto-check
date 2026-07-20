-- CREATE
INSERT INTO responsables (nom, prenom, email, telephone, mot_de_passe, id_role)
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;

-- READ (tous, avec le nom du rôle en jointure)
SELECT r.*, ro.nom AS role_nom
FROM responsables r
JOIN roles ro ON r.id_role = ro.id_role;

-- READ (par id)
SELECT r.*, ro.nom AS role_nom
FROM responsables r
JOIN roles ro ON r.id_role = ro.id_role
WHERE r.id_responsables = $1;

-- READ (par email, utile pour le login)
SELECT * FROM responsables WHERE email = $1;

-- UPDATE
UPDATE responsables
SET nom = $1, prenom = $2, email = $3, telephone = $4, id_role = $5
WHERE id_responsables = $6 RETURNING *;

-- DELETE
DELETE FROM responsables WHERE id_responsables = $1;
-- CREATE
INSERT INTO roles (nom) VALUES ($1) RETURNING *;

-- READ (tous)
SELECT * FROM roles;

-- READ (par id)
SELECT * FROM roles WHERE id_role = $1;

-- UPDATE
UPDATE roles SET nom = $1 WHERE id_role = $2 RETURNING *;

-- DELETE
DELETE FROM roles WHERE id_role = $1;
-- Seed : données initiales

INSERT INTO roles (nom) VALUES
('admin'),
('manager'),
('employe');

INSERT INTO categories (nom) VALUES
('Boissons'),
('Viandes'),
('Légumes'),
('Épicerie');

INSERT INTO responsables (nom, prenom, email, telephone, mot_de_passe, id_role) VALUES
('Dupont', 'Jean', 'jean.dupont@resto-check.fr', '0600000000', 'motdepasse123', 1);

INSERT INTO employes (nom, prenom, email, telephone, mot_de_passe) VALUES
('Martin', 'Sophie', 'sophie.martin@resto-check.fr', '0611111111', 'motdepasse123'),
('Bernard', 'Lucas', 'lucas.bernard@resto-check.fr', '0622222222', 'motdepasse123');

INSERT INTO stock (nom, quantite, unite, id_categorie, seuil_alerte, emballage) VALUES
('Coca-Cola', 48, 'piece', 1, 12, 'canette'),
('Eau plate', 100, 'piece', 1, 24, 'bouteille'),
('Poulet', 25, 'kg', 2, 5, 'sous-vide'),
('Boeuf haché', 15, 'kg', 2, 3, 'sous-vide'),
('Tomates', 30, 'kg', 3, 5, 'caisse'),
('Salade', 20, 'piece', 3, 5, 'caisse'),
('Farine', 50, 'kg', 4, 10, 'sac');

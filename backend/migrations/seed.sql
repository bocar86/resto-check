-- Données de test

INSERT INTO roles (nom) VALUES
    ('Administrateur'),
    ('Manager'),
    ('Employe');

INSERT INTO categories (nom) VALUES
    ('Boissons'),
    ('Viandes'),
    ('Legumes'),
    ('Epicerie');

INSERT INTO responsables (nom, prenom, email, telephone, mot_de_passe, id_role) VALUES
    ('Diallo', 'Awa', 'awa.diallo@resto-check.fr', '0600000001', 'changeme', 1),
    ('Ndiaye', 'Moussa', 'moussa.ndiaye@resto-check.fr', '0600000002', 'changeme', 2);

INSERT INTO employes (nom, prenom, email, telephone, mot_de_passe) VALUES
    ('Kelly', 'Samuel', 'samuel.kelly@resto-check.fr', '0600000010', 'changeme'),
    ('Fall', 'Ibrahima', 'ibrahima.fall@resto-check.fr', '0600000011', 'changeme'),
    ('Sow', 'Fatou', 'fatou.sow@resto-check.fr', '0600000012', 'changeme');

INSERT INTO stock (nom, quantite, unite, id_categorie, seuil_alerte, emballage) VALUES
    ('Coca-Cola', 50, 'piece', 1, 10, 'canette'),
    ('Eau minerale', 100, 'piece', 1, 20, 'bouteille'),
    ('Poulet', 30, 'kg', 2, 5, 'carton'),
    ('Tomates', 40, 'kg', 3, 8, 'cageot'),
    ('Farine', 25, 'kg', 4, 5, 'sac');

-- Migration DOWN : annule 001_create_tables.up.sql
-- Ordre inverse de la création, pour respecter les contraintes de clé étrangère

DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS employes;
DROP TABLE IF EXISTS responsables;
DROP TABLE IF EXISTS roles;

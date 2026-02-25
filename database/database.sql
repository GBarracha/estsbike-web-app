CREATE DATABASE `ests_bike_db`;

CREATE USER IF NOT EXISTS adm_usr
IDENTIFIED BY 'ADM@20242025';
GRANT ALL ON ests_bike_db.* TO adm_usr;

USE ests_bike_db;

DROP TABLE IF EXISTS `membros_tipoDeEventos`;
DROP TABLE IF EXISTS `membros`;
DROP TABLE IF EXISTS `eventos`;
DROP TABLE IF EXISTS `tipoDeEventos`;

CREATE TABLE `tipoDeEventos`(
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`descritivo` VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB, DEFAULT CHARSET=utf8mb4, COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `eventos`(
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`descritivo` VARCHAR(255) NOT NULL UNIQUE,
`tipoDeEvento` INT NOT NULL, FOREIGN KEY (`tipoDeEvento`) REFERENCES `tipoDeEventos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
`data` DATE NOT NULL
) ENGINE=InnoDB, DEFAULT CHARSET=utf8mb4, COLLATE=utf8mb4_0900_ai_ci;
CREATE INDEX `idx_eventos_tipoDeEvento` ON `eventos`(`tipoDeEvento`);

CREATE TABLE `membros`(
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`nome` VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB, DEFAULT CHARSET=utf8mb4, COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `membros_tipoDeEventos`(
`membro` INT NOT NULL, FOREIGN KEY (`membro`) REFERENCES `membros`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
`tipoDeEvento` INT NOT NULL, FOREIGN KEY (`tipoDeEvento`) REFERENCES `tipoDeEventos`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
PRIMARY KEY(`membro`,`tipoDeEvento`)
) ENGINE=InnoDB, DEFAULT CHARSET=utf8mb4, COLLATE=utf8mb4_0900_ai_ci;
CREATE INDEX `idx_membro` ON `membros_tipoDeEventos`(`membro`);
CREATE INDEX `idx_tipoDeEvento` ON `membros_tipoDeEventos`(`tipoDeEvento`);
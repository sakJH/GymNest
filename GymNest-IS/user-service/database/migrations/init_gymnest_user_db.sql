CREATE DATABASE IF NOT EXISTS GymNestUserDB;
USE GymNestUserDB;

CREATE TABLE IF NOT EXISTS `roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `roleName` VARCHAR(255) NOT NULL UNIQUE CHECK (`roleName` IN ('user', 'member', 'coach', 'admin'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `googleId` VARCHAR(255) UNIQUE,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `passwordHash` VARCHAR(255),
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `dateOfBirth` DATE,
    `roleId` INT NOT NULL DEFAULT 1,
    `preferredCurrency` VARCHAR(255) DEFAULT 'CZK',
    `credits` VARCHAR(255) DEFAULT '0',
    `colorScheme` VARCHAR(255) DEFAULT 'light',
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_username ON users(Username);
CREATE INDEX idx_email ON users(Email);

ALTER TABLE `users` ADD FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`);

INSERT INTO roles (RoleName) VALUES ('user'), ('member'), ('coach'), ('admin');

CREATE DATABASE IF NOT EXISTS GymNestMembershipDB;
USE GymNestMembershipDB;

-- Vytvoření aktualizované tabulky 'memberships'
CREATE TABLE IF NOT EXISTS `memberships` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `membershipTypeId` INT NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    -- Vytvoření tabulky 'membershipTypes'
CREATE TABLE IF NOT EXISTS membershipTypes (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `membershipName` VARCHAR(255) NOT NULL CHECK (`membershipName` IN ('Free', 'Standard', 'Premium', 'Family', 'Year')) UNIQUE,
    `membershipPrice` DECIMAL(10, 2) NOT NULL,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'CZK',
    `expirationDate` DATE NOT NULL,
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    -- Vytvoření tabulky 'payments'
CREATE TABLE IF NOT EXISTS `payments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `amount` DECIMAL(10, 2) NOT NULL,
    `paymentDate` DATE NOT NULL,
    `status` VARCHAR(255) NOT NULL CHECK (`status` IN ('pending', 'completed', 'failed')),
    `membershipId` INT NOT NULL,
    `description` TEXT,
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `payments` ADD FOREIGN KEY (`membershipId`) REFERENCES `memberships` (`id`) ON DELETE CASCADE;
ALTER TABLE `memberships` ADD FOREIGN KEY (`membershipTypeId`) REFERENCES `membershipTypes` (`id`) ON DELETE CASCADE;

INSERT INTO `membershipTypes` (`id`, `membershipName`, `membershipPrice`, `currency`, `expirationDate`)
VALUES
    (1, 'Free', 0, 'CZK', '2022-12-31'),
    (2, 'Standard', 200, 'CZK', '2022-12-31'),
    (3, 'Premium', 400, 'CZK', '2022-12-31'),
    (4, 'Family', 600, 'CZK', '2022-12-31'),
    (5, 'Year', 1000, 'CZK', '2023-12-31');
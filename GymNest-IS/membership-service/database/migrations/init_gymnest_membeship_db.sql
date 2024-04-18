CREATE DATABASE IF NOT EXISTS GymNestMembershipDB;
USE GymNestMembershipDB;

-- Vytvoření aktualizované tabulky 'memberships'
CREATE TABLE IF NOT EXISTS `memberships` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `membershipType` VARCHAR(255) NOT NULL,
    `membershipPrice` DECIMAL(10, 2) NOT NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Vytvoření tabulky 'payments'
CREATE TABLE IF NOT EXISTS `payments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `amount` DECIMAL(10, 2) NOT NULL,
    `paymentDate` DATE NOT NULL,
    `status` VARCHAR(255) NOT NULL UNIQUE CHECK (`status` IN ('pending', 'completed', 'failed')),
    `membershipId` INT NOT NULL,
    `description` TEXT,
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `payments` ADD FOREIGN KEY (`membershipId`) REFERENCES `memberships` (`id`) ON DELETE CASCADE

INSERT INTO `memberships` (`userId`, membershipType, `membershipPrice`, `startDate`, `endDate`, `status`)
VALUES
    (1, 'Standard', 199.99, '2024-04-01', '2024-10-01', 'active'),
    (2, 'Premium', 299.99, '2024-04-01', '2024-10-01', 'active'),
    (3, 'Family', 399.99, '2024-05-01', '2024-11-01', 'active'),
    (4, 'Standard', 199.99, '2024-03-01', '2024-09-01', 'active'),
    (5, 'Year', 999.99, '2024-04-01', '2099-12-31', 'active');
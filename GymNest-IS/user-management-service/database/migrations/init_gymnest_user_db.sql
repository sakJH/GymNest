CREATE DATABASE IF NOT EXISTS GymNestUserDB;
USE GymNestUserDB;

CREATE TABLE IF NOT EXISTS `roles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `roleName` VARCHAR(255) NOT NULL UNIQUE CHECK (`roleName` IN ('člen', 'trenér', 'admin'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `users` (
     `id` INT AUTO_INCREMENT PRIMARY KEY,
     `username` VARCHAR(255) NOT NULL UNIQUE,
     `passwordHash` VARCHAR(255) NOT NULL,
     `email` VARCHAR(255) NOT NULL UNIQUE,
     `roleId` INT NOT NULL,
     `preferredCurrency` VARCHAR(255) DEFAULT 'CZK',
     `colorScheme` VARCHAR(255) DEFAULT 'light',
     `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
     `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `profiles` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `firstName` VARCHAR(255) NOT NULL,
      `lastName` VARCHAR(255) NOT NULL,
      `dateOfBirth` DATE,
      `userId` INT NOT NULL,
      `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
      `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX idx_username ON users(Username);
CREATE INDEX idx_email ON users(Email);

ALTER TABLE `users` ADD FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`);
ALTER TABLE `profiles` ADD FOREIGN KEY (`userId`) REFERENCES `users`(`id`);

INSERT INTO roles (RoleName) VALUES ('člen'), ('trenér'), ('admin');
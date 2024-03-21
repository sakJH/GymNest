CREATE DATABASE IF NOT EXISTS GymNestUserDB;
USE GymNestUserDB;

CREATE TABLE `users` (
     `id` INT AUTO_INCREMENT PRIMARY KEY,
     `username` VARCHAR(255) NOT NULL UNIQUE,
     `passwordHash` VARCHAR(255) NOT NULL,
     `email` VARCHAR(255) NOT NULL UNIQUE,
     `roleId` INT,
     `preferredCurrency` VARCHAR(255) DEFAULT 'CZK',
     `colorScheme` VARCHAR(255) DEFAULT 'light',
     `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
     `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `profiles` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `firstName` VARCHAR(255) NOT NULL,
      `lastName` VARCHAR(255) NOT NULL,
      `dateOfBirth` DATE,
      `userId` INT UNIQUE NOT NULL,
      `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
      `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (`userId`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `roles` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `roleName` VARCHAR(255) NOT NULL UNIQUE CHECK (`roleName` IN ('člen', 'trenér', 'admin'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE INDEX idx_username ON Users(Username);
CREATE INDEX idx_email ON Users(Email);

INSERT INTO Roles (RoleName) VALUES ('člen'), ('trenér'), ('admin');
CREATE DATABASE IF NOT EXISTS GymNestBookingDB;
USE GymNestBookingDB;

-- Vytvoření tabulky 'activities'
CREATE TABLE IF NOT EXISTS `activities` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `type` VARCHAR(255) NOT NULL,
    `duration` INT NOT NULL COMMENT 'Duration in minutes',
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Vytvoření tabulky 'schedules'
CREATE TABLE IF NOT EXISTS `schedules` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `activityId` INT NOT NULL,
    `startTime` DATETIME NOT NULL,
    `endTime` DATETIME NOT NULL,
    `capacity` INT NOT NULL,
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`activityId`) REFERENCES `activities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Vytvoření tabulky 'bookings'
CREATE TABLE IF NOT EXISTS `bookings` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `activityId` INT NOT NULL,
    `scheduleId` INT NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'scheduled',
    `bookingDate` DATE NOT NULL,
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`activityId`) REFERENCES `activities` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`scheduleId`) REFERENCES `schedules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Vytvoření tabulky 'notifications'
CREATE TABLE IF NOT EXISTS `notifications` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` INT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'unread',
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



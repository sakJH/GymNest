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

-- Vytvoření tabulky 'schedule'
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
    `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- Přidání aktivit
INSERT INTO activities (name, description, type, duration) VALUES
    ('Yoga', 'Jemná jóga pro začátečníky.', 'wellness', 60),
    ('Spinning', 'Intenzivní spinning class pro pokročilé.', 'fitness', 45),
    ('Pilates', 'Pilates focení na jádro a flexibilitu.', 'wellness', 50);

-- Přidání rozvrhů
INSERT INTO schedules (activityId, startTime, endTime, capacity) VALUES
    (1, '2024-04-13 10:00:00', '2024-04-13 11:00:00', 10),
    (2, '2024-04-13 12:00:00', '2024-04-13 12:45:00', 15),
    (3, '2024-04-13 14:00:00', '2024-04-13 14:50:00', 8);

-- Přidání rezervací
INSERT INTO bookings (userId, activityId, scheduleId, status, bookingDate) VALUES
    (1, 1, 1, 'scheduled', '2024-04-12'),
    (2, 2, 2, 'scheduled', '2024-04-12'),
    (3, 3, 3, 'scheduled', '2024-04-12');

-- Přidání notifikací
INSERT INTO notifications (userId, title, message, status) VALUES
    (1, 'Upozornění na třídu', 'Vaše třída jogi začíná za 30 minut.', 'unread'),
    (2, 'Rezervace potvrzena', 'Vaše rezervace na spinning byla úspěšně potvrzena.', 'unread');

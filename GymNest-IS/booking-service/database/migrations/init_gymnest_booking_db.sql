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
    ('Pilates', 'Pilates focení na jádro a flexibilitu.', 'wellness', 50),
    ('Crossfit', 'Vysoko intenzivní trénink pro všechny úrovně.', 'fitness', 60),
    ('Zumba', 'Zábavná taneční cvičební třída.', 'dance', 50),
    ('HIIT', 'Vysokointenzivní intervalový trénink.', 'fitness', 45),
    ('Aerobic', 'Tradiční kardio třída zaměřená na vytrvalost.', 'fitness', 60),
    ('Box', 'Boxerský trénink pro zlepšení síly a obratnosti.', 'fight', 45),
    ('Pole dance', 'Taneční třída s tyčí pro zlepšení flexibility a síly.', 'dance', 50),
    ('Pump', 'Kombinace kardio a silového tréninku.', 'fitness', 60);

-- Přidání rozvrhů
INSERT INTO schedules (activityId, startTime, endTime, capacity) VALUES
    (1, '2024-04-21 10:00:00', '2024-04-21 11:00:00', 10),
    (2, '2024-04-22 12:00:00', '2024-04-22 12:45:00', 15),
    (3, '2024-04-23 14:00:00', '2024-04-23 14:50:00', 8),
    (4, '2024-04-24 10:00:00', '2024-04-24 11:00:00', 10),
    (5, '2024-04-25 12:00:00', '2024-04-25 12:45:00', 15),
    (6, '2024-04-26 14:00:00', '2024-04-26 14:50:00', 8),
    (7, '2024-04-26 10:00:00', '2024-04-26 11:00:00', 10),
    (8, '2024-04-27 12:00:00', '2024-04-27 12:45:00', 15),
    (9, '2024-04-28 14:00:00', '2024-04-28 14:50:00', 8),
    (10, '2024-04-29 10:00:00', '2024-04-29 11:00:00', 10),
    (11, '2024-04-30 12:00:00', '2024-04-30 12:45:00', 15);

-- Přidání rezervací
INSERT INTO bookings (userId, activityId, scheduleId, status, bookingDate) VALUES
    (1, 1, 1, 'scheduled', '2024-04-23'),
    (2, 2, 2, 'scheduled', '2024-04-24'),
    (3, 3, 3, 'scheduled', '2024-04-25'),
    (2, 1, 1, 'scheduled', '2024-04-26'),
    (1, 2, 2, 'scheduled', '2024-04-27'),
    (2, 3, 3, 'scheduled', '2024-04-28'),
    (3, 1, 1, 'scheduled', '2024-04-26'),
    (2, 2, 2, 'scheduled', '2024-04-27'),
    (2, 3, 3, 'scheduled', '2024-04-28'),
    (1, 1, 1, 'scheduled', '2024-04-26'),
    (2, 2, 2, 'scheduled', '2024-04-27'),
    (3, 3, 3, 'scheduled', '2024-04-28');

-- Přidání notifikací
INSERT INTO notifications (userId, title, message, status) VALUES
    (1, 'Upozornění na třídu', 'Vaše třída Yogy začíná v 10:00, dne 2024-04-21.', 'unread'),
    (2, 'Upozornění na třídu', 'Vaše třída Spinningu začíná v 12:00, dne 2024-04-22.', 'unread'),
    (3, 'Upozornění na třídu', 'Vaše třída Pilates začíná v 14:00, dne 2024-04-23.', 'unread'),
    (2, 'Upozornění na třídu', 'Vaše třída Crossfitu začíná v 10:00, dne 2024-04-24.', 'unread'),
    (1, 'Upozornění na třídu', 'Vaše třída Zumby začíná v 12:00, dne 2024-04-25.', 'unread'),
    (2, 'Upozornění na třídu', 'Vaše třída HIIT začíná v 14:00, dne 2024-04-26.', 'unread'),
    (3, 'Upozornění na třídu', 'Vaše třída Aerobicu začíná v 10:00, dne 2024-04-26.', 'unread'),
    (2, 'Upozornění na třídu', 'Vaše třída Boxu začíná v 12:00, dne 2024-04-27.', 'unread'),
    (2, 'Upozornění na třídu', 'Vaše třída Pole dance začíná v 14:00, dne 2024-04-28.', 'unread'),
    (1, 'Upozornění na třídu', 'Vaše třída Pump začíná v 10:00, dne 2024-04-29.', 'unread'),
    (2, 'Upozornění na třídu', 'Vaše třída Yogy začíná znovu v 12:00, dne 2024-04-30.', 'unread'),
    (3, 'Upozornění na třídu', 'Vaše třída Spinningu začíná znovu v 14:00, dne 2024-04-30.', 'unread');

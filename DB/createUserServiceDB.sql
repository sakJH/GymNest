CREATE DATABASE IF NOT EXISTS GymNestDB;
USE GymNestDB;

-- Vytvoření tabulky pro role
CREATE TABLE IF NOT EXISTS Roles (
    RoleID INT AUTO_INCREMENT PRIMARY KEY,
    RoleName VARCHAR(255) NOT NULL
);

-- Vytvoření tabulky pro uživatele
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    RoleID INT,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);

-- Vytvoření tabulky pro uživatelské profily
CREATE TABLE IF NOT EXISTS UserProfiles (
    ProfileID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL UNIQUE,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    DateOfBirth DATE,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

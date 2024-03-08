-- GymNestMembershipDB

CREATE DATABASE IF NOT EXISTS GymNestMembershipDB;
USE GymNestMembershipDB;

CREATE TABLE IF NOT EXISTS Memberships (
    MembershipID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT NOT NULL,
    MembershipType VARCHAR(255) NOT NULL,
    MembershipPrice DECIMAL(10, 2) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    FOREIGN KEY (UserID) REFERENCES GymNestUserDB.Users(UserID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Payments (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    MembershipID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate DATE NOT NULL,
    Status VARCHAR(100),
    FOREIGN KEY (MembershipID) REFERENCES Memberships(MembershipID) ON DELETE CASCADE
);

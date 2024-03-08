USE GymNestUserDB;

INSERT INTO Roles (RoleName) VALUES 
('člen'), 
('trenér'), 
('admin');

INSERT INTO Users (Username, PasswordHash, Email, RoleID) VALUES 
('jan.novak', 'hash1234', 'jan.novak@email.cz', 1), 
('eva.svobodova', 'hash5678', 'eva.svobodova@email.cz', 1), 
('lukas.jelinek', 'hash91011', 'lukas.jelinek@email.cz', 2), 
('hana.mala', 'hash121314', 'hana.mala@email.cz', 2), 
('petr.velky', 'hash151617', 'petr.velky@email.cz', 3);

INSERT INTO UserProfiles (UserID, FirstName, LastName, DateOfBirth) VALUES 
(1, 'Jan', 'Novák', '1990-05-21'), 
(2, 'Eva', 'Svobodová', '1988-03-14'), 
(3, 'Lukáš', 'Jelínek', '1992-07-30'), 
(4, 'Hana', 'Malá', '1995-01-05'), 
(5, 'Petr', 'Velký', '1985-11-12');

USE GymNestMembershipDB;

INSERT INTO Memberships (UserID, MembershipType, MembershipPrice, StartDate, EndDate) VALUES 
(1, 'Standard', 500.00, '2023-01-01', '2023-12-31'), 
(2, 'Premium', 800.00, '2023-02-01', '2024-01-31'), 
(3, 'Standard', 500.00, '2023-03-01', '2023-12-31'), 
(4, 'Basic', 300.00, '2023-04-01', '2023-09-30'), 
(5, 'Premium', 800.00, '2023-05-01', '2024-04-30');

INSERT INTO Payments (MembershipID, Amount, PaymentDate, Status) VALUES 
(1, 500.00, '2023-01-01', 'Zaplaceno'), 
(2, 800.00, '2023-02-01', 'Zaplaceno'), 
(3, 250.00, '2023-03-01', 'Částečně zaplaceno'), 
(4, 300.00, '2023-04-01', 'Zaplaceno'), 
(5, 800.00, '2023-05-01', 'Zaplaceno');

USE GymNestBookingDB;

INSERT INTO Activities (ActivityName) VALUES 
('Jóga'), 
('Spinning'), 
('Pilates'), 
('Zumba'), 
('Kruhový trénink');

INSERT INTO Schedules (ActivityID, StartTime, EndTime) VALUES 
(1, '2023-09-01 08:00:00', '2023-09-01 09:00:00'), 
(2, '2023-09-01 10:00:00', '2023-09-01 11:00:00'), 
(3, '2023-09-02 08:00:00', '2023-09-02 09:00:00'), 
(4, '2023-09-02 10:00:00', '2023-09-02 11:00:00'), 
(5, '2023-09-03 08:00:00', '2023-09-03 09:00:00');

INSERT INTO Bookings (UserID, ScheduleID, BookingDate) VALUES 
(1, 1, '2023-08-25 12:00:00'), 
(2, 2, '2023-08-26 12:00:00'), 
(3, 3, '2023-08-27 12:00:00'), 
(4, 4, '2023-08-28 12:00:00'), 
(5, 5, '2023-08-29 12:00:00');

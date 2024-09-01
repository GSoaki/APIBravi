IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'LocalDB')
BEGIN
    CREATE DATABASE LocalDB;
END
GO

USE LocalDB;
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Person]') AND type in (N'U'))
BEGIN
    CREATE TABLE dbo.Person (
        Id UNIQUEIDENTIFIER PRIMARY KEY,
        Name NVARCHAR(100) NOT NULL,
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Contact]') AND type in (N'U'))
BEGIN
    CREATE TABLE dbo.Contact (
        Id UNIQUEIDENTIFIER PRIMARY KEY,
        PersonId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES dbo.Person(Id),
        Value NVARCHAR(100),
		Type NVARCHAR(100)
    );
END
GO

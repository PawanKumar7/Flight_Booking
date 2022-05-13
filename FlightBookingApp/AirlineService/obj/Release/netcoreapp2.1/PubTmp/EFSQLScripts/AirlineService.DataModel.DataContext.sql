IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE TABLE [Airlinetbl] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        [Contact] nvarchar(max) NOT NULL,
        [Address] nvarchar(max) NULL,
        [Status] nvarchar(max) NULL,
        CONSTRAINT [PK_Airlinetbl] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE TABLE [Discounttbl] (
        [Id] int NOT NULL IDENTITY,
        [DiscountCode] nvarchar(max) NULL,
        [Amount] float NOT NULL,
        [StartDate] datetime2 NOT NULL,
        [EndDate] datetime2 NOT NULL,
        CONSTRAINT [PK_Discounttbl] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE TABLE [User] (
        [Id] int NOT NULL IDENTITY,
        [UserName] nvarchar(max) NULL,
        [Password] nvarchar(max) NULL,
        [Email] nvarchar(max) NULL,
        [Gender] nvarchar(max) NULL,
        [IsAdmin] bit NOT NULL,
        CONSTRAINT [PK_User] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE TABLE [Flight_shedule_tbl] (
        [Id] int NOT NULL IDENTITY,
        [AirlineId] int NOT NULL,
        [FromPlace] nvarchar(max) NOT NULL,
        [ToPlace] nvarchar(max) NOT NULL,
        [StartDateTime] datetime2 NOT NULL,
        [EndDateTime] datetime2 NOT NULL,
        [SheduledDay] nvarchar(max) NULL,
        [InstrumentUsed] nvarchar(max) NULL,
        [TotalBCSeats] int NOT NULL,
        [TotalNBCSeats] int NOT NULL,
        [BcTicketCost] decimal(18,2) NOT NULL,
        [NBcTicketCost] decimal(18,2) NOT NULL,
        [MealType] nvarchar(max) NULL,
        CONSTRAINT [PK_Flight_shedule_tbl] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Flight_shedule_tbl_Airlinetbl_AirlineId] FOREIGN KEY ([AirlineId]) REFERENCES [Airlinetbl] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE TABLE [Bookingtbl] (
        [Id] int NOT NULL IDENTITY,
        [PNR] nvarchar(max) NULL,
        [FlightId] int NOT NULL,
        [UserId] int NOT NULL,
        [EmailId] nvarchar(max) NOT NULL,
        [NoOfSeats] int NOT NULL,
        [JourneyType] nvarchar(max) NULL,
        [ReturnDate] datetime2 NULL,
        [BookingStatus] nvarchar(max) NULL,
        [ClassType] nvarchar(max) NULL,
        [TotalCost] float NOT NULL,
        [DiscountId] int NOT NULL,
        CONSTRAINT [PK_Bookingtbl] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Bookingtbl_Discounttbl_DiscountId] FOREIGN KEY ([DiscountId]) REFERENCES [Discounttbl] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Bookingtbl_Flight_shedule_tbl_FlightId] FOREIGN KEY ([FlightId]) REFERENCES [Flight_shedule_tbl] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Bookingtbl_User_UserId] FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE TABLE [Passengertbl] (
        [Id] int NOT NULL IDENTITY,
        [BookingId] int NOT NULL,
        [PassengerName] nvarchar(max) NOT NULL,
        [Gender] nvarchar(max) NOT NULL,
        [Age] int NOT NULL,
        [SeatNo] int NOT NULL,
        CONSTRAINT [PK_Passengertbl] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Passengertbl_Bookingtbl_BookingId] FOREIGN KEY ([BookingId]) REFERENCES [Bookingtbl] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE INDEX [IX_Bookingtbl_DiscountId] ON [Bookingtbl] ([DiscountId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE INDEX [IX_Bookingtbl_FlightId] ON [Bookingtbl] ([FlightId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE INDEX [IX_Bookingtbl_UserId] ON [Bookingtbl] ([UserId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE INDEX [IX_Flight_shedule_tbl_AirlineId] ON [Flight_shedule_tbl] ([AirlineId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    CREATE INDEX [IX_Passengertbl_BookingId] ON [Passengertbl] ([BookingId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220508160441_initials')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220508160441_initials', N'2.1.14-servicing-32113');
END;

GO


CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    RegistrationDate DATETIME NOT NULL,
    LastLogin DATETIME
);

CREATE TABLE Pokemon (
    PokemonID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Type VARCHAR(255) NOT NULL,
    Description TEXT,
    BaseStats JSON
);

CREATE TABLE Card (
    CardID INT AUTO_INCREMENT PRIMARY KEY,
    PokemonID INT,
    CardType VARCHAR(255),
    Rarity VARCHAR(255),
    ImageURL VARCHAR(255),
    FOREIGN KEY (PokemonID) REFERENCES Pokemon(PokemonID)
);

CREATE TABLE Collection (
    CollectionID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    CardID INT,
    Quantity INT,
    PurchasePrice DECIMAL(10,2),
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (CardID) REFERENCES Card(CardID)
);

CREATE TABLE Team (
    TeamID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    TeamName VARCHAR(255),
    Pokemon1ID INT,
    Pokemon2ID INT,
    Pokemon3ID INT,
    Pokemon4ID INT,
    Pokemon5ID INT,
    Pokemon6ID INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID),
    FOREIGN KEY (Pokemon1ID) REFERENCES Pokemon(PokemonID),
    FOREIGN KEY (Pokemon2ID) REFERENCES Pokemon(PokemonID),
    FOREIGN KEY (Pokemon3ID) REFERENCES Pokemon(PokemonID),
    FOREIGN KEY (Pokemon4ID) REFERENCES Pokemon(PokemonID),
    FOREIGN KEY (Pokemon5ID) REFERENCES Pokemon(PokemonID),
    FOREIGN KEY (Pokemon6ID) REFERENCES Pokemon(PokemonID)
);

CREATE TABLE Evolution (
    EvolutionID INT AUTO_INCREMENT PRIMARY KEY,
    PokemonID INT,
    EvolvesToPokemonID INT,
    EvolutionMethod VARCHAR(255),
    LevelRequired INT,
    FOREIGN KEY (PokemonID) REFERENCES Pokemon(PokemonID),
    FOREIGN KEY (EvolvesToPokemonID) REFERENCES Pokemon(PokemonID)
);

CREATE TABLE Collection_Cards (
    CollectionID INT,
    CardID INT,
    PRIMARY KEY (CollectionID, CardID),
    FOREIGN KEY (CollectionID) REFERENCES Collection(CollectionID),
    FOREIGN KEY (CardID) REFERENCES Card(CardID)
);

CREATE TABLE Team(
	teamcode int NOT NULL,
    sekse text NOT NULL,
    leeftijdsklass text NOT NULL,
    PRIMARY KEY(teamcode)
)
;CREATE TABLE Lid(
	naam text NOT NULL,
    adres text NOT NULL,
    geboortejaar int NOT NULL,
    geslacht text NOT NULL,
    jaar_van_toetreding text NOT NULL,
    spelernummber text NOT NULL,
    bondnummer int,
    team int,
    PRIMARY KEY(naam),
	FOREIGN KEY(team) REFERENCES Team (teamcode)
);

CREATE TABLE Rooster(
	dag int NOT NULL,
    tijd int NOT NULL,
    duur int NOT NULL,
    team int NOT NULL,
    PRIMARY KEY(team),
    FOREIGN KEY(team) REFERENCES Team(teamcode)
);
CREATE TABLE Zaal(
	naam text NOT NULL,
    adres text NOT NULL,
    telefoonnummer int NOT NULL,
    team int,
    PRIMARY KEY(naam),
    FOREIGN KEY(team) REFERENCES Team(teamcode)
);
CREATE TABLE Wedstrijd(
	wedstrijdnummer int NOT NULL,
    datum int NOT NULL,
    tijdstip int NOT NULL,
    zaal text NOT NULL,
    team int NOT NULL,
    PRIMARY KEY(wedstrijdnummer),
    FOREIGN KEY (zaal) REFERENCES Zaal (naam),
    FOREIGN KEY (team) REFERENCES Team (teamcode)
);

CREATE TABLE Boete(
    boete_id int NOT NULL,
    slachtoffer_is_verenigin bool NOT NULL,
    speler int,
    bedrag int NOT NULL,
    wedstrijd int NOT NULL,
    PRIMARY KEY(boete_id),
    FOREIGN KEY(wedstrijd) REFERENCES Wedstrijd (wedstrijdnummer),
    FOREIGN KEY(speler) REFERENCES Lid (spelernummber)
);
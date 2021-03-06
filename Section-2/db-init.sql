SET TIME ZONE 'Asia/Singapore';

CREATE TABLE Car (
	SerialNumber VARCHAR(9),
    Manufacturer VARCHAR(255) NOT NULL,
    ModelName VARCHAR(255) NOT NULL,
    Weight FLOAT NOT NULL,
    Price FLOAT NOT NULL,
    PRIMARY KEY (SerialNumber)
);

CREATE TABLE Sale (
	SaleID SERIAL,
    SerialNumber VARCHAR(9),
    CustomerName VARCHAR(255) NOT NULL,
    CustomerPhone VARCHAR(255) NOT NULL,
    SalesPerson VARCHAR(255),
    SalesDate TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (SaleID),
    FOREIGN KEY (SerialNumber) REFERENCES Car (SerialNumber) ON UPDATE CASCADE ON DELETE NO ACTION
);

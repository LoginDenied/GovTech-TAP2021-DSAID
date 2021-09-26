# Question 2
## Information
### Files
- _db-init.sql_
  - Used for initializing database files in the Docker container
- _dockerfile_
  - Contains instructions for the docker build process
- _init-test-data.sql_
  - Contains SQL statements for inserting mock data into a DB for testing purposes
- _Q2-1.sql_
  - Contains the SQL statement answer for Question 1
  - "I want to know the list of our customers and their spending."
- _Q2-2.sql_
  - Contains the SQL statement answer for Question 2
  - "I want to find out the top 3 car manufacturers that customers bought by sales (quantity) and the sales number for it in the current month."
## Assumptions
### SQL Related
- It is assumed that a date related field would be needed due to the sentence "Each transaction would contain information on the date and time of transaction" even though not mentioned under "Each sale transaction contains the following information:"
  - Additionally, it is assumed that time would be needed as well to offer greater seperation of sale items in the case of multiple consecutive sales
- It is assumed that a car can exist in the warehouse (and thus in the system) without being sold
- It is assumed that a car can get resold in a different sale (same SerialNumber but different SalesDate)
  - As such, SerialNumber was not used as the PK
  - It is however noted that a composite key of (SerialNumber, SalesDate) could work as well
- It is assumed that all details are needed for entering the car/sale into the system and cannot be filled in at a later date
- It is assumed that SerialNumber will follow the typical Singaporean car plate format of SXX YYYYZ and thus constrained to be nine characters long
- It is assumed for fields with unknown potential length that a length of 255 characters wil be sufficient
## Considerations
### SQL Related
- While for a purely Singaporean context, CustomerPhone could be constrained to 11 characters due to the format of "+65 XXXXXXXX", it was not done for consideration of possible overseas numbers
- It was considered to seperate Salesperson and Customer to be in seperate tables for better expandability but was not done for this iteration due to a lack of information on attributes of those entities
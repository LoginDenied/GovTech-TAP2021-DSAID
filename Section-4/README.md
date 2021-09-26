# Question 4
## Information
### Files
- _app_
  - Folder for the React application and folder to run `npm start` from
## Assumptions
### Dashboard Related
- It is assumed that "in Singapore over time." means that a user would be able to change the start and end date of the ranges and thus such a functionality was provided
- It is assumed that time is important as it is part of the query string although it is noted to be at "00:00:00Z" when visually inspecting the data
- It is assumed that data for all three statuses of **confirmed**, **recovered** and **deaths** are needed to be shown in addition to **active**
  - As such, "By Country All Status" was used over "By Country" for API call optimization
## Considerations
### Error Catching Related
- It is acknowledged that currently erronous date ranges are not handled (such as end date being before the start date) or dates requested not being available while defaulting to the API's default behavior of returning the entire dataset for display to the user. However, this should be explicitly caught in the logic in future works before the network call as an additional layer of guards
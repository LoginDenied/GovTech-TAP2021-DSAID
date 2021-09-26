# Question 1
## Information
### Files
- datasets
  - processed
    - Output folder for processed files with same name as raw file
    - _dataset1.csv_
      - Processed file for given dataset1.csv file
    - _dataset2.csv_
      - Processed file for given dataset2.csv file
  - raw
    - Folder in which CSV files are searched for
    - _dataset1.csv_
      - Given dataset
    - _dataset2.csv_
      - Given dataset
  - .python-version
    - Normally ignored but provided to show what python version was used for ease of reproducibility 
  - crontab
    - Contains cron command normally set in crontab to schedule tasks
  - data-processing<span>.py
    - Main python file for processing CSVs
  - requirements.txt
    - Requirements file for pip install
## Assumptions
### Scheduling Related
- It is assumed that "You may assume that the data file will be available at 1am everyday." means that the files would have completed transfer before the server clock hits 1am and thus processing can start at 1am sharp.
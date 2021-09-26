# Question 1
## Information
### Files
- data
  - _car.data_
    - Main data file
  - _car.names_
    - File containing information about dataset
- .python-version
  - Normally ignored but provided to show what python version was used for ease of reproducibility
- prediction<span>.py
  - Main python file for performing processing, a simple model selection and performing the required prediction
- requirements.txt
  - Requirements file for pip install
## Assumptions
### Prediction Related
- It is assumed that the parameters given for prediction, "Maintenance = High Number of doors = 4 Lug Boot Size = Big Safety = High Class Value = Good" has leftout persons which is available in the dataset on purpose and thus ignored
## Considerations
### Model Tuning Related
- The model is currently chosen based on a simple iteration over possible parameter pairs for a few parameters, using confusion matrices and f1 scores and printing to output as a simpler implementation due to constraints but is noted to not be optimal and should instead be done with proper model selection functions/libraries
### Data Related
- With the size of the dataset, data augmentation was considered but not done in the end due to a lack of information and more in-depth understanding of the derivation of values in the dataset
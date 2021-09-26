import os
import os.path
import glob
import pandas as pd
import numpy as np

cwd = os.getcwd()
# Get all CSVs in folder
file_paths = glob.glob(os.path.join(cwd, "datasets", "raw", "*.csv"))
for file_path in file_paths:
    # Read file into dataframe
    df = pd.read_csv(file_path)
    # Remove rows that do not have a name
    df["name"].replace("", np.nan, inplace=True)
    df.dropna(subset=["name"], inplace=True)
    # Split name into first name and last name
    df[["first_name", "last_name"]] = df.name.str.split(" ", n=1, expand=True)
    df = df.drop("name", axis=1)
    # Cast price field to float for comparision and removing of pre-pended 0s
    # This might need tweaking based on the possible error ranges for price
    # and only currently works as removing empty names settle the erronous entries
    df = df.astype({"price": "float"})
    # Add above_100 field
    df["above_100"] = np.where(df["price"] > 100, True, False)
    # # Save output file
    df.to_csv(os.path.join(cwd, "datasets", "processed", os.path.basename(file_path)), index=False)

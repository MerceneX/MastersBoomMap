import pandas as pd

data = pd.read_csv("./podatki/vsi_podatki.csv", delimiter=",")
unique_values = data['LVZN_vrsta_avta'].unique()

#data = pd.read_csv("podatki/osebe_csv.csv", delimiter=",")
#unique_values = data['spol'].unique()


print(unique_values)

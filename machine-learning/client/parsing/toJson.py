import pandas as pd

counter = 14
for i in range(1):
    path ='../../podatki/MPDOGOD20'+str(counter)+'.CSV'
    accFile = pd.read_csv(path,delimiter=";")
    accFile.to_json('osebe'+str(counter)+'.json', orient='records')
    counter+=1
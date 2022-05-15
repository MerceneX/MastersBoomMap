import csv
import pandas

csv = pandas.read_csv("podatki\makeJSArray.csv", sep=";", encoding="utf-8")

valuesArray, decoderArray = list(), list()

for i in range(len(csv["SIFRA"])):
    valuesArray.append(csv["SIFRA"][i])
    decoderArray.append(csv["VREDNOST"][i])

print("values : {0},".format(valuesArray))
print("decodedValues : {0},".format(decoderArray))
#f = open("result.txt", "w", encoding="utf-8")
# f.write(str(valuesArray))
# f.close()

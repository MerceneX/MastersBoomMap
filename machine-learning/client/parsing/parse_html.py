from bs4 import BeautifulSoup
import csv

html = open("odsekiDRSI.html").read()
soup = BeautifulSoup(html, features="html.parser")
table = soup.find("table")

output_rows = []
for table_row in table.findAll('tr'):
    columns = table_row.findAll('td')
    output_row = []
    for column in columns:
        output_row.append(column.text)
    output_rows.append(output_row)

outfile = open('odseki.csv','w')
writer=csv.writer(outfile)
writer.writerows(output_rows)
import codecs, json, requests, pandas as pd, numpy as nm, holidays as h,datetime,csv, pyproj
from pandas.io.json import json_normalize

# from url
def get_data():
    url = 'http://localhost:5000/api/data/nesrece'
    response = requests.get(url, stream=True)

    json_data = json.loads(response.text)
    goodData = json_data['features']
    jD = json_normalize(goodData)
    jsonD = pd.DataFrame.from_dict(jD, orient='columns')
    return jsonD


def add_legend(splittedLine):
    for i in range(len(splittedLine)):
        key = str(i) + ":"
        splittedLine[i] = key + splittedLine[i]

    return splittedLine


def data_generator(filename):
    def data_gen():
        with codecs.open(filename, encoding="UTF8", errors='replace') as csvfile:
            for line in csvfile:
                splitted = line.split(',')
                add_legend(splitted)
                yield tuple(k.strip() for k in splitted)

    return data_gen

#gets data out of date
def split_date(column):
    slo_holidays = h.Slovenia()
    date_values = column.values
    months = []
    days = []
    weekdays = []
    holidays = []

    for value in date_values:
        d = datetime.datetime.strptime(value, "%d.%m.%Y")
        months.append(str(d.month))
        days.append(str(d.day) + 'd')
        weekdays.append(str(d.weekday()))
        holidays.append(value in slo_holidays)
    return months, days, weekdays, holidays

#statistic
def get_road_data(data):
    df = pd.DataFrame(data)

    day_of_a_week = df['dan_v_tednu'].value_counts()
    return day_of_a_week.nlargest(n=3,keep='all')
def strip_white_spaces(path):
    reader = csv.DictReader(
        open(path),
    )
    next(reader)
    reader = (
        dict((k, v.strip()) for k, v in row.items() if v) for row in reader)

    output_rows = []
    for row in reader:
        output_rows.append(row)
    reader.close()
    with open(path, 'w') as f:
        w = csv.writer(f)
        w.writerow(output_rows[0].keys())
        for line in output_rows:
            w.writerow(line.values())


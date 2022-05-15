import data_processer as dp, pandas as pd, numpy as nm


def write_to_csv(filename):
    joined_data= read_join_data('MPDOGOD20')
    joined_data.to_csv(filename, encoding='utf-8', index=False)

# reads data and joins,filters it and joins it to a single dataframe
def read_join_data(filename):
    columns_to_observe = ['Cas_Nesrece','PRVR_Vreme', 'PRSP_Promet', 'PRPV_Povrsje','stevilka_odseka','mesec', 'dan', 'dan_v_tednu']

    dataframes = []
    year = 14

    for i in range(5):
        path = '../../podatki/' + filename + str(year) + '.CSV'
        dataframes.append(pd.read_csv(path, delimiter=";"))
        year += 1
    joined = pd.concat(dataframes, ignore_index=True, sort=False)
    months, days, weekdays, holidays = dp.split_date(joined['Datum_Nesrece'])
    joined['mesec'] = pd.Series(nm.array(months))
    joined['dan'] = pd.Series(nm.array(days))
    joined['dan_v_tednu'] = pd.Series(nm.array(weekdays))
    joined['je_praznik'] = pd.Series(nm.array(holidays))
    joined['Cas_Nesrece'] = joined['Cas_Nesrece'].round(0)
    joined['Cas_Nesrece'] = pd.to_numeric(joined['Cas_Nesrece'])
    joined = joined.loc[(joined['stevilka_odseka']!=0.0) & (joined['stevilka_odseka']<10000) &(joined['stevilka_odseka']!=None)]
    joined['stevilka_odseka']=joined['stevilka_odseka'].astype(int)
    return joined[['Cas_Nesrece','PRVR_Vreme', 'PRSP_Promet', 'PRPV_Povrsje','stevilka_odseka','mesec', 'dan', 'dan_v_tednu']]

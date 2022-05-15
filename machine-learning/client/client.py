import requests, data_processer as dp, json, csv, IO, location
import pandas as pd
from efficient_apriori import apriori
import numpy as nm

pd.set_option('precision', 0)
result_json = {}


def create_json_element_surface(itemsets, columns, section, surface):
    result_json[section]['povrsje'][surface] = {}
    for column in columns:
        array_of_values = []
        for element in itemsets[0]:
            element = str(element).translate({ord(i): None for i in "',()/\\"})  # remove extra elements
            splitted = str(element).split(":")
            if columns.get_loc(column) == int(splitted[0]):
                array_of_values.append(splitted[1])
        result_json[section]['povrsje'][surface][column] = array_of_values


def itemsets_to_list(itemsets):
    common_itemsets = list()
    for i in range(len(itemsets)):
        common_itemsets.append(list(itemsets[i + 1].keys()))

    return common_itemsets


def create_result(data, itemsets_dry, itemsets_not_dry, section, sections_df):
    section_name = sections_df.loc[sections_df['odsek'] == section]
    day_of_a_week = dp.get_road_data(data.loc[data['stevilka_odseka']==section])
    keys = list(day_of_a_week.keys())
    result_json[section] = {}
    result_json[section]['povrsje'] = {}
    result_json[section]['dan_teden']=keys
    result_json[section]['kraj'] = section_name.values.tolist()
    result_json[section]['koordinate'] = [location.geocode(str(section_name.iloc[0]['ime_odseka']))]
    create_json_element_surface(itemsets_to_list(itemsets_not_dry), data.columns, section, 'ne_suho')
    create_json_element_surface(itemsets_to_list(itemsets_dry), data.columns, section, 'suho')


# use of apriori algorithm
def create_rules(filename):
    itemsets, rules = apriori(dp.data_generator(filename), min_support=0.07, min_confidence=0.5)
    return itemsets, rules


def save_output(data, sections_df):
    sections_unique = sections_df['odsek'].unique()
    data = data.loc[data['stevilka_odseka'].isin(sections_unique)]
    counts = data['stevilka_odseka'].value_counts()
    data = data[data['stevilka_odseka'].isin(counts[counts > 100].index)]
    sections = pd.Series(nm.array(data['stevilka_odseka'].unique()))

    for section in sections:
        dry = data.loc[
            (data['stevilka_odseka'] == section) & (data['PRPV_Povrsje'] == "SU") & (data['PRSP_Promet'] != 'E')]
        not_dry = data.loc[
            (data['stevilka_odseka'] == section) & (data['PRPV_Povrsje'] != "SU") & (data['PRSP_Promet'] != 'E')]
        dry.to_csv('data/dry.csv', encoding='utf8', index=False)
        not_dry.to_csv('data/not_dry.csv', encoding='utf8', index=False)
        itemsets_dry, rules_dry = create_rules('data/dry.csv')
        itemsets_not_dry, rules_not_dry = create_rules('data/not_dry.csv')
        create_result(data, itemsets_dry, itemsets_not_dry, section, sections_df)

    with open('json/results.json', 'w') as outfile:
        json.dump(result_json, outfile)


def main():
    sections = pd.read_csv('data/odseki.csv')
    data = pd.read_csv('data/data.csv')
    save_output(data, sections)


if __name__ == "__main__":
    main()

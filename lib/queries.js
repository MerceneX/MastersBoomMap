const db = require('../config/database'),
  valuesAndCodes = require('./values');

let queryMen = [];

class QueryMan {
  constructor(id) {
    this.id = id;
    this.title = valuesAndCodes[`graph${id}`].title;
    this.values = valuesAndCodes[`graph${id}`].values;
    this.decodedValues = valuesAndCodes[`graph${id}`].decodedValues;
    this.collection = valuesAndCodes[`graph${id}`].collection;
    this.attribute = valuesAndCodes[`graph${id}`].attribute;
    this.regex = valuesAndCodes[`graph${id}`].regex;
    this.keys = valuesAndCodes[`graph${id}`].keys;
    this.data = null;
  }

  executeQuery(value) {
    return db
      .getDB()
      .collection(this.collection)
      .find({ [this.attribute]: value })
      .count();
  }

  makeEntry(i, numOf) {
    return {
      [this.keys[0]]: this.decodedValues[i]
        ? this.decodedValues[i]
        : this.values[i],
      [this.keys[1]]: numOf
    };
  }

  async prepareStatement(value) {
    if (!this.regex) return await this.executeQuery(value);
    else {
      const rxValue = new RegExp(value);
      return await this.executeQuery(rxValue);
    }
  }

  async queryData() {
    const result = {
      naslov: this.title,
      podatki: []
    };
    const valNum = this.values.length;
    for (let i = 0; i < valNum; i++) {
      let numOf = await this.prepareStatement(this.values[i]);
      const entry = this.makeEntry(i, numOf);
      if (numOf !== 0) result.podatki.push(entry);
    }
    this.data = result;
    this.jsonMerge(this.keys[0], this.keys[1]);
    return result;
  }

  static async getQueryMan(id) {
    const len = queryMen.length;
    for (let i = 0; i < len; i++) {
      if (queryMen[i].id === id) {
        return queryMen[i];
      }
    }
    const queryMan = new QueryMan(id);
    await queryMan.queryData();
    queryMen.push(queryMan);
    return queryMan;
  }

  jsonMerge(keySearch, keyAdd) {
    let newSon = [];
    this.data.podatki.forEach(entry => {
      let isIn = false;
      newSon.forEach(newEntry => {
        if (entry[keySearch] === newEntry[keySearch]) {
          isIn = true;
          newEntry[keyAdd] += entry[keyAdd];
          return true;
        }
      });
      if (isIn) {
      } else {
        newSon.push(entry);
      }
    });
    this.data.podatki = newSon;
  }

  static customQuery(collection, attributes, values) {
    return db
      .getDB()
      .collection(collection)
      .find({ [attributes[0]]: values[0], [attributes[1]]: values[1] })
      .count();
  }
}

module.exports = QueryMan;

const db = require('../../../../../config/database');
const createPipeline = require('../../../modules/createPipeline');

//Pattern: DAO (Data Access Object)
class ContentDAO {
  constructor() {}

  async saveToDB(json, collection) {
    const col = await db.getDB().collection(collection);
    json.items.forEach(item => {
      col.updateOne(item, { $set: item }, { upsert: true }, function (err, r) {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  async updateDB(data, collection) {
    this.saveToDB(data, collection);
  }

  async getFromDB(options, collection) {
    const col = await db.getDB().collection(collection);

    let cursor = col.aggregate(createPipeline(options));
    let docs = [];

    while (await cursor.hasNext()) {
      docs.push(await cursor.next());
    }

    return docs;
  }
}

// Singleton pattern
const getContentDAO = (function () {
  let instance;

  function createInstance() {
    const contentDAO = new ContentDAO();
    return contentDAO;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

//Pattern: Module
module.exports = getContentDAO;

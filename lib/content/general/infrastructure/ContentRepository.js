//Pattern: Repository Pattern
class ContentRepository {
  constructor({ DAO, parser, getFromApi, url, collection }) {
    //Pattern: Dependency Injection
    this._DAO = DAO;
    this._parser = parser;
    this._getFromApi = getFromApi;
    this._url = url;
    this._collection = collection;
  }

  async getContent(options) {
    this._DAO.updateDB(
      await this._parser(await this._getFromApi(this._url)),
      this._collection
    );

    let json = {
      items: [await this._DAO.getFromDB(options, this._collection)]
    };

    return json;
  }
}

module.exports = ContentRepository;

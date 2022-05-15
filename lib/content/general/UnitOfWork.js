const ContentRepository = require('./infrastructure/ContentRepository');
const ContentDAO = require('./infrastructure/DAO/ContentDAO');
const Parsers = require('./infrastructure/parsers/');
const urls = require('./infrastructure/urls');
const collections = require('../../../config/collections');
const getFromApi = require('../modules/getFromAPI');

//Pattern: Unit of Work
const getBorders = async options => {
  return await new ContentRepository({
    DAO: ContentDAO.getInstance(),
    parser: Parsers.Borders,
    getFromApi,
    url: urls.borders,
    collection: collections.borders
  }).getContent(options);
};

const getRoadConditions = async options => {
  return await new ContentRepository({
    DAO: ContentDAO.getInstance(),
    parser: Parsers.RoadConditions,
    getFromApi,
    url: urls.roadConditions,
    collection: collections.roadConditions
  }).getContent(options);
};

const getRoadEvents = async options => {
  return await new ContentRepository({
    DAO: ContentDAO.getInstance(),
    parser: Parsers.RoadEvents,
    getFromApi,
    url: urls.roadEvents,
    collection: collections.roadEvents
  }).getContent(options);
};

const getNews = async options => {
  return await new ContentRepository({
    DAO: ContentDAO.getInstance(),
    parser: Parsers.News,
    getFromApi,
    url: urls.news,
    collection: collections.news
  }).getContent(options);
};

const getTrafficForecast = async options => {
  return await new ContentRepository({
    DAO: ContentDAO.getInstance(),
    parser: Parsers.TrafficForecast,
    getFromApi,
    url: urls.trafficForecast,
    collection: collections.trafficeForecast
  }).getContent(options);
};

module.exports = {
  getBorders,
  getRoadConditions,
  getRoadEvents,
  getNews,
  getTrafficForecast
};

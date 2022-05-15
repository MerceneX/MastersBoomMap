var parseString = require('xml2js').parseString;

const TrafficForecastParser = async data => {
  let output = {};
  parseString(data, function (err, result) {
    output = {
      title: result.rss.channel[0].title.toString(),
      link: result.rss.channel[0].link.toString(),
      items: []
    };
    if (!result.rss.channel) {
      console.log('No new traffic forecast updates');
      return output;
    }
    result.rss.channel[0].item.forEach(item => {
      const temp = {
        title: item.title[0].toString(),
        description: item.description[0].toString(),
        link: item.link[0].toString(),
        datePublished: new Date(item.pubDate[0]).toISOString()
      };
      output.items.push(temp);
    });
  });
  return output;
};

module.exports = TrafficForecastParser;

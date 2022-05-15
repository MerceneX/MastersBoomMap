var parseString = require('xml2js').parseString;

const NewsParser = data => {
  let output = {};
  parseString(data, function (err, result) {
    output = {
      title: 'Novice',
      dateUpdated: 'now',
      items: []
    };
    if (!result.rss.channel) {
      console.log('No new news updates');
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

module.exports = NewsParser;

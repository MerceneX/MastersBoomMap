var parseString = require('xml2js').parseString;

const RoadEventsParser = async data => {
  let output = {};
  parseString(data, function (err, result) {
    if (validate(err, result, output, data)) {
      result.feed.entry.forEach(item => output.items.push(parseEntry(item)));
    } else {
      return output;
    }
  });
  return output;
};

const validate = (err, result, output, data) => {
  output.items = [];

  if (err) {
    output.error = 'Parsing error; At the xml2js library level.';
    output.errorInput = data;
    return false;
  }

  if (!result) {
    output.error = 'Parsing error; No result from parsing.';
    output.errorInput = data;
    return false;
  }

  try {
    output.title = result.feed.title[0].toString();
    output.dateUpdated = result.feed.updated[0].toString();
  } catch (e) {
    output.error = 'Parsing error; Attributes not found.';
    output.errorInput = data;
    return false;
  }

  if (!result.feed.entry) {
    output.providedInput = data;
    return false;
  }
  return true;
};

const parseEntry = entry => {
  try {
    const regexTitle = entry.title[0]
      .toString()
      .match(/(^(.+(?=,))(|^[A-Z0-9-,]*))(,\s)(.*)(:\s)([A-Za-z]*)/);
    return {
      title: `${regexTitle[7]} v ${regexTitle[5]}`,
      roadSection: regexTitle[1],
      location: regexTitle[5],
      category: regexTitle[7],
      description: entry.content[0].toString(),
      datePublished: entry.updated[0].toString()
    };
  } catch (e) {
    return {
      error: true,
      data: JSON.stringify(entry),
      message: 'Parsing error; Entry not parsable.'
    };
  }
};

module.exports = RoadEventsParser;

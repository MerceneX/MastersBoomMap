var parseString = require('xml2js').parseString;

const RoadConditionsParser = async data => {
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
    output.title = result.feed.title.toString();
    output.dateUpdated = result.feed.updated.toString();
    output.link = result.feed.link[0].$.href.toString();
    output.items = [];
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
    return {
      title: entry.title[0].toString(),
      description: entry.content[0]._.toString(),
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

module.exports = RoadConditionsParser;

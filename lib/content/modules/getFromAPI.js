const axios = require('axios');
const getFromApi = async url => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = getFromApi;

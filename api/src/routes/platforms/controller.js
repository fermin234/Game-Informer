require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;

async function getPlataforms() {
  try {
    let apiInfo = await axios.get(
      `https://api.rawg.io/api/platforms?key=${API_KEY}`
    );
    apiInfo = apiInfo.data;
    apiInfo = apiInfo.results
      .map((e) => {
        return { id: e.id, name: e.name };
      })
      .sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : 0
      )
      .filter((e) => e.id !== 111);
    return apiInfo;
  } catch (error) {}
}
module.exports = {
  getPlataforms,
};

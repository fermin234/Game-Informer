require("dotenv").config();
const axios = require("axios");
const { Genre } = require("../../db.js");
const { API_KEY } = process.env;

async function getGenres() {
  try {
    //Verifico si existe algo en DB.
    let DBinfo = await Genre.findAll();
    if (DBinfo.length) return DBinfo;
    //Si no hay nada, traigo de la api
    else {
      let ApiInfo = await axios.get(
        `https://api.rawg.io/api/genres?key=${API_KEY}`
      );
      ApiInfo = ApiInfo.data.results
        .map((e) => {
          return { id: e.id, name: e.name };
        })
        .sort((a, b) => a.id - b.id);
      //creo en la DB
      await Genre.bulkCreate(ApiInfo);
      return ApiInfo;
    }
  } catch (error) {
    return error;
  }
}

module.exports = { getGenres };

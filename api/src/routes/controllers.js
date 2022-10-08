const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js');

async function getAllVideoGames() {
  try {
    //creacion de un video juego en la db
    await Videogame.create({ name: 'nose', description: 'nose2' });
    let ApiInfo = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}`
    );
    ApiInfo = ApiInfo.data.results?.map((e) => {
      return {
        id: e.id,
        name: e.name,
        description: null,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms.map((e) => e.platform.name),
        background_image: e.background_image,
      };
    });

    ApiInfo = ApiInfo.concat(await Videogame.findAll({ include: [Genre] }));

    return ApiInfo;
  } catch (error) {
    return error;
  }
}

async function getVideoGameName(name) {
  try {
    //busco en la db
    let ApiInfo = await Videogame.findOne({
      where: { name },
    });
    if (ApiInfo) return ApiInfo;

    //busco en la api
    ApiInfo = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&&search=${name}`
    );
    ApiInfo = ApiInfo.data.results.slice(0, 15).map((e) => {
      return {
        name: e.name,
        description: null,
        released: e.released,
        rating: e.rating,
        platforms: e.platforms.map((e) => e.platform.name),
        background_image: e.background_image,
      };
    });
    return ApiInfo.length ? ApiInfo : `${name} no existe.`;
  } catch (error) {
    return error;
  }
}

async function getVideoGameId(id) {
  try {
    //busco en la db primero
    if (id.length > 15) {
      let DBinfo = await Videogame.findOne({
        //falta hacer el join con genre
        where: { id },
      });
      if (DBinfo) return DBinfo;
      return 'ID invalido.';
    } else {
      //busco en la api
      let ApiInfo = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      return ApiInfo.data;
    }
  } catch (error) {
    // console.log(error);
    return error;
  }
}

async function createVideoGame(
  name,
  description,
  released,
  rating,
  platforms,
  genres
) {
  try {
    let Game = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
    });
    // Falta setear el genero
    // Game.setGenre(genres);
    return `${name} creado con exito.`;
  } catch (error) {
    return error;
  }
}

async function getGenres() {
  try {
    //Verifico si existe algo en DB.
    let DBinfo = await Genre.findAll();
    if (DBinfo.length) return DBinfo;
    //Si no hay nada, traigo de la api
    else {
      let ApiInfo = await axios.get(
        `https://api.rawg.io/api/genres?key=34940aeb3fbe409ea1247fe06de602b0`
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
module.exports = {
  getAllVideoGames,
  getVideoGameName,
  getVideoGameId,
  createVideoGame,
  getGenres,
};

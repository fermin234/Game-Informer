import fallbackData from "../../data/fallbackData.json";

export const FILTER = "FILTER";
export const LOADER = "LOADER";
export const ALL_GENRES = "ALL_GENRES";
export const RESET_CREATE = "RESET_CREATE";
export const RESET_FILTRES = "RESET_FILTRES";
export const GET_PLATAFORMS = "GET_PLATAFORMS";
export const CREATE_VIDEO_GAME = "CREATE_VIDEO_GAME";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";
const axios = require("axios");

export function allVideoGames() {
  return async (dispatch) => {
    try {
      let data = await axios.get("/videogames");
      return dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: data.data,
      });
    } catch (error) {
      console.warn("API call failed, using fallback data:", error.message);
      return dispatch({
        type: GET_ALL_VIDEOGAMES,
        payload: fallbackData.videogames,
      });
    }
  };
}

export function todosLosGeneros() {
  return async (dispatch) => {
    try {
      let data = await axios.get("/genres");
      return dispatch({
        type: ALL_GENRES,
        payload: data.data,
      });
    } catch (error) {
      console.warn("Genres API call failed, using fallback data:", error.message);
      return dispatch({
        type: ALL_GENRES,
        payload: fallbackData.genres,
      });
    }
  };
}

export function VideoGameByName(name) {
  return async (dispatch) => {
    try {
      let data = await axios.get(`/videogames?name=${name}`);
      return dispatch({
        type: GET_VIDEOGAME_BY_NAME,
        payload: data.data,
      });
    } catch (error) {
      console.warn("Search API call failed, using fallback data:", error.message);
      const filteredGames = fallbackData.videogames.filter(game => 
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      return dispatch({
        type: GET_VIDEOGAME_BY_NAME,
        payload: filteredGames,
      });
    }
  };
}

export function VideoGameById(id) {
  return async (dispatch) => {
    try {
      let data = await axios.get(`/videogames/${id}`);
      return dispatch({
        type: GET_VIDEOGAME_BY_ID,
        payload: data.data,
      });
    } catch (error) {
      console.warn("Game detail API call failed, using fallback data:", error.message);
      const game = fallbackData.videogames.find(game => game.id === parseInt(id));
      return dispatch({
        type: GET_VIDEOGAME_BY_ID,
        payload: game || {},
      });
    }
  };
}

export function createVideoGame(videoGameInfo) {
  return async (dispatch) => {
    try {
      await axios.post(`/videogames`, videoGameInfo);
      return dispatch({
        type: CREATE_VIDEO_GAME,
        payload: videoGameInfo,
      });
    } catch (error) {
      console.warn("Create game API call failed, simulating locally:", error.message);
      const newGame = {
        ...videoGameInfo,
        id: Date.now(),
        created: true
      };
      return dispatch({
        type: CREATE_VIDEO_GAME,
        payload: newGame,
      });
    }
  };
}

export function ResetCreate() {
  return (dispatch) =>
    dispatch({
      type: RESET_CREATE,
    });
}

export function ResetFilter() {
  return (dispatch) =>
    dispatch({
      type: RESET_FILTRES,
    });
}

export function filter(payload) {
  return (dispatch) =>
    dispatch({
      type: FILTER,
      payload,
    });
}

export function loader(payload) {
  return (dispatch) =>
    dispatch({
      type: LOADER,
      payload,
    });
}

export function deleteVideoGame(payload) {
  return async (dispatch) => {
    try {
      await axios.delete(`videogames/deleteVideoGame/${payload}`);
      dispatch({
        type: DELETE_VIDEOGAME,
        payload,
      });
      dispatch({
        type: RESET_FILTRES,
      });
    } catch (error) {
      console.warn("Delete game API call failed, simulating locally:", error.message);
      dispatch({
        type: DELETE_VIDEOGAME,
        payload,
      });
      dispatch({
        type: RESET_FILTRES,
      });
      alert("API no disponible. Solo se pueden eliminar juegos creados localmente.");
    }
  };
}

export function getPlataforms() {
  return async (dispatch) => {
    try {
      const result = await axios.get("/platforms");
      dispatch({
        type: GET_PLATAFORMS,
        payload: result.data,
      });
    } catch (error) {
      console.warn("Platforms API call failed, using fallback data:", error.message);
      dispatch({
        type: GET_PLATAFORMS,
        payload: fallbackData.platforms,
      });
    }
  };
}

export const FILTER = "FILTER";
export const LOADER = "LOADER";
export const ALL_GENRES = "ALL_GENRES";
export const RESET_CREATE = "RESET_CREATE";
export const RESET_FILTRES = "RESET_FILTRES";
export const CREATE_VIDEO_GAME = "CREATE_VIDEO_GAME";
export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const GET_VIDEOGAME_BY_NAME = "GET_VIDEOGAME_BY_NAME";
export const DESPLEGAR_FILTROS = "DESPLEGAR_FILTROS";
const axios = require("axios");

export function allVideoGames() {
  return async (dispatch) => {
    let data = await axios.get("/videogames");
    return dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: data.data,
    });
  };
}

export function todosLosGeneros() {
  return async (dispatch) => {
    let data = await axios.get("/genres");
    return dispatch({
      type: ALL_GENRES,
      payload: data.data,
    });
  };
}

export function VideoGameByName(name) {
  return async (dispatch) => {
    let data = await axios.get(`/videogames?name=${name}`);
    return dispatch({
      type: GET_VIDEOGAME_BY_NAME,
      payload: data.data,
    });
  };
}

export function VideoGameById(id) {
  return async (dispatch) => {
    let data = await axios.get(`/videogames/${id}`);
    return dispatch({
      type: GET_VIDEOGAME_BY_ID,
      payload: data.data,
    });
  };
}

export function createVideoGame(videoGameInfo) {
  return async () => {
    await axios.post(`/videogames`, videoGameInfo);
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

export function desplegarFiltros() {
  return (dispatch) =>
    dispatch({
      type: DESPLEGAR_FILTROS,
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

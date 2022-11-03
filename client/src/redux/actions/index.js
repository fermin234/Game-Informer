export const ALL_GENRES = 'ALL_GENRES';
export const RESET_CREATE = 'RESET_CREATE';
export const SORTING_BY_AZ = 'SORTING_BY_AZ';
export const RESET_FILTRES = 'RESET_FILTRES';
export const FILTERED_GENRES = 'FRILTERED_GENRES';
export const FILTERED_CREATE = 'FRILTERED_CREATE';
export const CREATE_VIDEO_GAME = 'CREATE_VIDEO_GAME';
export const SORTING_BY_RATING = 'SORTING_BY_RATING';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID';
export const GET_VIDEOGAME_BY_NAME = 'GET_VIDEOGAME_BY_NAME';
const axios = require('axios');

export function allVideoGames() {
  return async (dispatch) => {
    let data = await axios.get('/videogames');
    return dispatch({
      type: GET_ALL_VIDEOGAMES,
      payload: data.data,
    });
  };
}

export function todosLosGeneros() {
  return async (dispatch) => {
    let data = await axios.get('/genres');
    return dispatch({
      type: ALL_GENRES,
      payload: data.data,
    });
  };
}

export function filterViodeGamesByGenres(payload) {
  return (dispatch) =>
    dispatch({
      type: FILTERED_GENRES,
      payload,
    });
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

export function SortByAz(payload) {
  return (dispatch) =>
    dispatch({
      type: SORTING_BY_AZ,
      payload,
    });
}

export function SortByRating(payload) {
  return (dispatch) =>
    dispatch({
      type: SORTING_BY_RATING,
      payload,
    });
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

export function filterByCreate() {
  return (dispatch) =>
    dispatch({
      type: FILTERED_CREATE,
    });
}

export const ALL_GENRES = 'ALL_GENRES';
export const FRILTERED_GENRES = 'FRILTERED_GENRES';
export const CREATE_VIDEO_GAME = 'CREATE_VIDEO_GAME';
export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAME_BY_ID = 'GET_VIDEOGAME_BY_ID';
export const GET_VIDEOGAME_BY_NAME = 'GET_VIDEOGAME_BY_NAME';
export const SORTING_BY_AZ = 'SORTING_BY_AZ';
export const SORTING_BY_RATING = 'SORTING_BY_RATING';
const axios = require('axios');

export function allVideoGames() {
  console.log('se despacha all games');
  return (dispatch) => {
    fetch(`http://localhost:3001/videogames`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GET_ALL_VIDEOGAMES,
          payload: data,
        })
      );
  };
}

//cambiar nombre
export function todosLosGeneros() {
  return (dispatch) => {
    fetch(`http://localhost:3001/genres`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: ALL_GENRES,
          payload: data,
        })
      );
  };
}

export function filterViodeGamesByGenres(payload) {
  return (dispatch) =>
    dispatch({
      type: FRILTERED_GENRES,
      payload,
    });
}

export function VideoGameByName(name) {
  return (dispatch) => {
    fetch(`http://localhost:3001/videogames?name=${name}`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GET_VIDEOGAME_BY_NAME,
          payload: data,
        })
      );
  };
}

export function VideoGameById(id) {
  return (dispatch) => {
    fetch(`http://localhost:3001/videogames/${id}`)
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GET_VIDEOGAME_BY_ID,
          payload: data,
        })
      );
  };
}

// export function createVideoGame(videoGameInfo) {
//   console.log('se despacho create');
//   return (dispatch) => {
//     fetch(`http://localhost:3001/videogames`, {
//       method: 'POST',
//       body: videoGameInfo,
//     })
//       .then((response) => response.json())
//       .then((data) =>
//         dispatch({
//           type: CREATE_VIDEO_GAME,
//           payload: data,
//         })
//       );
//   };
// }

// export function createVideoGame(videoGameInfo) {
//   console.log('se despacho create');
//   return async (dispatch) => {
//     let videoGame = await axios.post(
//       `http://localhost:3001/videogames`,
//       videoGameInfo
//     );
//     return dispatch({
//       type: CREATE_VIDEO_GAME,
//       payload: videoGame,
//     });
//   };
// }

export function createVideoGame(videoGameInfo) {
  return async () => {
    await axios.post(`http://localhost:3001/videogames`, videoGameInfo);
  };
}

export function SortByAz(payload) {
  console.log('se despacha');
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

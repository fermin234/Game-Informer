import {
  ALL_GENRES,
  FRILTERED_GENRES,
  CREATE_VIDEO_GAME,
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAME_BY_NAME,
} from '../actions/index.js';

const initialState = {
  videoGames: [],
  filtred: [],
  genres: [],
  detail: {},
  createVideoGame: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videoGames: action.payload,
        filtred: action.payload,
      };
    case ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case FRILTERED_GENRES:
      const allVideoGames = state.videoGames;
      const filtrado =
        action.payload === 'All Genres'
          ? allVideoGames
          : action.payload === 'All Genres'
          ? [state.createVideoGame]
          : allVideoGames.filter((e) => e.genres.includes(action.payload));
      return {
        ...state,
        filtred: filtrado,
      };
    case GET_VIDEOGAME_BY_NAME:
      return {
        ...state,
        videoGames: action.payload,
      };
    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case CREATE_VIDEO_GAME:
      return {
        ...state,
        createVideoGame: action.payload,
      };
    default:
      return { ...state };
  }
}

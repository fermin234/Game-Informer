import {
  ALL_GENRES,
  SORTING_BY_AZ,
  FRILTERED_GENRES,
  SORTING_BY_RATING,
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAME_BY_NAME,
} from '../actions/index.js';

const initialState = {
  videoGames: [],
  filtred: [],
  genres: [],
  detail: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      const filtrando = state.filtred.length ? state.filtred : action.payload;

      return {
        ...state,
        videoGames: action.payload,
        filtred: filtrando,
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
        filtred: action.payload,
      };

    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };

    case SORTING_BY_AZ:
      const a = state.filtred.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      console.log('asdasd ', state.filtred);

      return {
        ...state,
        filtred: a,
      };

    default:
      return { ...state };
  }
}
// A-Z
// Z-A
// Creado

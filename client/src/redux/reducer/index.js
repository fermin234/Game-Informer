import {
  ALL_GENRES,
  SORTING_BY_AZ,
  FILTERED_GENRES,
  SORTING_BY_RATING,
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAME_BY_NAME,
  RESET_CREATE,
  RESET_FILTRES,
  FILTERED_CREATE,
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
        filtred: [...filtrando],
      };

    case ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FILTERED_GENRES:
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
      let sortArr = state.videoGames;
      if (action.payload === 'A-Z') {
        sortArr = state.filtred.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
      }
      if (action.payload === 'Z-A') {
        sortArr = state.filtred.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        filtred: sortArr,
      };

    case SORTING_BY_RATING:
      let ratingSort;

      if (action.payload === 'RatingDES') {
        ratingSort = state.filtred.sort((a, b) => {
          if (a.rating > b.rating) {
            return 1;
          }
          if (a.rating < b.rating) {
            return -1;
          }
          return 0;
        });
      }

      if (action.payload === 'RatingASC') {
        ratingSort = state.filtred.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          }
          if (a.rating < b.rating) {
            return 1;
          }
          return 0;
        });
      }

      return {
        ...state,
        filtred: ratingSort,
      };

    case RESET_CREATE:
      return {
        ...state,
        detail: {},
      };

    case RESET_FILTRES:
      return {
        ...state,
        filtred: state.videoGames,
      };

    case FILTERED_CREATE:
      const creados = state.filtred.filter((e) => e.created === true);

      return {
        ...state,
        filtred: creados,
      };

    default:
      return { ...state };
  }
}

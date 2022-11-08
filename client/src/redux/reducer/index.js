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
  CREATE_VIDEO_GAME,
} from '../actions/index.js';

const initialState = {
  videoGames: [],
  filtred: [],
  genres: [],
  detail: {},
  loader: false,
  switchFiltred: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        videoGames: action.payload,
        filtred: action.payload,
        loader: true,
      };

    case ALL_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case FILTERED_GENRES:
      const allVideoGames = [...state.videoGames];
      const filtrado =
        action.payload === 'All Genres'
          ? allVideoGames
          : action.payload === 'All Genres'
          ? [state.createVideoGame]
          : allVideoGames.filter((e) => e.genres.includes(action.payload));

      return {
        ...state,
        filtred: [...filtrado],
        switchFiltred: true,
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
      let sortArr = [...state.filtred];

      if (action.payload === 'A-Z') {
        sortArr = sortArr.sort((a, b) => {
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
        sortArr = sortArr.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
      }
      if (action.payload === 'Ordenamiento') {
        sortArr = [...state.videoGames];
      }

      return {
        ...state,
        filtred: [...sortArr],
        switchFiltred: true,
      };

    case SORTING_BY_RATING:
      let ratingSort = [...state.filtred];

      if (action.payload === 'RatingDES') {
        ratingSort.sort((a, b) => {
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
        ratingSort.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          }
          if (a.rating < b.rating) {
            return 1;
          }
          return 0;
        });
      }

      if (action.payload === 'Rating') {
        ratingSort = [...state.videoGames];
      }

      return {
        ...state,
        filtred: [...ratingSort],
        switchFiltred: true,
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
        switchFiltred: false,
      };

    case FILTERED_CREATE:
      const creados = state.filtred.filter((e) => e.created === true);

      return {
        ...state,
        filtred: [...creados],
        switchFiltred: true,
      };

    case CREATE_VIDEO_GAME:
      return {
        ...state,
        filtred: state.videoGames,
      };
    default:
      return { ...state };
  }
}

import {
  ALL_GENRES,
  GET_ALL_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAME_BY_NAME,
  RESET_CREATE,
  RESET_FILTRES,
  CREATE_VIDEO_GAME,
  DESPLEGAR_FILTROS,
  FILTER,
} from "../actions/index.js";

const initialState = {
  videoGames: [],
  filtred: [],
  genres: [],
  detail: {},
  filterValues: {},
  loader: false,
  switchFiltred: false,
  desplegarFiltros: false,
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

    case FILTER:
      let gamesFiltred = [...state.videoGames];
      const value = action.payload;

      if (value.genre) {
        gamesFiltred = gamesFiltred.filter((e) =>
          e.genres.includes(value.genre)
        );
      }

      if (value.sort) {
        if (value.sort === "A-Z") {
          gamesFiltred = gamesFiltred.sort((a, b) =>
            a.name > b.name ? 1 : a.name < b.name ? -1 : 0
          );
        }

        if (value.sort === "Z-A") {
          gamesFiltred = gamesFiltred.sort((a, b) =>
            a.name > b.name ? -1 : a.name < b.name ? 1 : 0
          );
        }
      }

      if (value.rating) {
        if (value.rating === "RatingDES") {
          gamesFiltred = gamesFiltred.sort((a, b) =>
            a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0
          );
        }

        if (value.rating === "RatingASC") {
          gamesFiltred = gamesFiltred.sort((a, b) =>
            a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0
          );
        }
      }

      if (value.created) {
        gamesFiltred = gamesFiltred.filter((e) => e.created);
      }

      return {
        ...state,
        filtred: gamesFiltred,
        filterValues: action.payload,
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
        filterValues: {
          genre: null,
          sort: null,
          rating: null,
          created: false,
        },
      };

    case CREATE_VIDEO_GAME:
      return {
        ...state,
        filtred: state.videoGames,
      };

    case DESPLEGAR_FILTROS:
      return {
        ...state,
        desplegarFiltros: !state.desplegarFiltros,
      };
    default:
      return { ...state };
  }
}

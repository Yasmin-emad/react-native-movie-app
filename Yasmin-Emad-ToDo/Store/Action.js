import axios from "axios";

export const getMovies = () => {
  try {
    return async (dispatch) => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=1583bd4a7b0da462480c756403c9bc65"
      );

      if (res.data) {
        dispatch({
          type: "FETCH_MOVIES",
          payload: res.data.results,
        });
      } else {
        console.log("Unable to fetch");
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const addFavorite = (movie) => (dispatch) => {
  dispatch({
    type: "ADD_FAVORITE_ITEM",
    payload: movie,
  });
};

export const removeFavorite = (movie) => (dispatch) => {
  dispatch({
    type: "REMOVE_FAVORITE_ITEM",
    payload: movie,
  });
};

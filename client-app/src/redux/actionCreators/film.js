import filmsAT from "../actionTypes/films";
import { messagesActions } from "./message";
import { filmsService } from "../../services";

const { addError, addInfo, addSuccess } = messagesActions;

const addFilm = (film) => ({
  type: filmsAT.ADD_FILM,
  payload: { film },
});

const filmsLoading = () => ({
  type: filmsAT.FILMS_LOADING,
});

const loadingFailed = (message) => ({
  type: filmsAT.LOADING_FAILED,
  payload: { message },
});

const addFilms = (films) => ({
  type: filmsAT.ADD_FILMS,
  payload: { films },
});

const deleteFilm = (id) => ({
  type: filmsAT.DELETE_FILM,
  payload: { id },
});

const setSorting = (sortFunc) => ({
  type: filmsAT.SET_SORTING,
  payload: { sortFunc },
});

const setOrder = (order) => ({
  type: filmsAT.SET_ORDER,
  payload: { order },
});

const fetchFilms = () => (dispatch) => {
  dispatch(filmsLoading());
  return filmsService
    .getAll()
    .then((films) => {
      dispatch(addFilms(films));
      dispatch(addInfo("Films fetched"));
    })
    .catch((error) => {
      dispatch(loadingFailed(error));
      dispatch(addError(error));
    });
};

const postFilm = (film) => (dispatch) => {
  return filmsService
    .postOne()
    .then((id) => {
      dispatch(addFilm({ ...film, id }));
      dispatch(addSuccess("Your film successfully posted"));
    })
    .catch((error) => {
      dispatch(addError("Your film could not be posted\nError: " + error));
    });
};

const postFile = (file) => (dispatch) => {
  return filmsService
    .postFile(file)
    .then(() => {
      dispatch(fetchFilms());
      dispatch(addSuccess("Your file succesfully posted"));
    })
    .catch((error) => {
      dispatch(addError("Your file could not be posted\nError: " + error));
    });
};

const removeFilm = (id) => (dispatch) => {
  return filmsService
    .deleteOne(id)
    .then((id) => {
      dispatch(deleteFilm(id));
      dispatch(addSuccess("Film successfully deleted"));
    })
    .catch((error) => {
      dispatch(addError("Film could not be deleted\nError: " + error.message));
    });
};

export const filmActions = {
  addFilm,
  filmsLoading,
  removeFilm,
  postFile,
  postFilm,
  deleteFilm,
  fetchFilms,
  setOrder,
  setSorting,
  addFilms,
};

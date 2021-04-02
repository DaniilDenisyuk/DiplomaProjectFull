import { ModalsTypes } from "../actionTypes";

const openModal = (modalKey) => ({
  type: ModalsTypes.OPEN_MODAL,
  payload: modalKey,
});

const closeModal = (modalKey) => ({
  type: ModalsTypes.OPEN_MODAL,
  payload: modalKey,
});

export const modalsAC = {
  openModal,
  closeModal,
};

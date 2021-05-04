import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./actionTypes";

export const setAlert = (msg, alertType, timeout = 3000) => (dispatch) => {
  const id = uuid.v4(); //gives you a random id as a long string

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};

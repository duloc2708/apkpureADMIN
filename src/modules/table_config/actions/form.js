import {
  GET_LIST_TABLE
} from "../types";

export const getListData = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL}parameter-settings`).then(
        response => {
          const { data } = response.data;
          dispatch({
            type: GET_LIST_TABLE,
            payload: {
              list_data: data
            }
          });
          resolve(response);
        },
        err => {
          reject(err);
        }
      );
    });
  };
};

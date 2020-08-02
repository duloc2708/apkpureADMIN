import { GET_ALL_TABLE_CONFIG, GET_ALL_PARAMS } from "../types";
export const getListAllTableConfig = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL}table-configs`).then(
        response => {
          let { data } = response.data;
          dispatch({
            type: GET_ALL_TABLE_CONFIG,
            payload: {
              list_table_config: data
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
export const getListAllParameter = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL}parameter-settings`).then(
        response => {
          let { data } = response.data;
          dispatch({
            type: GET_ALL_PARAMS,
            payload: {
              list_data_all: data
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

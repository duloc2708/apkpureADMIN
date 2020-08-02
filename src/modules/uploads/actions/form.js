import { LIST_FILE } from "../types";
export const getListData = () => {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			axios.get(`${Config.API_URL}files`).then(
				response => {
					let { data } = response.data;
					console.log(data);
					dispatch({
						type: LIST_FILE,
						payload: {
							data: data
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

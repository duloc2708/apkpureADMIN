import { IS_RENDER_CONTENT } from "../types";
export const IsRenderContent = value => {
  return (dispatch, getState) => {
    dispatch({
      type: IS_RENDER_CONTENT,
      payload: {
        is_render: value
      }
    });
  };
};

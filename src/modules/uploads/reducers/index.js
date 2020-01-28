import { LIST_FILE } from "../types";

const INITIAL_STATE = {
    objData: {
        id: "",
        name: "",
        type: "",
        fileId: ""
    },
    listHeader: [
        { code: "id", label: "FileId" },
        { code: "name", label: "Tên file" },
        { code: "mine", label: "Định dạng" },
        { code: "delete", label: "Xoá" }
    ],
    data: []
};
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_FILE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
    return state;
};
export default Reducer;

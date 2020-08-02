import {
    GET_LIST_BAG_TICKET_PROC,
    CHANGE_INPUT_SEARCH
} from "../types";
const INITIAL_STATE = {
    list_data: [{
        codeBag: "000037948",
        keyMap: "CAS-000000002",
        worker: 'J0040',
        nameLV: '610',
        dateMake: '06/05/2020 11:30:25',
        status: 'Xác nhận về'
    }],
    listHeaderTable: [
        {
            key: "checked",
            title: "",
            type: "checked",
            format: "",
            class: "",
            icon: "",
            sort: false,
            sortBy: "",
            filter: false
        },
        {
            key: "nameProcess",
            title: "Process",
            type: "text",
            format: "",
            class: "",
            icon: "",
            sort: true,
            sortBy: "",
            filter: true
        },
        {
            key: "IdBag",
            title: "Mã Bag",
            type: "text",
            format: "",
            class: "",
            icon: "",
            sort: true,
            sortBy: "",
            filter: true
        },
        {
            key: "CodeTicket",
            title: "Số ticket",
            type: "link",
            format: "",
            class: "",
            icon: "",
            sort: true,
            sortBy: "",
            filter: true
        },
        {
            key: "Worker",
            title: "Worker",
            type: "text",
            format: "",
            class: "",
            icon: "",
            sort: true,
            sortBy: "",
            filter: true
        },
        {
            key: "ValueLV",
            title: "Loại vàng",
            type: "text",
            format: "",
            class: "",
            icon: "",
            sort: true,
            sortBy: "",
            filter: true
        },
        {
            key: "created_date",
            title: "Ngày thực hiện",
            type: "date",
            format: "DD/MM/YYYY",
            class: "",
            icon: "",
            sort: true,
            sortBy: "",
            filter: true
        }, {
            key: "statusName",
            title: "Trạng thái",
            type: "text",
            format: "",
            class: "",
            icon: "",
            sort: true,
            sortBy: "",
            filter: true
        },
    ],
    objSearch: {
        input: ''
    }
};
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_INPUT_SEARCH:
            return {
                ...state,
                ...action.payload
            };
        case GET_LIST_BAG_TICKET_PROC:
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

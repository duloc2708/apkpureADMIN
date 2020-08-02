import {
    ADD_HTML,
    UPDATE_HTML,
    CHANGE_VALUE_HTML,
    ASSIGN_CONTROL,
    UPDATE_LIST_ROWDATA
} from '../types'
const INITIAL_STATE = {
    strHTML: ``,
    listRow: [],
    valueTemp: '12',
    listControl: [
        {
            key: 'lable', text: 'Text Input', icon: 'fa fa-text-width',
            col: `<div class="col-md-3 col-1-0 col-list" id="0">
            <div class="input-text form-group profile-pic">
                <div class="left">
                    <label id="${`label-1-0`}" class="mytxt" >label ${`1`} 
                    </label>
                    <a><i id="icon-edit-label" class="fa fa-edit icon-edit-label"></i></a>
                    <a><i id="icon-remove-label" style="display:none" class="fa fa-remove icon-remove-label"></i></a>
                </div>
                <div class="right">
                    <input type="text" class="name form-control" value="" id="Code" name="Code">
                </div>
                <div class="edit">
                    <a><i class="fa fa-copy icon-copy"></i></a>
                    <a><i class="fa fa-remove icon-remove"></i></a>
                </div>
            </div>
            </div>`
        },
        {
            key: 'button', text: 'Button', icon: 'fa fa-plus-square-o',
            col: `<div class="col-md-3 col-1-0" id="0">
             <div class="input-button form-group profile-pic">
             <div class="left">
                 <button id="${`button-1-0`}" class="mytxt" >Button</button>
             </div>
             <div class="edit-button">
                 <a><i id="icon-edit-button" class="fa fa-edit icon-edit-button"></i></a>
                 <a><i id="icon-remove-button" style="display:none" class="fa fa-remove icon-remove-button"></i></a>
                 <a><i class="fa fa-copy icon-copy"></i></a>
                 <a><i class="fa fa-remove icon-remove"></i></a>
             </div>
         </div>` },
        {
            key: 'datetime', text: 'Datetime', icon: 'fa fa-calendar',
            col: `<div class="col-md-3 col-1-0" id="0">
            <div class="input-datetime form-group profile-pic">
                <div class="left">
                    <label id="${`label-1-0`}" class="mytxt">Date time ${`1`} 
                    </label>
                    <a><i id="icon-edit-label" class="fa fa-edit icon-edit-label"></i></a>
                    <a><i id="icon-remove-label" style="display:none" class="fa fa-remove icon-remove-label"></i></a>
                </div>
                <div class="right">
                   <input type="date" class="name form-control" name="bday ">
                </div>
                <div class="edit">
                    <a><i class="fa fa-copy icon-copy"></i></a>
                    <a><i class="fa fa-remove icon-remove"></i></a>
                </div>
            </div>
            </div>`},
        {
            key: 'combobox', text: 'Combobox', icon: 'fa fa-arrow-down',
            col: `<div class="col-md-3 col-1-0" id="0">
            <div class="input-combobox form-group profile-pic">
            <div class="left">
                <label id="${`label-1-0`}" class="mytxt">Combox ${`1`} 
                </label>
                <a><i id="icon-edit-label" class="fa fa-edit icon-edit-label"></i></a>
                <a><i id="icon-remove-label" style="display:none" class="fa fa-remove icon-remove-label"></i></a>
            </div>
            <div class="right">
            <select class="name form-control" style="width: 120px;">
              <option>--Chọn</option>
            </select >
            </div>
            <div class="edit">
                <a><i class="fa fa-copy icon-copy"></i></a>
                <a><i class="fa fa-remove icon-remove"></i></a>
            </div>
        </div>
        </div>` },
        {
            key: 'checkbox', text: 'Checkbox', icon: 'fa fa-check-square-o',
            col: `<div class="col-md-3 col-1-0" id="0">
            <div class="input-checkbox form-group profile-pic" style="width: 100%;">
                <div class="left">
                    <li style="list-style:none">
                    <input id="checkid2" type="checkbox" value="test" />
                    <label id="${`label-1-0`}" class="mytxt">checkbox ${`1`} 
                    </label>
                    <a><i id="icon-edit-label" class="fa fa-edit icon-edit-label"></i></a>
                    <a><i id="icon-remove-label" style="display:none" class="fa fa-remove icon-remove-label"></i></a>
                </li>
                </div>

            </div>
            </div>` },
        {
            key: 'grid', text: 'Grid', icon: 'fa fa-th',
            col: `
            <div class="col-md-12" id="0"><table class="table table-hove">
                <thead>
                    <tr class="dnd-moved">
                        <th id="0" class="th-0" style="text-align:left">
                            <lable id="label-col-0" class="txtcol"  >Col-1</lable>
                            <a><i id="icon-edit-col" class="fa fa-edit icon-edit-col"></i></a>
                            <a><i id="icon-remove-col" style="display:none" class="fa fa-remove icon-remove-col"></i></a>
                            <a><i class="fa fa-plus add-col-right" aria-hidden="true"></i></a>
                        </th>
                    </th>
                    </tr>
                </thead>
            <tbody>
                <tr class="dnd-moved">
                <td>...</td>
                </tr>
            </tbody>
        </table> </div>`}
    ],
    listDrag: [],
    keyControl: '',
    contentControl: '',
    listTable: []
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_LIST_ROWDATA:
            return {
                ...state,
                listRow: action.payload.listRow
            }
        case ASSIGN_CONTROL:
            return {
                ...state,
                keyControl: action.payload.keyControl,
                contentControl: action.payload.contentControl
            }
        case CHANGE_VALUE_HTML:
            return {
                ...state,
                valueTemp: action.payload.valueTemp
            }
        case ADD_HTML:
            return {
                ...state,
                strHTML: action.payload.strHTML,
                listRow: action.payload.listRow
            }
        case UPDATE_HTML:
            return {
                ...state,
                strHTML: action.payload.strHTML,
                listRow: action.payload.listRow
            }
        default:
            return state
    }
    return state
}
export default Reducer
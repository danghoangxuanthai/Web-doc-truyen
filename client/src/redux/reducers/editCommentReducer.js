import { GLOBALTYPES } from "../actions/globalTypes";
const initialState = false
const editCommentReducer = (state = initialState, action) => {
    switch(action.type){
        case GLOBALTYPES.EDIT_COMMENT_POPUP:
            return action.payload
        default:
            return state
    }
}
export default editCommentReducer
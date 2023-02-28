import { GLOBALTYPES } from "../actions/globalTypes";
const initialState = false
const commentFilterReducer = (state = initialState, action) => {
    switch(action.type){
        case GLOBALTYPES.SHOW_COMMENT:
            return action.payload
        default:
            return state
    }
}
export default commentFilterReducer
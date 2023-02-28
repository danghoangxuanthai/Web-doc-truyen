import { GLOBALTYPES } from "../actions/globalTypes";
const initialState = false
const searchReducer = (state = initialState, action) => {
    switch(action.type){
        case GLOBALTYPES.SHOW_SEARCH_FILTER:
            return action.payload
        default:
            return state
    }
}
export default searchReducer
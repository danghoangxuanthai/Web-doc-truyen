import {SUGGEST_TYPES} from "../actions/suggestionAction";
const initialState = {
    loading: false,
    users: []
}
const suggestReducer = (state =initialState, action) => {
    switch(action.type){
        case SUGGEST_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SUGGEST_TYPES.GET_USERS_SUGGEST:
            return {
                users: action.payload.users
            }
        default:
            return state
    }
}
export default suggestReducer
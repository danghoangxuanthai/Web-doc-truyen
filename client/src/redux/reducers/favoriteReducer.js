import { FAVORITE_TYPES } from "../actions/favoriteAction";
import {EditData} from "../actions/globalTypes";
const initialState = {
    loading: false, 
    ids: [],
    users: [],
    posts: []
}
const favoriteReducer = (state = initialState, action) => {
    switch (action.type){
        case FAVORITE_TYPES.LOADING:
            return{
                ...state,
                loading: action.payload
            }
        case FAVORITE_TYPES.GET_USER:
            return{
                ...state,
                users: [...state.users, action.payload.user]
            }
        case FAVORITE_TYPES.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]
            }
        case FAVORITE_TYPES.GET_FAV:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        default: 
            return state
    }
}
export default favoriteReducer;

import { POST_TYPES } from "../actions/postAction";
import {EditData, DeleteData} from '../actions/globalTypes'
const initialState = {
    posts: [],
    result: 0,
    type: 'forum'
}
const forumReducer = (state = initialState, action) => {
    switch(action.type){
        case POST_TYPES.CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case POST_TYPES.GET_POST:
            return {
                ...state,
                posts: action.payload.posts,
                result: action.payload.result
            }
        default:
            return state
    }
}
export default forumReducer
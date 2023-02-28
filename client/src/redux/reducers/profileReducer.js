import { PROFILE_TYPES } from "../actions/profileAction";
const initialState = {
    loading: false, 
    ids: [],
    users: [],
    userPost: []
}
const profileReducer = (state = initialState, action) => {
    switch (action.type){
        case PROFILE_TYPES.LOADING:
            return{
                ...state,
                loading: action.payload
            }
        case PROFILE_TYPES.GET_FAV:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case PROFILE_TYPES.GET_USER:
            return{
                ...state,
                users: [...state.users, action.payload.user]
            }
        case PROFILE_TYPES.FOLLOW:
            return {
                ...state,
                users: state.users.map(user => 
                        (user._id === action.payload._id ? action.payload : user)
                    )
            }
        case PROFILE_TYPES.UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => 
                    (user._id === action.payload._id ? action.payload : user)
                )
            }
        case PROFILE_TYPES.GET_ID:
            return {
                ...state,
                ids: [...state.ids, action.payload]

            }
        case PROFILE_TYPES.GET_POSTS:
            return {
                ...state,
                userPost: [...state.userPost, action.payload]

            }
        default: 
            return state
    }
}
export default profileReducer;

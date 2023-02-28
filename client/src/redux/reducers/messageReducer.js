import {MESS_TYPES} from "../actions/messageAction";
const initialState = {
    users: [],
    resultUsers: 0,
    data: [],
    resultData: 0,
    firstLoad: false
}
const messageReducer = (state = initialState, action) => {
    switch(action.type){
        case MESS_TYPES.ADD_USER:
            return{
                ...state,
                users: [action.payload, ...state.users]
            }
        case MESS_TYPES.ADD_MESSAGE:
            return {
                ...state,
                data: [...state.data, action.payload],
                users: state.users.map(_ =>
                        _._id === action.payload.recipient || _._id === action.payload.sender
                        ? {..._, text: action.payload.text, media: action.payload.media} : _)
            }
        case MESS_TYPES.GET_CONVERSATION:
            return{
                ...state,
                users: action.payload.newArr
            }
        case MESS_TYPES.GET_MESSAGES:
            return {
                ...state,
                data: action.payload.messages.reverse(),
                firstLoad: false
            }

        default:
            return state
    }
}
export default messageReducer;
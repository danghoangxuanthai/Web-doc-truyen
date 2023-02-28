import {GLOBALTYPES} from "./globalTypes";
import {getDataApi, postDataApi} from "../../utils/fetchData";

export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATION: 'GET_CONVERSATION',
    GET_MESSAGES: 'GET_MESSAGES'
}
export const addUser = ({user, message}) => async (dispatch) => {
    if(message.users.every(_ => _._id !== user._id)){
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text:'', media: []}})
    }
}
export const addMessage = ({user, message, socket, auth}) => async (dispatch) => {
    console.log({message})
    dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: message})
    socket.emit('addMessage', message)
    try{
       const res =  await postDataApi('message', message, auth.token)
        console.log({res})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const getConversation = ({auth}) => async (dispatch) => {
    try{
        const res = await getDataApi('conversation', auth.token)
        let newArr = []
        res.data.conversations.forEach(_ => {
            _.recipients.forEach(__ =>  {
                if(__._id !== auth.user._id){
                    newArr.push({...__, text: _.text, media: _.media})
                }
            })
        })
        dispatch({type: MESS_TYPES.GET_CONVERSATION, payload: {newArr}})
    }
    catch(err){

    }
}
export const getMessages = ({auth, id}) => async (dispatch) => {
    try{
        const res = await getDataApi(`message/${id}`, auth.token)
        dispatch({type: MESS_TYPES.GET_MESSAGES, payload: res.data})
    }
    catch(err){

    }
}
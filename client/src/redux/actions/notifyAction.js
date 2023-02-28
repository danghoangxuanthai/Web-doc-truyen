import {deleteDataApi, postDataApi, getDataApi, patchDataApi} from "../../utils/fetchData";
import {GLOBALTYPES} from "./globalTypes";
export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY'
}
export const createNotify = ({msg, auth, socket}) => async (dispatch) => {
    try{
        const res = await postDataApi('notify', msg, auth.token)
        socket.emit('createNotify', {
            ...res.data.notify,
            user: {
                username: auth.user.username,
                avatar: auth.user.avatar
            }
        })
    }
    catch(err){

    }
}
export const removeNotify = ({msg, auth, socket}) => async (dispatch) => {
    // dispatch({type: NOTIFY_TYPES.GET_NOTIFY, payload: })
    try{
        const res = await deleteDataApi(`notify/${msg.id}?url=${msg.url}`, auth.token)
        // console.log(res)
        socket.emit('removeNotify', msg)
    }
    catch(err){

    }
}
export const getNotify = (token) => async (dispatch) => {
    try{
        const res = await getDataApi('notifies', token)
        console.log('res', res)
        dispatch({type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notify})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const isReadNotify = ({msg, auth}) => async (dispatch) => {
    console.log({msg, auth})
    dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true}})
    try{
        await patchDataApi(`isreadnotify/${msg._id}`, null, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

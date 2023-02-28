import {DeleteData, EditData, GLOBALTYPES} from "./globalTypes"
import {deleteDataApi, patchDataApi, postDataApi} from '../../utils/fetchData'
import {getDataApi} from '../../utils/fetchData'
import { imageUpload } from "../../utils/imageUpload"
import {PROFILE_TYPES} from "./profileAction";
import {createNotify, removeNotify} from './notifyAction'
export const POST_TYPES = {
    CREATE_POST: 'CREATE_POST',
    GET_POST: 'GET_POST',
    UPDATE_POST: 'UPDATE_POST',
    DELETE_POST: 'DELETE_POST',
    UPDATE_COMMENT: 'UPDATE_COMMENT',
    GET_DETAILED_POST: 'GET_DETAILED_POST'
}
export const createPost = ({content, content2, content3, images, auth, socket}) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(images.length > 0) media = await imageUpload(images)
        const res = await postDataApi('forum_post', { content, content2, content3, images: media}, auth.token)
        dispatch({
            type: POST_TYPES.CREATE_POST,
            payload: {...res.data.newPost, user: auth.user}
        })
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response?.data.msg}
        })
    }
    // console.log({content, images, auth})
}
export const getPostForum = (token) => async (dispatch) => {
    try{
        const res = await getDataApi('forum_post', token)
        console.log('forum', res)
        dispatch({type: POST_TYPES.GET_POST, payload: {...res.data}})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
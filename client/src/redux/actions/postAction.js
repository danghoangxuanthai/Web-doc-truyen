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
export const createPost = ({content, images, auth, socket}) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(images.length > 0) media = await imageUpload(images)
        const res = await postDataApi('posts', { content, images: media}, auth.token)
        console.log('check', res)
        dispatch({ 
            type: POST_TYPES.CREATE_POST, 
            payload: {...res.data.newPost, user: auth.user}
        })
        socket.emit('createPost', res.data.newPost)
      // notify
        const msg = {
            id: res.data.newPost._id,
            text: 'Created new post',
            recipients: res.data.newPost.user.followers,
            url: `/user_post/${res.data.newPost._id}`,
            content,
            image: media[0].url
        }
        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response?.data.msg}
        })
    }
    // console.log({content, images, auth})
}
export const savePost = ({post, auth}) => async (dispatch) => {
    const newSave = {...auth.user, saved: [...auth.user.saved, {post}]}
    console.log({newSave})
    dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newSave}})
    try{
        await patchDataApi(`save/${post._id}`, null, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const favoriteAdd = ({profile, anime, id,  auth}) => async (dispatch) => {
    const newFav = {...auth.user, favoriteAnime: [...auth.user.favoriteAnime, anime]}
    // const newFav2 = {...auth.user[0], favoriteAnime: [...auth.user.favoriteAnime, anime]}
    dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newFav}})
    dispatch({type: PROFILE_TYPES.GET_FAV, payload: {...auth.user, favoriteAnime: [...auth.user.favoriteAnime, anime]}})

    try{
        // const getFav = {...anime}
        // const val = await postDataApi(`fav/${id}`, getFav, auth.token)
        const val2 = await patchDataApi(`updatefav/${id}`, {...anime}, auth.token)

        console.log({val2})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
    // console.log({anime, id, auth})
}
export const removeFavoriteAdd = ({profile, anime, id,  auth}) => async (dispatch) => {
    const newFav = {...auth.user, favoriteAnime: auth.user.favoriteAnime.filter(_ => _?.id !== Number(id))}
    dispatch({type: PROFILE_TYPES.GET_FAV, payload: {...auth.user, favoriteAnime: auth.user.favoriteAnime.filter(_ => _?.id !== Number(id))}})
    dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newFav}})

    try{
        // const getFav = {...anime}
        const val2 = await patchDataApi(`remove/${id}`, {...anime}, auth.token)
        console.log({val2})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
    // console.log({anime, id, auth})
}
export const removeFavoriteAdd2 = ({profile, anime, id,  auth}) => async (dispatch) => {
    const newFav = {...auth.user, favoriteAnime: auth.user.favoriteAnime.filter(_ => _?.mal_id !== Number(id))}
    dispatch({type: PROFILE_TYPES.GET_FAV, payload: {...auth.user, favoriteAnime: auth.user.favoriteAnime.filter(_ => _?.id !== Number(id))}})
    dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newFav}})

    try{
        // const getFav = {...anime}
        const val2 = await patchDataApi(`remove/${id}`, {...anime}, auth.token)
        console.log({val2})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
    // console.log({anime, id, auth})
}
export const removeSavedPost = ({post, auth}) => async (dispatch) => {
    const newSave = {...auth.user, saved: auth.user.saved.filter(_ => _[0]?._id !== post?._id)}
    dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newSave}})
    try{
        await patchDataApi(`unsave/${post?._id}`, null, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const getPost = (token) => async (dispatch) => {
    try{
        // dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await getDataApi('posts', token)
        dispatch({type: POST_TYPES.GET_POST, payload: {...res.data}})
        // dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const updatePost = ({item, content, auth}) => async (dispatch) => {
    const newPost = {...item, content}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        await patchDataApi(`post/${item._id}`, {content}, auth.token)
        await patchDataApi(`user_post/${item._id}`, {content}, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const getOnePost  = ({details, id, auth}) => async (dispatch) => {
    if(details.every(_ => _._id !== id)){
        try{
            const res = await getDataApi(`user_post/${id}`, auth.token)
            dispatch({type: POST_TYPES.GET_DETAILED_POST, payload: res.data.post})
        }
        catch(err){
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        }
    }
}
export const deletePost = ({item, auth, socket}) => async (dispatch) => {
    dispatch({type: POST_TYPES.DELETE_POST, payload: item})
    try{
        const res = await deleteDataApi(`post/${item._id}`, auth.token)
        console.log(res)
        // notify when deleted
        const msg = {
            id: item._id,
            text: 'Deleted post',
            recipients: res.data.newPost.user.followers,
            url: `/user_post/${item._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))
        socket.emit('removePost', res.data.newPost)
    }
    catch(err){
    //     // dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'uh'}})
    }
}
export const likePost = ({item, auth, socket}) => async (dispatch) => {
    const newPost = {...item, likes: [...item.likes, auth.user]}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    socket.emit('likePost', newPost)
    try{
        await patchDataApi(`post/${item._id}/like`, null, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const unlikePost = ({item, auth, socket}) => async (dispatch) => {
    const newPost = {...item, likes: item.likes.filter(like => like._id !== auth.user._id)}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    socket.emit('unlikePost', newPost)
    try{
        await patchDataApi(`post/${item._id}/unlike`, null, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
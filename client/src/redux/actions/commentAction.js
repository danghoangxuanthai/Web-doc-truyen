// import { user_post } from "../../../../routes/commentRoute";
import {DeleteData, DeleteData2, EditData, GLOBALTYPES} from "./globalTypes";
import { POST_TYPES } from "./postAction";
import {deleteDataApi, patchDataApi, postDataApi} from '../../utils/fetchData'
export const createComment = ({item, newComment, auth, socket}) => async (dispatch) => {
    const newPost = {...item, comments: [...item.comments, newComment]}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        const data = {...newComment, postId: item._id}
        const res = await postDataApi('comment', data, auth.token)
        const newData = {...res.data.newComment, user: auth.user}
        const newPost = {...item, comments: [...item.comments, newData]}
        dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        socket.emit('createComment', newPost)
        dispatch({type: POST_TYPES.GET_DETAILED_POST, payload: newPost})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const updateComment = ({comment, item, content, auth}) => async (dispatch) => {
    const newComment = EditData(item.comments, comment._id, {...comment, content})
    const newPost = {...item, comments: newComment}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        await patchDataApi(`comment/${comment._id}`, {content}, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
    console.log({comment, item, content, auth})
}

export const updateComment2 = ({value, item, content, auth}) => async (dispatch) => {
    const newComment = EditData(item.comments, value._id, {...value, content})
    const newPost = {...item, comments: newComment}
    console.log({newPost})
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    dispatch({type: POST_TYPES.GET_DETAILED_POST, payload: newPost})
    try{
        await patchDataApi(`comment/${value._id}`, {content}, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const likeComment = ({comment, item, auth, socket}) => async (dispatch) => {
    const newComment = {...comment, likes: [...comment.likes, auth.user._id]}
    const newComments = EditData(item.comments, comment._id, newComment)
    const newPost = {...item, comments: newComments}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        await patchDataApi(`comment/${comment._id}/like`, null, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const unlikeComment = ({comment, item, auth, socket}) => async (dispatch) => {
    const newComment = {...comment, likes: DeleteData2(comment.likes, auth.user._id)}
    console.log('ss', comment.likes)
    const newComments = EditData(item.comments, comment._id, newComment)
    const newPost = {...item, comments: newComments}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    try{
        await patchDataApi(`comment/${comment._id}/unlike`, null, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const deleteComment = ({item, comment, auth, socket}) => async (dispatch) => {
    const newComment = {...item, comment: DeleteData(item.comments, comment._id)}
    const newPost = {...item, comments: newComment.comment}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    socket.emit('deleteComment', newPost)
    dispatch({type: POST_TYPES.GET_DETAILED_POST, payload: newPost})
    try{
        const val = await deleteDataApi(`comment/${comment._id}`, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }

}
export const deleteComment2 = ({item, value, auth, socket}) => async (dispatch) => {
    const newComment = {...item, value: DeleteData(item.comments, value._id)}
    const newPost = {...item, comments: newComment.value}
    dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
    socket.emit('deleteComment', newPost)
    dispatch({type: POST_TYPES.GET_DETAILED_POST, payload: newPost})
    try{
        const val = await deleteDataApi(`comment/${value._id}`, auth.token)
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
    // console.log({item, comment, auth})
}
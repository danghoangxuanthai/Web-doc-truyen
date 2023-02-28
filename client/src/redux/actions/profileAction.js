import { GLOBALTYPES } from "./globalTypes";
import {imageUpload} from '../../utils/imageUpload'
import {getDataApi, patchDataApi} from '../../utils/fetchData'
import { useEffect } from "react";
import {createNotify} from "./notifyAction";
export const PROFILE_TYPES = {
    GET_USER: 'GET_USER',
    LOADING: 'LOADING',
    FOLLOW: 'FOLLOW',
    UNFOLLOW: 'UNFOLLOW',
    GET_ID: 'GET_ID',
    GET_POSTS: 'GET_POSTS',
    GET_FAV: 'GET_FAV'
}
export const getProfileUser = ({anime, users, id, auth}) => async (dispatch) => {

        dispatch({type: PROFILE_TYPES.GET_ID, payload: id})
        const newFav = {...auth.user, favoriteAnime: [...auth.user.favoriteAnime, anime]}
        // const newFav2 = {...auth.user[0], favoriteAnime: [...auth.user.favoriteAnime, anime]}
        dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newFav}})
        try{
            dispatch({type: PROFILE_TYPES.LOADING, payload: true})
            const res = await getDataApi(`/user/${id}`, auth.token)
            const res1 = await getDataApi(`/profile/${id}`, auth.token)
            dispatch({type: PROFILE_TYPES.GET_USER, payload: res.data})
            dispatch({type: PROFILE_TYPES.GET_POSTS, payload: {...res1.data, _id: id}})
            dispatch({type: PROFILE_TYPES.LOADING, payload: false})
        }
        catch(err){
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        }
}

export const updateUserProfile = ({userData, banner, auth}) => async (dispatch) => {
    if(!userData.fullname){
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'Please fill in your fullname'}})
    }
    if(userData.fullname.length > 25){
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'Fullname length can be up to 25 characters'}})
    }
    if(userData.story.length > 200){
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'Your story is too long'}})
    }

    try{
        let media1, media2;
        // dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        if(banner) media1 = await imageUpload([banner])
//        if(avatar) media2 = await imageUpload([avatar])
        const res1 = await patchDataApi('user', {
            ...userData,
            banner: banner ? media1[0].url : auth.user.banner
        }, auth.token)

//        const res2 = await patchDataApi('user', {
//            ...userData,
//            avatar: avatar ? media2[0].url : auth.user.avatar
//        }, auth.token)

        dispatch({type: GLOBALTYPES.AUTH, payload: {
            ...auth, 
            user: {
                ...auth.user,
                ...userData,
//                avatar: avatar ? media2[0].url : auth.user.avatar,
                banner: banner ? media1[0].url : auth.user.banner
            }
        }})

        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res1.data.msg}})
//        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res2.data.msg}})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const updateUserAvatar = ({userData, avatar, auth}) => async (dispatch) => {
    if(!userData.fullname){
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'Please fill in your fullname'}})
    }
    if(userData.fullname.length > 25){
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'Fullname length can be up to 25 characters'}})
    }
    if(userData.story.length > 200){
        return dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'Your story is too long'}})
    }

    try{
        let media1, media2;
        // dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
//        if(banner) media1 = await imageUpload([banner])
        if(avatar) media2 = await imageUpload([avatar])
//        const res1 = await patchDataApi('user', {
//            ...userData,
//            banner: banner ? media1[0].url : auth.user.banner
//        }, auth.token)

        const res2 = await patchDataApi('user', {
            ...userData,
            avatar: avatar ? media2[0].url : auth.user.avatar
        }, auth.token)

        dispatch({type: GLOBALTYPES.AUTH, payload: {
            ...auth,
            user: {
                ...auth.user,
                ...userData,
                avatar: avatar ? media2[0].url : auth.user.avatar,
//                banner: banner ? media1[0].url : auth.user.banner
            }
        }})

//        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res1.data.msg}})
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res2.data.msg}})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const follow = ({users, user, auth, socket}) => async (dispatch) => {
    let newUser = {...user, followers: [...user.followers, auth.user]}
    dispatch({type: PROFILE_TYPES.FOLLOW, payload: newUser})
    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            ...auth, 
            user: {...auth.user, following: [...auth.user.following, newUser]}
        }
    })

    try{
        const res = await patchDataApi(`/user/${user._id}/follow`, null, auth.token)
        socket.emit('follow', res.data.newUser)
        const msg = {
            id: res.data.newUser._id,
            text: 'Has started follow you',
            // recipients: res.data.newPost.user.followers,
            // url: `/user_post/${res.data.newPost._id}`,
            // content,
            // image: media[0].url
        }
        dispatch(createNotify({msg, auth, socket}))
    }
    catch(err){ 
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const unfollow = ({users, user, auth, socket}) => async (dispatch) => {
    let newUser = {...user, followers: user.followers.filter(item => item._id !== auth.user._id)}
    dispatch({type: PROFILE_TYPES.UNFOLLOW, payload: newUser})
    dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
            ...auth, 
            user: {...auth.user, following: auth.user.following.filter(item => item._id !== user._id)}
        }
    })
    try{
        const res = await patchDataApi(`/user/${user._id}/unfollow`, null, auth.token)
        socket.emit('unfollow', res.data.newUser)
        const msg = {
            id: res.data.newUser._id,
            text: 'Has started follow you',
            // recipients: res.data.newPost.user.followers,
            // url: `/user_post/${res.data.newPost._id}`,
            // content,
            // image: media[0].url
        }
        dispatch(createNotify({msg, auth, socket}))
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}
export const favorite = ({users, user, auth}) => async (dispatch) => {
    console.log({users, user, auth})
}
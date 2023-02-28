import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NOTIFY_TYPES} from "./redux/actions/notifyAction";
import {POST_TYPES} from "./redux/actions/postAction";
import {MESS_TYPES} from "./redux/actions/messageAction";
import {GLOBALTYPES} from "./redux/actions/globalTypes";

const SocketClient = () => {
    const {auth, socket} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        socket.emit('joinUser', auth.user._id)
    }, [socket, auth.user._id])

    useEffect(() => {
        socket.on('createNotifyToClient', msg => {
            dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg})
        })
        return () => socket.off('createNotifyToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('createPostToClient', msg => {
            dispatch({type: POST_TYPES.CREATE_POST, payload: msg})
        })
        return () => socket.off('createPostToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('likeToClient', newPost => {
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('likeToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('unLikeToClient', newPost =>{
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('unLikeToClient')
    },[socket, dispatch])
    useEffect(() => {
        socket.on('removeNotifyToClient', msg => {
            console.log(msg)
            dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg})
        })
        return () => socket.off('removeNotifyToClient')
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('createCommentToClient', newPost => {
            console.log(newPost)
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('removeNotifyToClient')
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('deleteCommentToClient', newPost => {
            console.log(newPost)
            dispatch({type: POST_TYPES.UPDATE_POST, payload: newPost})
        })
        return () => socket.off('deleteCommentToClient')
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('removePostToClient', msg => {
            console.log(msg)
            dispatch({type: POST_TYPES.DELETE_POST, payload: msg})
        })
        return () => socket.off('removePostToClient')
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('addMessageToClient', message => {
            dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: message})
        })
        return () => socket.off('removePostToClient')
    }, [socket, dispatch])
    useEffect(() => {
        socket.on('followToClient', newUser =>{
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })
        return () => socket.off('followToClient')
    },[socket, dispatch, auth])
    useEffect(() => {
        socket.on('unFollowToClient', newUser =>{
            dispatch({type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})
        })

        return () => socket.off('unFollowToClient')
    },[socket, dispatch, auth])
    return (
        <div className={'d-none'}>
            SocketClient
        </div>
    );
};

export default SocketClient;
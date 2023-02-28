import {postDataApi} from '../../utils/fetchData'
import { GLOBALTYPES } from './globalTypes'
import valid from '../../utils/valid'
export const login = (data) => async (dispatch) => {
    try{
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await postDataApi('login', data)
        const token = res.data.access_token;
        dispatch({type: 'AUTH', payload: {
            token: res.data.access_token,
            user: res.data.user
        }})
        localStorage.setItem('hutechListLS', token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const register = (data) => async (dispatch) => {
    try{
        const check = valid(data)
        if(check.errLength > 0){
            return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg})
        }
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        const res = await postDataApi('register', data)
        const token = res.data.access_token
        dispatch({type: GLOBALTYPES.AUTH, payload: {
            token: res.data.access_token,
            user: res.data.user
        }})
        localStorage.setItem('hutechListLS', token)
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: res.data.msg}})
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const refreshToken = () => async (dispatch) => {
    const hutechListLS = localStorage.getItem('hutechListLS')
    if(hutechListLS){
        dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
        try{
            const res = await postDataApi('refresh_token')
            dispatch({type: GLOBALTYPES.AUTH, payload: {
                token: res.data.access_token,
                user: res.data.user
            }})
            dispatch({type: GLOBALTYPES.ALERT, payload: {loading: false}})
        }
        catch(err){
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.message}})
        }
    }
}
export const logout = () => async (dispatch) => {
    try{
        localStorage.removeItem('hutechListLS')
        await postDataApi('logout')
        window.location.href = '/'
    }
    catch(err){
        dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.message}})
    }
}
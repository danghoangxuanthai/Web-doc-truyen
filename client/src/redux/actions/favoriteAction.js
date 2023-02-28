import { GLOBALTYPES } from "./globalTypes";
import {getDataApi, patchDataApi} from '../../utils/fetchData'
import { useEffect } from "react";
export const FAVORITE_TYPES = {
    GET_FAV: 'GET_FAV',
    GET_ID: 'GET_ID',
    GET_USER:'GET_USER',
    LOADING:'LOADING',
    ADD_FAV: 'ADD_FAV',
    UPDATE_FAV: 'UPDATE_FAV'
}
export const getFav = ({users, id, auth}) => async (dispatch) => {
        dispatch({type: FAVORITE_TYPES.GET_ID, payload: id})
        try{
            dispatch({type: FAVORITE_TYPES.LOADING, payload: true})
            const res = await getDataApi(`/user/${id}`, auth.token)
            const res1 = await getDataApi(`/user_fav/${id}`, auth.token)
            console.log(res1)
            dispatch({type: FAVORITE_TYPES.GET_USER, payload: res.data})
            dispatch({type: FAVORITE_TYPES.GET_FAV, payload: {...res1.data, _id: id}})
            dispatch({type: FAVORITE_TYPES.LOADING, payload: false})
        }
        catch(err){
            dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
        }
}
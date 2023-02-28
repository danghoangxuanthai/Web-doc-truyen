import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {deleteDataApi, deleteDataApi2, postDataApi} from '../utils/fetchData'
import {FAVORITE_TYPES} from '../redux/actions/favoriteAction'
import {useParams} from "react-router-dom";
import {favoriteAdd} from "../redux/actions/postAction";
function Favorite({id, anime, addBtn, setAddBtn, userReal, userFrom, animeId, animeTitle, animeImage}) {
    console.log('pkl', id)
    const [fav, setFav]= useState(false)
    const {auth, favorite} = useSelector(state => state)
    const dispatch = useDispatch()


    const handleFav = async () => {
       // const variable = {
       //     userFrom: userFrom,
       //     animeId: animeId,
       //     animeTitle: animeTitle,
       //     animeImage: animeImage
       // }
        setFav(true)
       // try{
       //     const newFav = await postDataApi(`favorite/${animeId}`, {variable}, auth.token)
       //     if(newFav.data.msg === 'Created fav'){
       //         setFav(true)
       //     }
       // }
       // catch(err){
       //
       // }
       //  setFav(true)
        dispatch(favoriteAdd({anime, id, auth}))
    }

    const handleUnfav = async () => {
        // const variable = {
        //     userFrom: userFrom,
        //     animeId: animeId,
        //     animeTitle: animeTitle,
        //     animeImage: animeImage
        // }
        // setFav(false)
        // try{
        //     const removeFav = await postDataApi(`removeFavorite/${animeId}`, {variable},  auth.token)
        //         if(removeFav.data.msg === 'Removed fav'){
        //             setFav(false)
        //         }
        // }
        // catch(err){
        //
        // }
    }

  return (
      <>
          {
             fav ? ( <>
                          <div onClick={handleUnfav}
                               className="rb bg-[#ec294b] flex items-center justify-center rounded-[4px] cursor-pointer py-[8px] px-[10px]">
                    <span className="material-icons text-[21px] text-[#fff] flex items-center justify-center">
                        remove_circle
                    </span>
                          </div>
                      </>
                  )
                  :
                  <div onClick={handleFav}
                       className="rb bg-[#74b9ff] flex items-center justify-center rounded-[4px] cursor-pointer py-[8px] px-[10px]">
                        <span className="material-icons text-[21px] text-[#fff] flex items-center justify-center">
                          add_circle
                        </span>
                  </div>
          }
      </>
  )
}

export default Favorite
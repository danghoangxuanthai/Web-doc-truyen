import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import {getProfileUser} from '../../redux/actions/profileAction'
import {getFav} from '../../redux/actions/favoriteAction'
import Loading from '../../utils/Loading'
import {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_GEN_3} from "../../graphql/Query";
function Profile() {
  const {profile, auth, favorite} = useSelector(state => state)
  const dispatch = useDispatch()
  const {id} = useParams()
    const [saveTab, setSaveTab] = useState(false)
  const {data} = useQuery(GET_GEN_3)

  const data2 = data?.trendingNow?.media.find(_ => _.id === Number(id))
  const anime = data2;
    useEffect(() => {
      if(profile?.ids?.every(item => item !== id)){
        dispatch(getProfileUser({anime, users: profile.users, id, auth}))
      }
  }, [id, profile.users, auth])

  return (
    <div className='bg-[#0b121a] text-[#fff] min-h-[100vh]'>
      {
        profile.loading ? <Loading /> :   <Info setSaveTab={setSaveTab} saveTab={saveTab}/>
      }
        <Posts saveTab={saveTab} />
    </div>
  )
}

export default Profile
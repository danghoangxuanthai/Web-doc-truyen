import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Avatar from '../../pages/Avatar'
import {Link} from 'react-router-dom'
import {getProfileUser} from '../../redux/actions/profileAction'
import EditProfile from './EditProfile'
import FollowBtn from './FollowBtn'
import Followers from './Followers'
import Following from './Following'
import { getDataApi } from '../../utils/fetchData'
function    NewInfo() {
    const {id} = useParams()
    const {auth, profile, favorite} = useSelector(state => state)
    const dispatch = useDispatch()
    const [userData, setUserData] = useState([])
    const [edit, setEdit] = useState(false)
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)
    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        }
        else{
        //    dispatch(getProfileUser({users: profile.users, id, auth}))
           const newData = profile.users.filter(user => user._id === id)
           setUserData(newData)
        }
    }, [id, auth, dispatch, profile.users])

    // useEffect(() => {
    //     const val = getDataApi(`/user_fav/${id}`, auth.token)
    //         .then(() => console.log(val.data.posts))
    // }, [])
  return (
    <div className='pr-[2rem] bg-[#151f2e] rounded-[8px] p-[20px]'>

        {
            userData.map(user => (
                <div className='flex flex-col gap-[8px] text-[14px]'>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex flex-col gap-[1rem]'>

                            <div className='flex flex-col gap-[1rem]'>
                                <p>{user.story}</p>
                                {
                                    user.address ? <div className='flex items-center gap-[4px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                    <p className='text-[#b368e6]'>{user.address}</p>
                                </div> : ''
                                }

                            </div>
                        </div>
                    </div>
                    <div className=''>
                        {
                            user.email ?
                            <div className='flex items-center gap-[4px]'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                 <p className='text-[#b368e6] cursor-pointer'>{user.email}</p>
                            </div>  : ''
                        }

                   </div>
                   <div className=''>
                        {user.website ?
                            <div className='flex items-center gap-[4px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                            <p className='text-[#b368e6] cursor-pointer'>{user.website}</p>
                        </div> : ''
                        }
                   </div>
                    <div className='py-[10px] flex items-center gap-[1rem]'>
                       <p className='cursor-pointer' onClick={() => setShowFollowers(true)}>{user.followers?.length} followers</p>
                       <p className='cursor-pointer' onClick={() => setShowFollowing(true)}>{user.following?.length} following</p>
                    </div>
                        {
                            edit && <EditProfile setEdit={setEdit}/>
                        }
                        {
                            showFollowers && <Followers setShowFollowers={setShowFollowers} followers={user.followers}/>
                        }
                        {
                            showFollowing && <Following setShowFollowing={setShowFollowing} following={user.following}/>
                        }
                        <div>

                        </div>
                </div>
            ))
        }
        {/*{profile?.users[profile?.users.length-1][0] >0 &&*/}
            <div className='w-full'>
                {
                    (
                        <div className={'flex flex-wrap gap-[8px]'}>
                            {profile?.users[profile?.users?.length - 1]?.favoriteAnime?.map(_ => (
                                <Link to={`/anime2/${_?.mal_id}`}>
                                    <img className={'h-[180px] rounded-[4px] object-cover'}
                                         src={_?.coverImage?.extraLarge || _?.images?.jpg?.image_url} alt=""/>
                                </Link>
                            ))}
                        </div>
                    )
                }
            </div>
        {/*}*/}
    </div>
  )
}

export default NewInfo
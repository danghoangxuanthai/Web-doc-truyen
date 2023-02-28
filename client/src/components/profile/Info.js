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
function Info({saveTab, setSaveTab}) {
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

  return (
    <>

            <div className={'w-full relative'}>
                <div className={'bg-lol w-full z-2 z-2'}>
                    {
                        userData.map(user => (
                                <img src={user?.banner}  className={'h-[400px] w-full object-cover'} alt="" />
                        ))
                    }
                </div>
                <div className={'shadow'}></div>
        <div className='absolute left-[15%] top-[60%] z-99 w-[1000px] mx-auto py-[2rem]'>
            {
                userData.map(user => (
                    <div className='flex flex-col gap-[4px] text-[14px]'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='flex flex-col gap-[1rem]'>
                                <div className='flex items-center text-[20px] gap-[10px]'>
                                    <img src={user.avatar} className="rounded-[14px] w-[5rem]" alt='pic' />
                                    <div>
                                        <p className='text-[#fff] font-bold'>{user.username}</p>
                                    </div>
                                </div>
                            
                            </div>
                                
                            <div>
                                {
                                    user._id === auth.user._id ?      <button className="edit text-[13px] py-2 px-4" onClick={() => setEdit(true)}>Edit Profile</button>
                            :
                                    <FollowBtn user={user} />
                                }
                            </div>
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
        
                    </div>
                ))
            }
        </div>
            </div>
            <div className='w-full test flex items-center justify-center bg-[#111823]  gap-[1rem]'>
                {
                    auth.user.id === id ?  <button onClick={() => setSaveTab(false)} className={saveTab ? '' : 'actives'}>POST</button>
                        :  <button onClick={() => setSaveTab(false)} className={saveTab ? '' : 'actives'}>POST</button>
                }
                {auth.user._id === id &&  <button onClick={() => setSaveTab(true)}  className={saveTab ? 'actives' : ''}>SAVED POST</button>
                }
            </div>
    </>
  )
}

export default Info
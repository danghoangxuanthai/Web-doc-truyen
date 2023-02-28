import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {follow, unfollow} from '../../redux/actions/profileAction'
function FollowBtn({user}) {
  const [followed, setFollowed] = useState(false)
  // const [following, setFollowing] = useState(false)
  const {auth, profile, socket} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if(auth.user.following?.find(item => item._id === user._id)){
      setFollowed(true)
    }
    else{
      setFollowed(false)
    }
  }, [auth.user.following, user._id])

  const handleFollow = () => {
    setFollowed(true)
    dispatch(follow({users: profile.users, user, auth, socket}))
  }
  const handleUnfollow = () => {
    setFollowed(false)
    dispatch(unfollow({users: profile.users, user, auth, socket}))
  }
  return (
      <>
        {
          followed ? <button class="text-[14px] w-[100px] button border-0 outline-0 text-[#fff] bg-[#e74c3c]" onClick={handleUnfollow}>Unfollow</button>
          : <button class="text-[14px] w-[100px] button border-0 outline-0 text-[#fff] bg-[#02a9ff]" onClick={handleFollow}>Follow</button>
        }

      </>
  )
}

export default FollowBtn
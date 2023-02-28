import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PostThumb from './PostThumb'

function Posts({saveTab}) {
  const {id} = useParams()
  const {profile} = useSelector(state => state)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    profile?.userPost?.forEach(data => {
      if(data._id === id){
        setPosts(data.posts)
      }
    })
  }, [profile.userPost, id])
  return (
    <div>
      <PostThumb posts={posts} saveTab={saveTab}/>
    </div>
  )
}

export default Posts
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {getDataApi} from '.././utils/fetchData'
import {GLOBALTYPES} from '../redux/actions/globalTypes'
import EditButton from './EditButton'
import PostCard from './PostCard'
import InputComment from './InputComment'
import Comment from './Comment'
import {getPost} from "../redux/actions/postAction";
function PostDetails() {
    const dispatch = useDispatch()
    const {auth, homePost} = useSelector(state => state)
    const [readMore, setReadMore] = useState(false)
    useEffect(() => {
        if(auth.token){
            dispatch(getPost(auth.token))
        }
    }, [auth, dispatch])
  return (
    <div>
      {
      homePost?.posts?.map(item => (
          <div>
              <PostCard key={item?._id} item={item}/>
              <InputComment item={item} />
              <Comment item={item} />
          </div>
      ))
    }
    </div>
  )
}

export default PostDetails
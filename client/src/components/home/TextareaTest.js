import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updatePost} from '../../redux/actions/postAction'

function TextareaTest({content, setContent}) {
  // console.log(content);
    const dispatch = useDispatch()
    const {auth, status} = useSelector(state => state)
  return (
    <textarea name='content' value={content} onChange={e => setContent(e.target.value)} type="text" placeholder={`Write a status ${auth.user.username}...`} className='status' />
  )
}

export default TextareaTest
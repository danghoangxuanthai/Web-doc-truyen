import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import {updatePost} from '../../redux/actions/postAction'
function EditPostProfileButton({post}) {
  const dispatch = useDispatch()
  const {auth, status} = useSelector(state => state)
  const handleEdit = (e) => {
        e.preventDefault()
        dispatch({type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
        // dispatch(updatePost({user_post, auth, status}))
    }
  return (
      <div onClick={handleEdit}  className="cursor-pointer items-center flex gap-[4px] text-[#ee0024] dropdown-item">
                                                            <span span className="text-[18px] material-icons">
                                                                edit
                                                            </span>
                                                        Edit
                                                        </div>      
  )
}

export default EditPostProfileButton
import React from 'react'
import {deletePost} from '../../redux/actions/postAction'
import {useDispatch, useSelector} from 'react-redux'
function DeletePostProfile({item}) {
    const dispatch = useDispatch()
    const {auth} = useSelector(state => state)
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deletePost({item, auth}))
      }
  return (

        <div onClick={handleDelete} className="cursor-pointer items-center flex gap-[4px] text-[#ee0024] dropdown-item">
                                                            <span span className="text-[18px] material-icons">
                                                                delete
                                                            </span>
                                                            Delete
                                                        </div>   
  )
}

export default DeletePostProfile
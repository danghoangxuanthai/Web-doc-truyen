import React from 'react'
import { useDispatch } from 'react-redux';
import {GLOBALTYPES} from '../redux/actions/globalTypes'
function DeletePost({comment}) {
    const dispatch = useDispatch()
    console.log('cmtn', comment);
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch({type: GLOBALTYPES.STATUS, payload: {...comment, onDelete: true}})
      }
  return (
    <>
    <div onClick={handleDelete} className="cursor-pointer items-center flex gap-[4px] text-[#ee0024] dropdown-item">
        <span span className="text-[18px] material-icons">
            delete
        </span>
    Delete
</div>      
    </>
  )
}

export default DeletePost
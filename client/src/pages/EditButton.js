import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GLOBALTYPES} from '../redux/actions/globalTypes'
function EditButton({item, newContent}) {
    const {status} = useSelector(state => state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const handleEdit = () => {
      dispatch({type: GLOBALTYPES.STATUS, payload: {...item, content: newContent, onEdit: true}})
    }

    
  return (
    
    <div>
                                        <div onClick={handleEdit} className="cursor-pointer items-center flex gap-[4px] dropdown-item" href="#">
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg> */}
                                                <span class="text-[18px] material-icons">
                                                  edit
                                                  </span> 
                                              Edit
                                            </div>
    </div>
  )
}

export default EditButton
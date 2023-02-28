import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import SubmitBtn from '../../pages/SubmitBtn'
import {createPost, updateComment} from '../../redux/actions/postAction'
import TextareaTest from './TextareaTest'
import {updatePost} from '../../redux/actions/postAction'
import { useParams } from 'react-router-dom'
import {deletePost} from '../../redux/actions/postAction'
function Status() {
    const {status, auth, edit_comment_popup} = useSelector(state => state)
    const dispatch = useDispatch()
    const [content, setContent] = useState('')
    const {id} = useParams()
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(createPost({content, auth}))
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: 'Created user_post'}})
    }
        const handleEdit = e => {
            e.preventDefault()
            // dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
            dispatch(updatePost({content, auth, status}))
            dispatch({type: GLOBALTYPES.ALERT, payload: {success: 'Updated user_post'}})
            dispatch({type: GLOBALTYPES.STATUS, payload: false})
        
        } 
        const handleDelete = e => {
            e.preventDefault()
            console.log('deleting')
            dispatch(deletePost({status, auth}))
            dispatch({type: GLOBALTYPES.ALERT, payload: {success: 'Deleted user_post'}})
            dispatch({type: GLOBALTYPES.STATUS, payload: false})

            // dispatch(deletePost(auth, status))
        }
    
  return (
    <div>
        {
               status.onEdit && (
                <>
                     <div className='gaylo'>
                <form>
                    <div className='flex items-center justify-between w-full'>
                        <h2 className='font-bold text-[#fff]'>Edit status</h2>
                        <div onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: false})}>
                            <span className="text-[#fff] cursor-pointer material-icons">
                                close
                            </span>
                        </div>
                    </div>
                        <div className='py-[1rem]'>
                            <textarea name='content' value={content} onChange={e => setContent(e.target.value)} type="text" placeholder={`Edit your status, ${auth.user.username}...`} className='status' />
                        </div>
                        <div className='flex items-center gap-[10px] pl-[1rem] justify-end'>
                            <button onClick={handleEdit} className='text-[14px] button is-info' type='submit'>Edit</button>
                        </div>
                </form>
            </div>
                </>
               )
            }
           
          
            {
                status === false && !status.onEdit && (
                    <>
                         <div className='gaylo'>
                <form onSubmit={handleSubmit}>
                        <div className='flex items-center justify-between w-full'>
                            <h2 className='font-bold text-[#fff]'>Write status</h2>
                            <div onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: false})}>
                                <span className="text-[#fff] cursor-pointer material-icons">
                                    close
                                </span>
                            </div>
                        </div>
                        <div className='py-[1rem]'>
                            <textarea name='content' value={content} onChange={e => setContent(e.target.value)} type="text" placeholder={`Write a status ${auth.user.username}...`} className='status' />
                            {/* <TextareaTest content={status.content} setContent={setContent} /> */}
                        </div>
                        <div className='flex items-center gap-[10px] pl-[1rem] justify-end'>
                            <button onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: false})} className='text-[14px] button is-light' type='submit'>Cancel</button>
                            <button onClick={handleSubmit} className='text-[14px] button is-info' type='submit'>Publish</button>
                        </div>
                </form>
            </div>
                    </>
                )
            }
              
            {
                status.onDelete && (
                    <div className='gaylo'>
                        <form >
                        <div className='flex items-center justify-center w-full'>
                            <h2 className='font-bold text-[20px] text-[#fff]'>Deleting status?</h2>
                        </div>
                        <div className='flex items-center gap-[10px] pt-[1rem] justify-end'>
                            <div className='flexss'>
                                <button onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: false})} className='w-full text-[14px] button is-light' type='submit'>Cancel</button>
                            </div>
                            <div onClick={handleDelete} className='flexss'>
                                <button onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: false})} className='red hover:opacity-80 transition-all duration-300 w-full text-[14px] button is-info' type='submit'>Delete</button>
                            </div>
                        </div>
                </form>
                    </div>
                )
            }
            
    </div>
  )
}

export default Status
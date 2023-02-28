import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {GLOBALTYPES} from '../redux/actions/globalTypes'
import  {createPost} from '../redux/actions/postAction'
function StatusModal() {
    const dispatch = useDispatch()
    const {status, auth, socket} = useSelector(state => state)
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])
    const handleChange = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newImages = []
        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newImages.push(file)
        })
        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setImages([...images, ...newImages])
    }
    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }
    const handleSubmit = e => {
        e.preventDefault()
        if(images.length === 0){
            return dispatch({type: GLOBALTYPES.ALERT, payload: {error: 'Please add image'}})
        }
        dispatch(createPost({content, images, auth, socket}))
        dispatch({type: GLOBALTYPES.ALERT, payload: {success: 'Created post'}})
        setContent('')
        setImages([])
    }
  return (
    <div className=''>
          <div className='gaylo'>
            <form>
                        <div className='flex items-center justify-between w-full'>
                                <h2 className='font-bold text-[#fff]'>Write status</h2>
                                <div onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: false})}>
                                    <span className="text-[#fff] cursor-pointer material-icons">
                                        close
                                    </span>
                                </div>
                        </div>  
                        <div className='py-[1rem]'>
                            <textarea name='content' value={content} onChange={e => setContent(e.target.value)} type="text" placeholder={`Write your status, ${auth.user.username}...`} className='status' />
                            <div className="show_images">
                                {
                                    images.map((img, index) => (
                                        <div key={index} id='file_img'>
                                            <img src={URL.createObjectURL(img)} className='' alt="" />
                                            <span onClick={() => deleteImage(index)}>&times;</span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='input_images'>
                                <div className='file_upload w-fit py-[4px] rounded-[4px] px-[1rem] bg-[#3d9ae8]'>
                                   <div className={'flex items-center gap-[4px]'}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" className="text-[#Fff] feather feather-upload">
                                           <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                           <polyline points="17 8 12 3 7 8"/>
                                           <line x1="12" y1="3" x2="12" y2="15"/>
                                       </svg>
                                       <p className={'text-[#fff] text-[14px]'}>Upload</p>
                                   </div>
                                    <input type="file" name='file' id='file' multiple accept='image/*' onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-[10px] pl-[1rem] justify-end'>
                            <button onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: false})} className='text-[14px] button is-light' type='submit'>Cancel</button>
                            <button onClick={handleSubmit} className='text-[14px] button is-info' type='submit'>Publish</button>
                        </div>
            </form>
          </div>
                    
    </div>
  )
}

export default StatusModal
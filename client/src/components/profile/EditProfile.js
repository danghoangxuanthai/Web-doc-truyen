import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import {checkImage} from '../../utils/imageUpload'
import {updateUserProfile, updateUserAvatar} from '../../redux/actions/profileAction'
function EditProfile({setEdit}) {
    const dispatch = useDispatch()
    const initialState = {
        fullname: '', address:'', story: '', website:''
    }
    const {auth, theme} = useSelector(state => state)
    const [userData, setUserData] = useState(initialState)
    const {fullname, address, website,story } = userData
    const [avatar, setAvatar] = useState('')
    const [banner, setBanner] = useState('')
    useEffect(() => {
        setUserData(auth.user)
    }, [auth.user])
    
    const changeAvatar = e => {
        let pfp = e.target.files[0]
        const err = checkImage(pfp)
        if(err){
            return dispatch({type: GLOBALTYPES.ALERT, payload: {error: err}})
        }
        setAvatar(pfp);
    }
    const handleChange = e => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }
    const changeBanner = e => {
        let banner = e.target.files[0]
        const err = checkImage(banner)
        if(err){
            return dispatch({type: GLOBALTYPES.ALERT, payload: {error: err}})
        }
        setBanner(banner);
    }
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(updateUserProfile({userData, banner, auth}))
        dispatch(updateUserAvatar({userData, avatar, auth}))
    }
  return (
    <div className='gaylo'>
          <form onSubmit={handleSubmit}>
                <div className='picgay_wrapper'>
                        <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt="avatar" 
                        style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
                        className='w-[8rem] h-[8rem] object-cover rounded-full my-[1rem]' />
                        <span className="text-[37px] cursor-pointer material-icons">
                            image
                        </span>
                     <input className='picgay cursor-pointer' type="file" name='file' id='file_up' accept='image/*' onChange={changeAvatar} />
                </div>
                <div className='picgay_wrapper'>
                  <img src={banner ? URL.createObjectURL(banner) : auth.user.banner} alt="banner"
                      style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
                      className='w-full cursor-pointer h-[8rem] object-cover rounded-[10px] my-[1rem]' />
                      <span className="text-[37px] cursor-pointer material-icons">
                          image
                      </span>
                      <input className='picgay cursor-pointer' type="file" name='file' id='file_up' accept='image/*' onChange={changeBanner} />
              </div>
                <div className="form_group mt-[1rem]">
                    <label htmlFor="fullname">Full name</label>
                    <div className='relative'>
                        <input type="text" className='form-control'  id='fullname' name='fullname' value={fullname} 
                            onChange={handleChange}
                        />
                        <small className='text-danger' style={{position: 'absolute', top: '50%', right: '5px', 
                        transform: 'translateY(-50%)'
                    }}>{fullname.length}/25</small>
                    </div>
                </div>
                <div className="form_group mt-[1rem]">
                    <label htmlFor="address">Address</label>
                    <input type="text" className='form-control' id='address' name='address' value={address} onChange={handleChange}/>
                </div>
                <div className="form_group mt-[1rem]">
                    <label htmlFor="story">Story</label>
                    <textarea type="text" className='form-control' cols={'30'} rows='4' id='story' name='story' value={story} onChange={handleChange}/>
                </div>
                <div className="form_group mt-[1rem]">
                    <label htmlFor="website">Website</label>
                    <input type="text" className='form-control' id='website' name='website' value={website} onChange={handleChange} />
                </div>
                <div className='w-full flex mt-[2rem] justify-end'>
                        <button type='submit' className="button is-success">Save</button>
                </div>
            <div className='closing cursor-pointer' onClick={() => setEdit(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </div>
          </form>
    </div>
  )
}

export default EditProfile
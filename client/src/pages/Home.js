import React, {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {GLOBALTYPES} from '../redux/actions/globalTypes'
import Status from '.././components/home/Status'
import {getPost,deletePost} from '../redux/actions/postAction'
import PostDetails from './PostDetails'
import SubmitBtn from './SubmitBtn'
import {createPost} from '../redux/actions/postAction'
import StatusModal from './StatusModal'
import Anime from './Anime'
import DisplayQpl from "../graphql/DisplayQpl";
import {getNotify} from "../redux/actions/notifyAction";
import RightSuggest from "../components/RightSuggest";
import {getSuggestion} from "../redux/actions/suggestionAction";
import HoverCard from "./HoverCard";
import Gay2 from "./Gay2";
import SuggestHome from "./SuggestHome";
import DisplayQpl2 from "../graphql/DisplayQpl2";
import DisplayQplManga from "../graphql/DisplayQplManga";
import DisplayMang2 from "../graphql/DisplayMang2";
import {PostContext} from "../context";
import {Link} from "react-router-dom";
function Home() {
  const {status, auth, homePost} = useSelector(state => state)
  const dispatch = useDispatch()
    const {animeData} = useContext(PostContext)
  const [content, setContent] = useState('')
  const [edit, setEdit] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createPost({content, auth}))
    dispatch({type: GLOBALTYPES.ALERT, payload: {success: 'Created user_post'}})
    setContent('')
}

  return (
    <>
        <div className={'home'}>
            <Gay2 />
        </div>
        <div className={'home'}>
            <div className=" w-[1000px] mx-auto">
                <p className={'text-center text-[20px] text-[#fff] font-bold'}>TRENDING NOW</p>
                <div className='grid grid-cols-4 gap-[1rem] px-[20px] py-[2rem] mx-auto flex items-center justify-between'>
                    {animeData.map(_ => (
                       <Link to={`/anime2/${_.mal_id}`} className={'cursor-pointer bg-[#152232] p-[10px] rounded-[8px] flex items-center py-[10px] gap-[10px]'}>
                           <img className={'h-[80px] object-cover'} src={_.images.jpg.image_url}/>
                           <div className={'flex flex-col gap-[4px]'}>
                               <p className={'text-[#fff] text-[12px]'}>{_.title}</p>
                              <div className={'flex items-center gap-[4px]'}>
                                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                                       className="w-[14px] h-[14px] text-red-400" height="14px" width="14px"
                                       xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path>
                                  </svg>
                                  <p className={'text-[12px] text-[#999]'}>{_.popularity}</p>
                              </div>
                               <div className={'flex items-center flex-wrap gap-[10px]'}>
                                   {_.score && <p className={'text-[10px] p-[2px] rounded-[8px]'}>{_.score}</p>}
                                   {_.season && <p className={'text-[10px] p-[2px] rounded-[8px]'}>{_.season}</p>}
                                   {_.status && <p className={'text-[10px] p-[2px] rounded-[8px]'}>{_.status}</p>}
                               </div>

                           </div>
                       </Link>
                    ))}
                </div>
                <Link to={`/anime`} className="flex w-full items-center justify-center space-x-2 p-5 transition duration-300 hover:bg-white/10"
                   >
                    <p className={'text-[#fff]'}>Xem thêm</p>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                         className="text-[#fff] h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M6.23 20.23L8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                    </svg>
                </Link>
            </div>
        </div>

        <div className='home'>
            <div className='w-[1000px] mx-auto'>
                <div className="">
                    <div className='px-[20px] py-[2rem] mx-auto flex items-center justify-between'>
                        <p className='text-[14px] text-[#fff] font-medium'>Activities</p>
                    </div>
                    <div className='' onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: {onAdd: true}})}>
                        <textarea name='content' value={content} onChange={e => setContent(e.target.value)} type="text" placeholder={`Write a status ${auth.user.username}...`} className='status' />
                    </div>
                    {status.onEdit &&  <Status />}
                    {status.onAdd &&  <StatusModal />}
                    <div className='flex flex-col gap-[1rem]'>
                        {
                            <PostDetails />
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home
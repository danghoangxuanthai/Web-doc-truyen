import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'
import {getDataApi} from '.././utils/fetchData'
import {GLOBALTYPES} from '../redux/actions/globalTypes'
import EditButton from './EditButton'
import LikeBtn from './LikeBtn'
import {likePost, unlikePost, deletePost, updatePost, getOnePost} from '../redux/actions/postAction'
import CardHeader from './post_card/CardHeader'
import CardFooter from './post_card/CardFooter'
import CardBody from './post_card/CardBody'
import DeletePostPopup from "./DeletePostPopup";
import EditPostPop from "./EditPostPop";

function PostCard({item}) {
    const {auth, details, homePost, status,  theme, comment_popup, comment, socket} = useSelector(state => state)
    const dispatch = useDispatch()
    const [readMore, setReadMore] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [content, setContent] = useState('')
    const [content2, setContent2] = useState('')
    const handleUnlike = () => {
      setIsLike(false)
      dispatch(unlikePost({item, auth, socket}))
    }

    const handleLike = () => {
      setIsLike(true)
      dispatch(likePost({item, auth, socket}))
    }
    
    const handleEdit = (e) => {
        e.preventDefault()
    }
    const handleDelete = () => {
      dispatch(deletePost({item, auth, socket}))
    }
    const handleComment = e => {
      dispatch({type: GLOBALTYPES.SHOW_COMMENT, payload: !comment})
    }

    const [letsDelete, setLetsDelete] = useState(false)
  return (
    <div className={'cursor-pointer'}>
        {letsDelete && <DeletePostPopup setLetsDelete={setLetsDelete} handleDelete={handleDelete} />}
          <div className='mt-[1rem] h-[140px] bgg rounded-[10px]'>
            <div className='flex h-[100%] items-center w-full'>
                <Link to={`/user_post/${item?._id}`} className='h-[100%]'>
                  <img className='rounded-t-md w-[100px] h-[100%] object-cover' src={item.images[0].url} alt="" />
                </Link>
            
                <div className='flex flex-col pl-[14px] gap-[10px]'>
                    <Link to={`/profile/${item.user2._id}`}  className='text-[14px] text-[#7289da]'>{item.user2.username}</Link>
                        <p className='text-[#fff] text-[14px] w-full'>
                            <span>{item.content}</span>
                    </p>
                        {onEdit &&
                                <>
                                    <EditPostPop item={item} auth={auth} dispatch={dispatch} content={content} setOnEdit={setOnEdit} setContent={setContent} />
                                </>
                        }
                    <img   style={{filter: theme ? 'invert(1)' : 'invert(0)'}} src={item.user2.avatar} className="w-[2rem] h-[2rem] object-cover rounded-full" alt="" />
                </div>
                <div className='ml-auto pr-[1rem] flex flex-col gap-[1rem]'>
                  <div className='flex items-center gap-[1rem]'>
                      <p className='text-[#999] text-[12px]'> {moment(item.createdAt).fromNow(true)}</p>
                              <div class="dropdown">
                                  <button className="border-0 outline-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className='material-icons text-[#fff] cursor-pointer'>more_horiz</span>
                                  </button> 
                                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                      {
                                        auth.user._id === item.user2._id && (
                                          <>
                                                {/* <EditButton onClick={handleEdit} item={item.user} content={item.content}/> */}
                                                <div onClick={() => setOnEdit(true)} className="cursor-pointer items-center flex gap-[4px] text-[#ee0024] dropdown-item">
                                                    <span span className="text-[18px] material-icons">
                                                        edit
                                                      </span>
                                                  Edit
                                                </div>     
                                                <div onClick={() => setLetsDelete(true)} className="cursor-pointer items-center flex gap-[4px] text-[#ee0024] dropdown-item">
                                                    <span span className="text-[18px] material-icons">
                                                        delete
                                                      </span>
                                                  Delete
                                                </div>       
                                              <div className="underline"></div>
                                          </>
                                        )
                                      }
                                      <Link class="items-center gap-[4px] flex dropdown-item" href="#">
                                        <span class="text-[14px] material-icons">
                                            content_copy
                                        </span>
                                        Copy</Link>
                                  </div>
                              </div>
                  </div>
                  <div className='flex items-center justify-end pb-[10px] pt-[1rem] gap-[1.4rem]'>
                    <p className='like cursor-pointer flex items-center gap-[4px]'>
                      <LikeBtn setIsLike={setIsLike} handleLike={handleLike} handleUnlike={handleUnlike} isLike={isLike} item={item} />
                    </p>
                    <p onClick={handleComment} className='comments cursor-pointer flex items-center gap-[4px]'>
                        {item.comments.length !==0 && <span className='text-[14px]'>{item.comments.length}</span>}
                        <i class="fa-regular fa-comment"></i>
                      </p>
                  </div>
                </div>
            </div>
            
        </div>
    </div>
    
  )
}

export default PostCard;
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {GLOBALTYPES} from '../../redux/actions/globalTypes'
import {useSelector, useDispatch} from 'react-redux'
import EditPostProfileButton from './EditPostProfileButton'
import moment from 'moment'
import Status from '../home/Status'
import NewInfo from './NewInfo'
import {deletePost} from '../../redux/actions/postAction'
import DeletePostProfile from './deletePostProfile'
import Saved from "../../pages/profile/Saved";
function PostThumb({posts, saveTab}) {
    const {auth, status, homePost, profile,theme, comment_popup} = useSelector(state => state)
    const dispatch = useDispatch()
    const [readMore, setReadMore] = useState(false)
    const [isLike, setIsLike] = useState(false)
    
  return (
    <div className='w-[1000px] flex items-start mt-[1rem] gap-[1rem] mx-auto'>
        <div className="flex-l w-full">
            <NewInfo />
        </div>
        <div className={'flex-r w-full'}>
            {!saveTab ?
                <div className='flex-r'>
                    <p className='font-bold text-[20px]'></p>
                    {posts.map(post => {
                        return (
                            <div className='mt-[1rem] bgg rounded-[10px]'>
                                <div className='flex items-center w-full'>
                                    <div className=''>
                                        <img className='w-[70px] rounded-[4px] object-cover' src={post.images[0].url} alt=""/>
                                    </div>
                                    <div className='ml-[1rem] py-[8px] flex flex-col'>
                                        {/* <p className='text-[14px] text-[#7289da]'>{user_post.user2.username}</p> */}
                                        <p className='py-[4px] text-[14px] text-[#fff]'>{post.content}</p>
                                        {/* <img style={{filter: theme ? 'invert(1)' : 'invert(0)'}} src={user_post.user2.avatar} className="w-[2rem] h-[2rem] object-cover rounded-full" alt="" /> */}
                                    </div>
                                    <div className='ml-auto pr-[1rem] flex flex-col items-end gap-[1rem]'>
                                        <div className='py-[8px] flex items-center gap-[1rem]'>
                                            <p className='text-[#999] text-[12px]'> {moment(post.createdAt).fromNow(true)}</p>
                                            <div className="dropdown">
                                                <button className="border-0 outline-0 dropdown-toggle" type="button"
                                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                <span
                                                    className='material-icons text-[#fff] cursor-pointer'>more_horiz</span>
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    {
                                                        (
                                                            <>
                                                                <EditPostProfileButton post={post}/>
                                                                <DeletePostProfile item={post}/>
                                                                <div className="underline"></div>
                                                            </>
                                                        )
                                                    }
                                                    <Link class="items-center gap-[4px] flex dropdown-item" href="#">
                                                            <span className="text-[14px] material-icons">
                                                                content_copy
                                                            </span>
                                                        Copy</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center text-[#ad8ddb]  gap-[1rem]'>
                                            <div className='flex items-center gap-[4px]'>
                                            <span className="text-[14px] material-icons">
                                            favorite
                                            </span>
                                                <p>{post.likes.length}</p>
                                            </div>
                                            <div className='flex items-center gap-[4px]'>
                                        <span className="text-[14px] material-icons">
                                            question_answer
                                        </span>
                                                <p>{post.comments.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {status.onEdit && <Status/>}


                            </div>
                        )
                    })}
                </div> :
                <Saved auth={auth} dispatch={dispatch} />}
        </div>
    </div>
  )
}

export default PostThumb
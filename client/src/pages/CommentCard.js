import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import moment from 'moment'
import LikeButtonsss from "./LikeButtonsss";
import CommentMenusss from "./CommentMenusss";
import {useDispatch, useSelector} from "react-redux";
import {updateComment, likeComment, unlikeComment, deleteComment} from "../redux/actions/commentAction";
import DeletePopup from './DeletePopup'
import InputComment from "./InputComment";
import InputReplyComment from "./InputReplyComment";
const CommentCard = ({comment, item, commentId}) => {
    const [content, setContent] = useState('')
    const [readMore, setReadMore] = useState(false)
    const [isLike, setIsLike] = useState(false)
    const [onEdit, setOnEdit] = useState(false)
    const [onDelete, setOnDelete] = useState(false)
    const dispatch =  useDispatch()
    const {auth, socket} = useSelector(state => state)
    const [loadLike, setLoadLike] = useState(false)
    const [onReply, setOnReply] = useState(false)

    const handleLike = async () => {
        if(loadLike) return;
        setIsLike(true)
        setLoadLike(true)
        await dispatch(likeComment({comment, item, auth, socket}))
        setLoadLike(false)
    }
    const handleUnlike = async () => {
        if(loadLike) return;
        setIsLike(false)
        setLoadLike(true)
        await dispatch(unlikeComment({comment, item, auth, socket}))
        setLoadLike(false)
    }
    const handleUpdate = () => {
        if(comment.content !== content){
            dispatch(updateComment({comment, item, content, auth}))
            setOnEdit(false)
        }
        else{
            setOnEdit(false)
        }
    }
    const handleDelete = () => {
        dispatch(deleteComment({item, comment, auth, socket}))
    }
    useEffect(() => {
        setContent(comment.content)
        setOnReply(false)
    }, [comment, auth.user._id])
    const handleReply = () => {
        if(onReply) return setOnReply(false)
        setOnReply({...comment, commentId})
    }

    return (
        <div className={'rounded-[10px] p-[10px] my-[8px]'}>
            {onDelete && <DeletePopup setOnDelete={setOnDelete} handleDelete={handleDelete} />}
            <div className={'flex items-start gap-[1rem]'}>
               <Link to={`/profile/${comment.user?._id}`}>
                   <img className={'w-[40px] h-[40px] rounded-full'} src={comment.user?.avatar} alt=""/>
               </Link>
               <div className={'w-full flex justify-between'}>
                   <div className={'w-full flex flex-col gap-[4px]'}>
                       <div className={'w-full flex flex-col gap-[4px]'}>
                           <div className={'w-full flex items-center gap-[6px]'}>
                               <h2 className={'text-[12px] text-[#fff]'}>{comment.user.username}</h2>
                               <p>·</p>
                               <span className={'text-[14px] text-[#999] text-[12px]'}>{moment(comment.createdAt).fromNow(true)}</span>
                           </div>
                           {onEdit ?
                               <textarea value={content} onChange={e => setContent(e.target.value)} placeholder={'Edit your comment'} className={'mt-[10px] p-[10px] text-[#fff] texta outline-0 w-full bg-[#1A1A1B] min-h-[200px]'}>
            </textarea>
                           :
                               <p className={'text-[16px] text-[#fff]'}>
                                   {content}
                               </p>
                           }
                           {onEdit ?
                               <div className={'mt-[10px] text-[#fff] flex items-center gap-[8px] cursor-pointer'}>
                                   <small className={'cancel-btn'} onClick={() => setOnEdit(false)}>Cancel</small>
                                   <small onClick={handleUpdate} className={'update-btn'}>Update</small>
                               </div> :
                               <div className={'flex items-center gap-[1rem]'}>
                                   <small onClick={handleReply} className={'mt-[6px] cursor-pointer text-[#999]'}>
                                       {onReply ? <span className="text-[18px] material-icons">
                                                clear
                                            </span> : <span className="text-[18px] material-icons">
                                                reply
                                            </span>
                                       }
                                   </small>
                                   <div className={'flex items-center gap-[4px]'}>
                                       <LikeButtonsss setIsLike={setIsLike} comment={comment} isLike={isLike}
                                                      handleLike={handleLike} handleUnlike={handleUnlike}/>
                                   </div>
                               </div>
                           }
                       </div>
                   </div>
                   <div className={'ml-[1rem] flex text-[#fff] items-center gap-[4px]'}>
                       <div className='cursor-pointer flex items-center justify-center'>
                           <CommentMenusss setOnDelete={setOnDelete} setOnEdit={setOnEdit} comment={comment} item={item} />
                       </div>
                   </div>
               </div>
                 </div>
            {
                onReply && <InputReplyComment commentId={commentId} item={item} onReply={onReply} setOnReply={setOnReply} >

                    </InputReplyComment>
            }
            </div>
    );
};

export default CommentCard;
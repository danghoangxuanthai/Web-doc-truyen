import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import MenuUserPost from "./MenuUserPost";
import CommentMenusss from "../CommentMenusss";
import LikeButtonsss from "../LikeButtonsss";
import CommentMenuShit from "./CommentMenuShit";
import {deleteComment, deleteComment2, updateComment, updateComment2} from "../../redux/actions/commentAction";
import DeletePopup from "../DeletePopup";
const DisplayCommentOnePost = ({value, item, commentId}) => {
    const {auth} = useSelector(state => state)
    const [comment, setComment] = useState('')
    const [content, setContent] = useState('')
    const [onDelete, setOnDelete] = useState(false)
    const dispatch = useDispatch()
    const [onEdit, setOnEdit] = useState(false)
    useEffect(() => {
        const newCm = value?.content;
        setComment(newCm)
    },[value, item])
    console.log({value, item})

    const handleUpdate = () => {
            dispatch(updateComment2({value, item, content, auth}))
            setOnEdit(false)
    }
    const handleDelete = () => {
        dispatch(deleteComment2({item, value, auth}))
        setOnDelete(false)
    }

    return (
        <div>
            {onDelete && <DeletePopup setOnDelete={setOnDelete} handleDelete={handleDelete} />}
            <div className={'flex justify-between my-[10px]'}>
                <div className={'flex gap-[10px]'}>
                    <img src={value?.user?.avatar} className={'w-[3rem] h-[3rem] object-cover rounded-[4px]'} alt=""/>
                    <div className={'flex flex-col gap-[4px]'}>
                        <div className={'flex items-center gap-[4px]'}>
                            <Link to={`/profile/${value?.user?._id}`}>
                                <h2 className={'text-[12px] text-[#fff]'}>{value?.user?.username}</h2>
                            </Link>
                            <p> · </p>
                            <p className={'text-[#818384] text-[12px]'}>{moment(value?.createdAt).fromNow(true)}</p>
                        </div>
                        <div>
                            {onEdit ?
                                <textarea rows={'5'} className={'border-0 outline-0 overflow-y-scroll rounded-[8px] p-[10px] min-h-[200px] w-full'} value={content} onChange={e => setContent(e.target.value)}></textarea>
                                :
                                <p className={'text-[14px] text-[#fff]'}>{value?.content}</p>
                            }
                            {onEdit &&
                                <div className={'mt-[10px] text-[#fff] flex items-center gap-[8px] cursor-pointer'}>
                                    <small className={'cancel-btn'} onClick={() => setOnEdit(false)}>Cancel</small>
                                    <small onClick={handleUpdate} className={'update-btn'}>Update</small>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {
                    auth?.user?._id === value?.user?._id &&
                    <div className={'ml-[1rem] flex text-[#fff] items-center gap-[4px]'}>
                        <div className='pr-[1.8rem] cursor-pointer flex items-center justify-center'>
                            <CommentMenuShit setOnDelete={setOnDelete} value={value}  setOnEdit={setOnEdit}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default DisplayCommentOnePost;
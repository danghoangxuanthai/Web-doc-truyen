import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createComment} from "../redux/actions/commentAction";

const InputReplyComment = ({commentId, item, onReply, setOnReply}) => {
    const [content, setContent] = useState('')
    const {auth, socket} = useSelector(state => state)
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault()
        if(!content.trim()){
            if(setOnReply) return setOnReply(false)
            return;
        }
        setContent('')
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply: onReply && onReply.commentId,
            tag: onReply && onReply.user
        }
        dispatch(createComment({item, newComment, auth, socket}))
        // if(setOnReply) return setOnReply(false)
    }
    return (
        <form className={'flex flex-col'} onSubmit={handleSubmit}>
            <Link to={`/profile/${onReply.user._id}`}>
                <p className={'pt-[10px] ping text-[#fff]'}>@{onReply?.user?.username}</p>
            </Link>
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder={'What are your thoughts?'} className={'mt-[10px] p-[10px] text-[#fff] texta outline-0 w-full bg-[#1A1A1B] min-h-[200px]'}>
            </textarea>
            <div className={'p-[10px] w-full bg-[#272729] flex items-center justify-end gap-[1rem]'}>
                <button onClick={() => setOnReply(false)} className={'text-[#999]'}>Cancel</button>
                <button className={'text-[#000] bg-[#fff] py-[4px] px-[12px] rounded-[14px]'}>Reply</button>
            </div>
        </form>
    );
};

export default InputReplyComment;
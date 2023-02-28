import React from 'react';
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {createComment} from "../../redux/actions/commentAction";
import {useState} from "react";
const CommentOnePost = () => {
    const {auth, details, socket} = useSelector(state => state)
    const [content, setContent] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault()
        const item = details[details?.length - 1]
        if(!content.trim()) return;
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString()
        }
        dispatch(createComment({item, newComment, auth, socket}))
        setContent('')
    }
    return (
        <form onSubmit={handleSubmit} className={'p-[20px]'}>
            <div className={'text-[#999] text-[13px] flex items-center gap-[4px]'}>
                <p>Comment as</p>
                <Link to={`/profile/${auth?.user?._id}`} className={'text-[#4FBCFF]'}>{auth?.user?.username}</Link>
            </div>
            <div className={'mt-[1rem] w-full'}>
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder={'What are your thoughts?'} className={'text-[#818384] h-[180px] p-[10px] outline-0 bg-transparent border-shit rounded-[4px] w-full'} name="" id="" cols="30" rows="10"></textarea>
                <button type={'submit'} className={'bg-[#fff] hover:text-[#000] transition-all text-[12px] duration-300 rounded-[18px] px-[15px] text-[#999] py-[4px] w-fit flex ml-auto'}>Comment</button>
            </div>
        </form>
    );
};

export default CommentOnePost;
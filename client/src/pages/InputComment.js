import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createComment} from '../redux/actions/commentAction'
const InputComment = ({item, setOnReply, onReply}) => {
    const [content, setContent] = useState('')
    const {auth, socket} = useSelector(state => state)
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault()
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
        <form onSubmit={handleSubmit} className={'w-full px-[1rem] gap-[4px] my-[8px] flex items-center justify-between'}>
            <textarea className={'status text-[#fff] w-full'} type="text" placeholder={`Add your comment, ${auth.user.username}`}
                value={content} onChange={e => setContent(e.target.value)}
            />
            {
                !content.trim() ? '' :  <button className={'px-[6px] text-[#000] py-[5px] text-[14px] rounded-[2px] h-full bg-[#999]'} type={'submit'}>Publish</button>
            }
        </form>
    );
};

export default InputComment;
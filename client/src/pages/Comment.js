import React, {useEffect, useState} from 'react';
import CommentDisplay from './CommentDisplay'
import {useSelector} from "react-redux";
const Comment = ({item}) => {
    const [comments, setComments] = useState([])
    const [showComments, setShowComments] = useState([])
    const [next, setNext] = useState(2)
    const [replyComments, setReplyComments] = useState([])
    const {comment} = useSelector(state => state)

    useEffect(() => {
        const newCm = item.comments.filter(cm => !cm.reply);
        setComments(newCm)
        setShowComments(newCm.slice(newCm.length - next))
    },[item.comments, next])

    useEffect(() => {
        const newRep = item.comments.filter(_ => _.reply)
        setReplyComments(newRep)
    }, [item.comments])

    if(showComments.length === 0 ){
        return (
            <h2 className={'pl-[20px] text-[13px] text-[#999]'}>No comments yet...</h2>
        )
    }
    return (
        <div className={''}>
            {
                showComments.map(comment => (
                    <>
                        <CommentDisplay key={comment._id} comment={comment} item={item} replyCm={replyComments.filter(_ => _.reply === comment._id)}/>
                    </>
                ))
            }
            {
                comments.length - next > 0
                    ? <div className="nice cursor-pointer text-[#fff]"
                           onClick={() => setNext(next + 10)}>
                        <p className={'text-[14px]'}>Load comments</p>
                    </div>

                    : comments.length > 2 &&
                    <div className="nice cursor-pointer text-[#fff]"
                         onClick={() => setNext(2)}>
                        <p className={'text-[14px]'}>Show less</p>
                    </div>
            }
        </div>
    );
};

export default Comment;
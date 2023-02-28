import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import CommentMenuShit3 from "./user_post/CommentMenuShit3";
import {useState} from "react";
import {updateComment3} from "../redux/actions/commentAction";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import CommentCardGo from "./CommentCardGo";

const CommentCard2 = ({setNext, auth, item, replyCm, next, commentId}) => {
    const [onDelete, setOnDelete] = useState(false)
    const [showReply, setShowReply] = useState([])

    useEffect(() => {
        setShowReply(replyCm.splice(replyCm.length - next))
    }, [replyCm, next])

    return (
        <div>
            <div className={'threadline mb-[2rem] h-[100%] flex flex-col gap-[1rem] pl-[1rem] flex ml-[2.4rem]'}>
                {
                    showReply.map((_, index) => (
                        <CommentCardGo commentId={commentId} item={item} go={_} auth={auth} replyCm={replyCm}/>
                    ))
                }
                {
                    replyCm.length - next > 0
                        ? <div className="nice cursor-pointer text-[#fff]"
                               onClick={() => setNext(next + 10)}>
                            <p className={'text-[14px]'}>{replyCm.length} replies</p>
                        </div>

                        : replyCm.length > 1 &&
                        <div className={'nice cursor-pointer text-[#fff]'}
                             onClick={() => setNext(2)}>
                            <p className={'text-[14px]'}>Show less</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default CommentCard2;
import React, {useEffect, useState} from 'react';
import CommentCard from './CommentCard'
import comment from "../redux/reducers/commentFilterReducer";
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import  moment from 'moment'
import CommentMenuShit3 from "./user_post/CommentMenuShit3";
import {updateComment, updateComment2, updateComment3} from "../redux/actions/commentAction";
import CommentCard2 from "./CommentCard2";
const CommentDisplay = ({comment, item, replyCm}) => {
    const {auth}  = useSelector(state => state)
    const [next, setNext] = useState(0)
    const dispatch = useDispatch()
    const [onDelete, setOnDelete] = useState(false)

    return (
        <div>
                <CommentCard comment={comment} item={item} commentId={comment._id} />
                <CommentCard2 next={next} setNext={setNext} commentId={comment._id} replyCm={replyCm} item={item} auth={auth} setOnDelete={setOnDelete}  />
        </div>
    );
};

export default CommentDisplay;
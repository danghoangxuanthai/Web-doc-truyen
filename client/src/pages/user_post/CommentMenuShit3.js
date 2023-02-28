import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {deleteComment} from "../../redux/actions/commentAction";
import Dropdown from "./Dropdown";


const CommentMenuShit3 = ({setOnEdit, setOnDelete, replyComment, item, comment}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const {auth, socket} = useSelector(state => state)
    const handleDelete = () => {
        dispatch(deleteComment({item, comment, auth, socket}))
    }
    return (
        <div className={'menu cursor-pointer text-[#fff]'}>
                  <div className={'flex'}>
                      <Dropdown handleDelete={handleDelete}/>
                  </div>
        </div>
    );
};

export default CommentMenuShit3;
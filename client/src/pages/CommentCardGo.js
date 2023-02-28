import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import CommentMenuShit3 from "./user_post/CommentMenuShit3";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateComment3} from "../redux/actions/commentAction";

const CommentCardGo = ({go, auth, replyCm, setOnDelete, item, commentId}) => {
    return (
        <div>
            <div className={'flex items-center'}>
                <div className={'w-full flex items-center justify-between'}>
                    <div className={'flex flex-col gap-[1rem]'}>
                        <div className={'flex items-start gap-[1rem]'}>
                            <div className={'flex items-center gap-[1rem] h-[100%]'}>
                                <img className={'w-[3rem] h-[3rem] rounded-[4px] object-cover'} src={go.user.avatar} alt=""/>
                            </div>
                            <div className={'w-full justify-between flex items-center'}>
                                <div className={'flex w-full flex-col gap-[10px]'}>
                                    <div className={'w-full flex items-center gap-[1rem]'}>
                                        <Link to={`/profile/${go.user._id}`} className={'text-[12px] text-[#fff]'}>{go.user.username}</Link>
                                        <p className={'text-[12px] text-[#ccc]'}>{moment(go.createdAt).fromNow(true)}</p>
                                    </div>
                                        <p className={'text-[16px] text-[#fff]'}>
                                            {go.content}
                                        </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        auth.user._id === go.user._id &&  <div>
                            <CommentMenuShit3 item={item} comment={go} setOnDelete={setOnDelete}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CommentCardGo;
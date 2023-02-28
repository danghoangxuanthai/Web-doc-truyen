import React, {useEffect} from 'react';
import {GLOBALTYPES} from "../redux/actions/globalTypes";
import {createPost} from "../redux/actions/postAction";
import moment from 'moment'
import {useDispatch, useSelector} from "react-redux";
import StatusModalForum from "./StatusModalForum";
import {getPostForum} from "../redux/actions/forumAction";
import {Link} from 'react-router-dom'
const ForumReal = () => {
    const dispatch = useDispatch()
    const {status, auth, socket, forum} = useSelector(state => state)
    useEffect(() => {
        if(auth.token){
            dispatch(getPostForum(auth.token))
        }
    }, [auth, dispatch])
    return (
        <div className={'bg-[#000] w-full min-h-[100vh]'}>
            <div className={' w-[1000px] p-[1rem] mx-auto flex min-h-[100vh]'}>
                <div className={'l-partt h-fit'} onClick={() => dispatch({type: GLOBALTYPES.STATUS, payload: {onAdd: true}})}>
                    <button className={'w-full bg-[#3db4f2] text-[#fff] rounded-[4px] py-[8px] text-[14px]  px-[1rem]'}>Create thread</button>
                </div>
                {status.onAdd &&  <StatusModalForum />}
                <div className={'r-partt'}>
                    <div className={'flex flex-wrap gap-[1rem] w-full pb-[2rem] px-[1rem]'}>
                        {
                            forum.posts.map(_ => (
                                <div className={'w-full bg-[#151F2E] rounded-[4px]'}>
                                    <Link style={{textDecoration: 'none'}} to={`/forum_post/${_._id}`}>
                                        {/*<img className={'w-full h-[70px] object-cover'} src={_.images[0].url} />*/}
                                        <div className={'flex flex-col gap-[1rem] p-[1rem] w-full'}>
                                            <p className={'text-[16px] text-[#fff]'}>{_.content}</p>
                                            <div className={'flex items-center gap-[10px]'}>
                                                <img className={'w-[40px] rounded-[4px] h-[40px] object-cover'} src={_.user2.avatar} alt=""/>
                                                <p className={'text-[#3db4f2] text-[12px]'}>{_.user2.username}</p>
                                                <p className={'text-[#999] text-[13px]'}>{moment(_.createdAt).fromNow(true)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumReal;
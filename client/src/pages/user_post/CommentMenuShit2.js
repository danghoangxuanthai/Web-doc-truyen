import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deletePost} from "../../redux/actions/postAction";
import {useLocation, Link} from "react-router-dom";


const CommentMenuShit2 = ({item, setOnEdit, setOnDelete}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const {auth} = useSelector(state => state)
    const handleDelete = () => {
        dispatch(deletePost({item, auth}))
        window.location.replace('/')
    }
    return (
        <div className={'menu'}>
            {/*{value?.user?._id === auth.user._id &&*/}
                <div className={'nav-item dropdown'}>
                    <span className={'material-icons'} id={'more_link'} data-toggle={'dropdown'}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                           stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                           className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"/><circle cx="19"
                                                                                                              cy="12"
                                                                                                              r="1"/><circle
                          cx="5" cy="12" r="1"/></svg>
                    </span>
                    <div className={'dropdown-menu'}>
                        <div onClick={() => setOnEdit(true)}
                             className={'flex text-[#d63031] cursor-pointer items-center gap-[8px] dropdown-item'}>
                            <span className={'text-[18px] material-icons'}>create</span>Edit
                        </div>
                        <div onClick={() => handleDelete()} className={'flex text-[#d63031] cursor-pointer items-center gap-[8px] dropdown-item'}>
                            <span className={'text-[18px] material-icons'}>delete_outline</span>Delete
                        </div>
                        <div className={'flex text-[#d63031] cursor-pointer items-center gap-[8px] dropdown-item'}>
                            <span className={'text-[18px] material-icons'}>content_copy</span>Copy
                        </div>
                    </div>
                </div>
            {/*}*/}
        </div>
    );
};

export default CommentMenuShit2;
import React, {useEffect} from 'react';
import {useSelector} from "react-redux";

const LikeButtonsss = ({comment, setIsLike, isLike, handleLike, handleUnlike}) => {
    const {auth, home} = useSelector(state => state)
    useEffect(() => {
        if(comment.likes.find(like => like === auth.user._id)){
            setIsLike(true)
        }
    }, [auth.user._id, comment])
    return (
        <div className={'flex items-center gap-[2px]'}>
            <p className={'text-[12px] text-[#999]'}>{comment?.likes?.length}</p>
            {isLike ?
                            <span onClick={handleUnlike} className="text-[14px] red2 cursor-pointer material-icons">
                                favorite
                            </span> :
                            <span onClick={handleLike} className="text-[14px] cursor-pointer material-icons">
                                favorite
                            </span>}
        </div>
    );
};

export default LikeButtonsss;
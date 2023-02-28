import React from 'react';
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom'
const RightSuggest = () => {
    const {auth, suggestion} = useSelector(state => state)
    return (
        <div className={'flex p-[1rem] flex-col gap-[1rem]'}>
            <p className={'text-[#fff]'}>People suggested for you</p>
            <div className={'flex flex-col gap-[1rem]'}>
                {
                    suggestion.users.map(_ => (
                        <div className={'flex items-center gap-[1rem]'}>
                            <img className={'w-[60px] h-[60px] rounded-[4px] object-cover'} src={_.avatar} alt=""/>
                            <div className={'w-full flex items-center justify-between'}>
                                <p className={'text-[14px] text-[#999]'}>{_.username}</p>
                                <Link style={{textDecoration: 'none'}} to={`/profile/${_._id}`} className={'cursor-pointer hover:opacity-80 transition-all duration-400 bg-[#fff] text-[14px] px-3 py-1 rounded-[14px]'}>Explore</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default RightSuggest;
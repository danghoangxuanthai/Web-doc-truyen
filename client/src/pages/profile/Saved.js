import React, {useEffect} from 'react';
import {getDataApi} from "../../utils/fetchData";
import moment from 'moment'
const Saved = ({auth, dispatch}) => {

    return (
        <div className={'w-full flex flex-wrap items-center p-[1rem] gap-[1rem]'}>
            {
                auth.user.saved.map(_ => (
                    <div className={'mt-[2rem] flex items-start gap-[2rem]'}>
                        {_[0]?.user2?.avatar !== undefined &&  <img className={'w-[40px] h-[40px] rounded-full'} src={_[0]?.user2?.avatar} alt={'suck'}/>}
                        <div className={'flex flex-col gap-[10px]'}>
                            <div className={'flex items-center gap-[10px]'}>
                                <p>{_[0]?.user2?.username}</p>
                                {/*<p className={'text-[#999] text-[14px]'}>{moment(_[0]?.createdAt).fromNow(true)}</p>*/}
                            </div>
                            <p className={'text-[#999]'}>{_[0]?.content}</p>
                            <img className={'object-cover bx rounded-[4px]'} src={_[0]?.images[0]?.url} alt=""/>
                        </div>
                    </div>
                ))
            }
            {
                auth.user.saved.map(_ => (
                    <div className={'flex items-start gap-[2rem]'}>
                        {_?.post?.user2?.avatar !== undefined &&   <img className={'w-[40px] h-[40px] rounded-full'} src={_?.post?.user2?.avatar} alt={'suck'} />}
                        <div className={'flex flex-col gap-[10px]'}>
                            <div className={'flex items-center gap-[10px]'}>
                                <p>{_?.post?.user2?.username}</p>
                                {/*<p className={'text-[#999] text-[14px]'}>{moment(_?.post?.createdAt).fromNow(true)}</p>*/}
                            </div>
                            <p className={'text-[#999]'}>{_.post?.content}</p>
                            {_?.post?.images[0]?.url !== undefined && <img className={'object-cover object-cover rounded-[4px] bx'} src={_?.post?.images[0]?.url} alt=""/>}
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Saved;
import React from 'react';
import {imageShow, videoShow} from "../../utils/mediaShow";

const MsgDisplay = ({user, msg}) => {

    return (
        <div className={''}>
            <div className={'my-[1rem] flex items-start gap-[1rem] '}>
                <div className={'min-w-[40px]'}>
                    <img src={user.avatar} className={'w-[40px] h-[40px] rounded-full'} alt=""/>
                </div>
                <div className={'flex flex-col gap-[8px]'}>
                    <p className={'text-[#fff] text-[14px]'}>{user.username}</p>
                    <p className={'text-[#f1f1f1] text-[14px]'}>
                        {msg.text}
                    </p>
                    {
                        msg.media?.map((_, index) => (
                            <div key={index}>
                                {
                                    _.url.match(/video/i) ? videoShow(_) : imageShow(_)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MsgDisplay;
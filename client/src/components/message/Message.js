import React from 'react';
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Message = () => {
    return (
        <div className={'bg-[#0b1622]'}>
            <div className={'py-[1rem] w-full gap-[1rem] flex mx-auto max-w-[1000px] min-h-[100vh]'}>
                <div className="w-full ll-part">
                    <LeftSide />
                </div>
                <div className="w-full rr-part bg-[#111]">
                    <RightSide />
                </div>
            </div>
        </div>
    );
};

export default Message;
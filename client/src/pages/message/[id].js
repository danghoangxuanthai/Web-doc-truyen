import React from 'react';
import {useParams} from "react-router-dom";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const DmMessage = () => {
    const {id} = useParams()
    return (
        <div className={'bg-[#0b1622]'}>
            <div className={'py-[1rem] w-full gap-[10px] flex mx-auto max-w-[1000px] min-h-[100vh]'}>
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

    export default DmMessage;
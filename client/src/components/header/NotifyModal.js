import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import moment from 'moment'
import {isReadNotify, removeNotify} from "../../redux/actions/notifyAction";
const NotifyModal = () => {
    const {auth, notify, socket} = useSelector(state => state)
    const dispatch = useDispatch()
    const handleIsRead = (msg) => {
        console.log(msg)
        dispatch(isReadNotify({msg, auth}))
        // dispatch(removeNotify({msg, auth, socket}))
    }

    return (

        <div>
            {notify.data.length > 0 ?
            <div className={'testt w-[350px]'}>
                    <div className={'w-full flex items-center justify-between p-2'}>
                        <h2 className={'text-[#000] text-[14px]'}>Notifications</h2>
                    </div>
                    <div className={'heyy overflow-scroll'}>
                        {
                            notify.data.map((_, index) => (
                                <div key={index} className={'transition-all duration-800 flex flex-col gap-[1rem]'}>
                                    <Link onClick={() => handleIsRead(_)} style={{textDecoration: 'none'}} to={`${_.url}`}
                                          className={''}>
                                        <div className={'flex items-center p-2 w-full'}>
                                            <img src={_.user2?.avatar} className={'w-[40px] h-[40px] rounded-full mr-[10px]'}
                                                 alt=""/>
                                            <div className={'flex justify-between items-center w-full gap-[1rem]'}>
                                                <div className={'flex flex-col gap-[0px]'}>
                                                    <p className={'text-[#000] text-[14px]'}>{_.user2?.username}</p>
                                                    <p className={'text-[#333] text-[13px]'}>{_.content}</p>
                                                    <p className={'text-[#999] text-[13px]'}>{moment(_.createdAt).fromNow(true)}</p>
                                                </div>
                                                <div className={'flex items-center gap-[4px]'}>
                                                    <img src={_.image}
                                                         className={'rounded-full w-[40px] h-[40px]  object-cover'} alt=""/>
                                                    {
                                                        !_.isRead &&
                                                        <i className={'fas fa-circle text-[10px] text-primary'}></i>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {/*<hr className={'bg-[#999] w-full h-[1px]'}></hr>*/}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
            </div>
                : <div className={'flex flex-col text-center gap-[1rem] p-[20px] w-[400px]'}>
                    <img src="https://abs.twimg.com/sticky/illustrations/empty-states/masked-doll-head-with-camera-800x400.v1.png" alt=""/>
                    <h2 className={'text-[#000] text-[20px]'}>No notifications, yet...</h2>
                    <p className={'text-[#999]'}>When someone post something or someone follow, you will receive notification</p>
                </div>
            }
        </div>
    );
};

export default NotifyModal;
import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import moment from "moment";
import {isReadNotify} from "../redux/actions/notifyAction";

function Forum() {
  const {notify, auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const handleIsRead = (msg) => {
        dispatch(isReadNotify({msg, auth}))
    }
    return (
        <div className={'bg-[#0b1622] p-[2rem] min-h-[100vh] w-full'}>
            <div className={'w-[1200px] mx-auto'}>
                {notify.data.length > 0 ?
                    <div className={'flex'}>
                        <div className={'left-part'}>
                           <p className={'text-[#f1f1f1] text-[14px]'}>Notifications</p>
                        </div>
                        <div className={'right-part'}>
                            <div className={' rounded-[10px] w-full'}>
                                <div className={'heyy flex flex-col'}>
                                    {
                                        notify.data.map((_, index) => (
                                            <div key={index} className={'mt-[1rem] pr-[1rem] rounded-[8px] bg-[#151f2e] h-[80px] transition-all duration-800 flex flex-col gap-[1rem]'}>
                                                <Link onClick={() => handleIsRead(_)} style={{textDecoration: 'none'}} to={`${_.url}`}
                                                      className={''}>
                                                    <div className={'flex items-center w-full'}>
                                                        <div className={'flex h-[80px] items-center gap-[4px]'}>
                                                            <img src={_.image}
                                                                 className={'h-[100%] w-[70px] object-cover'} alt=""/>
                                                        </div>
                                                        <div className={'flex justify-between pl-[1rem] items-center w-full gap-[1rem]'}>
                                                               <div className={'flex gap-[4px] items-center'}>
                                                                   <Link to={`/profile/${_.user2._id}`} style={{textDecoration: 'none'}} className={'text-[#3db4f2] text-[16px] '}>{_.user2.username}</Link>
                                                                   <p className={'text-[#fff]'}>{_.text}</p>
                                                               </div>
                                                                <p className={'text-[#999] text-[13px]'}>{moment(_.createdAt).fromNow(true)}</p>
                                                        </div>
                                                    </div>
                                                    {/*<hr className={'bg-[#999] w-full h-[1px]'}></hr>*/}
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={'flex flex-col text-center gap-[1rem] p-[20px] w-[400px]'}>
                        <img src="https://abs.twimg.com/sticky/illustrations/empty-states/masked-doll-head-with-camera-800x400.v1.png" alt=""/>
                        <h2 className={'text-[#000] text-[20px]'}>No notifications, yet...</h2>
                        <p className={'text-[#999]'}>When someone post something or someone follow, you will receive notification</p>
                    </div>
                }
            </div>
        </div>
  )
}

export default Forum
import React from 'react'
import {Link} from 'react-router-dom'

function Following({setShowFollowing, following}) {
    console.log(following);
  return (
    <div className='gaylo'>
        <div className='mx-auto flex flex-col gap-[1rem] w-[400px] bg-[#152232] rounded-[6px] p-[1rem]'>
                <div className='flex items-center  justify-between w-full'>
                    <h2 className='text-[#fff] font-bold text-[14px]'>Following</h2>
                    <div className='cursor-pointer' onClick={() => setShowFollowing(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </div>
                </div>
                <div className='flex flex-col gap-[1rem]'>
                    {
                        following.map(item => (
                            <Link onClick={() => setShowFollowing(false)} to={`/profile/${item._id}`}  className='flex items-center w-full gap-[1rem]'>
                                <img src={item.avatar} className="rounded-full w-[2rem] h-[2rem] object-cover" alt="" />
                                <div className='flex flex-col gap-[4px]'>
                                    <p>{item.username}</p>
                                    <p>{item.fullname}</p>
                                </div>
                            </Link>
                        ))
                    }   
                </div>
        </div>
    </div>
  )
}

export default Following
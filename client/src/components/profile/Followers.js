import React from 'react'
import {Link} from 'react-router-dom'
function Followers({setShowFollowers, followers}) {
    console.log(followers);
  return (
    <div className='gaylo'>
        <div className='mx-auto flex flex-col gap-[1rem] w-[400px] bg-[#152232] rounded-[6px] p-[1rem]'>
                <div className='flex items-center  justify-between w-full'>
                    <h2 className='text-[#fff] font-bold text-[14px]'>Followers</h2>
                    <div className='cursor-pointer' onClick={() => setShowFollowers(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#000" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </div>
                </div>
                <div className='flex flex-col gap-[1rem]'>
                    {
                        followers.map(item => (
                            <Link onClick={() => setShowFollowers(false)} to={`/profile/${item._id}`} className='flex items-center w-full gap-[1rem]'>
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

export default Followers
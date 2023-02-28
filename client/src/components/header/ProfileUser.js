import React from 'react'
import Avatar from '../../pages/Avatar'
function ProfileUser({user}) {
  return (
    <div className='p-[2rem] okk my-[2px] py-[1rem] flex items-center gap-[10px]'>
            <Avatar src={user.avatar } className='w-[2rem] rounded-full'/>
            <div className='flex flex-col gap-[4px] text-[14px]'>
              <p className='text-[#fff] cursor-pointer gayy'>{user.username}</p>
              <p className='text-[#fff] cursor-pointer gayy'>{user.fullname}</p>
            </div>
    </div>
  )
}

export default ProfileUser
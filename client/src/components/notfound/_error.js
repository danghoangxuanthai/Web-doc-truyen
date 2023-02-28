import React from 'react';

const Notfound = () => {
    return (
        <div className={'bg-[#000] h-[100vh] w-full grid place-items-center'}>
           <div className={'flex flex-col gap-[1rem] items-center'}>
               <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="3"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    className="text-secondary ">
                   <circle cx="12" cy="12" r="10"></circle>
                   <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
               </svg>
               <h2 className={'text-[20px] text-[#fff]'}>Có vẻ như trang bạn đang tìm không tồn tại</h2>
               <a href={'/'} className={'back'}>Trở về trang chủ</a>
           </div>
        </div>
    );
};

export default Notfound;
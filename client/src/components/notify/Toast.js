import React from 'react'

function Toast({msg, handleShow, bgColor}) {
  return (
    <>
        <div className={`toast min-w-[300px] show position-fixed ${bgColor}`} style={{top: '5px', right: '5px',zIndex: '40'}}>
            <div className={`toast-header gay`}>
                <strong>{msg.title}</strong>    
                <button className='text-[20px] close' onClick={handleShow}>&times;</button>
            </div>
            <div className={`toast-body text-[#fff] ${bgColor}`}>
                {msg.body}
            </div>
        </div>
    </>
  )
}

export default Toast
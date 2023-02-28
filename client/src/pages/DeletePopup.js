import React from 'react';
import {GLOBALTYPES} from "../redux/actions/globalTypes";
import {useDispatch} from "react-redux";

const DeletePopup = ({handleDelete, setOnDelete}) => {
    const dispatch = useDispatch()
    const handleSubmit = e => {
        e.preventDefault()
        handleDelete()
    }
    return (
        <div>
            <>
                <div className='gaylo2 bg-[#fff]'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col px-[1rem] text-center gap-[1rem] items-center justify-between w-full'>
                            <h2 className={'text-[#000] font-bold text-[18px]'}>Xoá comments</h2>
                            <p className={'text-[#999] text-[14px]'}>Xoá comments? Tiếp tục hoặc thay đổi quyết định bằng cách nhấn các buttons phía bên dưới.</p>
                        </div>
                        <div className='mt-[1.4rem] flex items-center gap-[10px] pl-[1rem] justify-end'>
                            <button onClick={() => setOnDelete(false)} className='text-[14px] ' type='submit'>Cancel</button>
                            <button className='deleting text-[14px] button is-info' type='submit'>Delete comment</button>
                        </div>
                    </form>
                </div>
            </>
        </div>
    );
};

export default DeletePopup;
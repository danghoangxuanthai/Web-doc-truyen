import React from 'react';
import {updatePost} from "../redux/actions/postAction";

const EditPostPop = ({item, content, setContent, setOnEdit, dispatch, auth}) => {
    const handleUpdate = () => {
        dispatch(updatePost({item, content, auth}))
        setOnEdit(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdate()
    }
    return (
        <div>
            <>
                <div className='gaylo2 bg-[#fff]'>
                    <form onSubmit={handleSubmit}>
                        <h2 className={'font-bold'}>Update post</h2>
                         <textarea placeholder={'Type to update your user_post...'} className={'w-full border-0 outline-0 p-[10px] rounded-[4px]'} value={content}
                                   onChange={e => setContent(e.target.value)} rows={'5'}/>
                        <div className='mt-[1.4rem] flex items-center gap-[10px] pl-[1rem] justify-end'>
                            <button onClick={() => setOnEdit(false)} className='text-[14px] ' type='submit'>Cancel</button>
                            <button className='deleting text-[14px] button is-info' type='submit'>Update post</button>
                        </div>
                    </form>
                </div>
            </>
        </div>
    );
};

export default EditPostPop;
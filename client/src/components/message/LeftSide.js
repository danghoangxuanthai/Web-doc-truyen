import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getDataApi} from "../../utils/fetchData";
import {useHistory, useLocation} from "react-router-dom";
import {addUser, getConversation} from "../../redux/actions/messageAction";
import {Button} from "@mui/material";

const LeftSide = () => {
    const {auth, message} = useSelector(state => state)
    const [active, setActive] = useState(false)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    const history = useHistory()
    const {pathname} = useLocation()
    const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);
        try{
            const res = await getDataApi(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        }
        catch(err){

        }
    }
    const handleAddUser = (user) => {
        setActive(true)
        setSearch('')
        setSearchUsers([])
        dispatch(addUser({user, message}))
        return history.push(`/message/${user._id}`)
    }
    const isActive = (pn) => {
        if(pn === pathname) return 'active'
    }
    useEffect(() => {
        dispatch(getConversation({auth}))
    }, [dispatch, auth])
    return (
        <div className={'w-full bg-[#2c2f33] flex flex-col gap-[10px]'}>
            <form className={'w-full flex items-center gap-[4px]'} onClick={handleSearch}>
                {/*<TextField id="outlined-basic" label="Outlined" variant="outlined">*/}
                {/*    */}
                {/*</TextField>*/}
                <input placeholder={'Search user to message'} className={'bg-[#fff] text-[#000] w-full border-0 outline-0 py-1 rounded-[2px] px-3'} type="text" value={search} onChange={e => setSearch(e.target.value)}/>
                <Button variant="contained">Search</Button>
            </form>
            {
                searchUsers.length !== 0 ? (
                    <div className={'w-full mt-[1rem] flex flex-col gap-[4px]'}>
                        <p className={'p-2 text-[#fff]'}>Search results</p>
                        {
                            searchUsers.map(_ => (
                               <div onClick={() => handleAddUser(_)} className={'cursor-pointer bgay mx-2 px-4 py-2 hover:opacity-40 transition-all duration-700  rounded-[10px] py-2 px-1 flex items-center gap-[8px]'}>
                                   <img className={'w-[50px] h-[50px] rounded-full object-cover'} src={_.avatar} alt=""/>
                                   <p className={'text-[#999] text-[14px]'}>{_.username}</p>
                               </div>
                            ))
                        }
                    </div>
                ) : <div className={'mt-[1rem] flex flex-col gap-[10px]'}>
                    {
                        message.users.length !== 0 &&  <p className={'p-2 text-[#fff]'}>Recently find</p>
                    }
                    {
                        message.users.map(_ => (
                            <div className={'flex lmao items-center justify-between w-full pr-[10px]'}>
                                <div onClick={() => handleAddUser(_)} className={'cursor-pointer mx-2 px-4 py-2 hover:opacity-40 transition-all duration-700  rounded-[10px] py-2 px-1 flex items-center gap-[8px]'}>
                                    <img className={'w-[40px] h-[40px] rounded-full object-cover'} src={_.avatar} alt=""/>
                                   <div>
                                       <p className={'text-[#999] text-[14px]'}>{_.username}</p>
                                       {
                                           _.media.length !==0 ? (
                                               <div className={'flex items-center gap-[4px]'}>
                                                   <p className={'text-[#999] text-[14px]'}>{_.text}</p>
                                                   <span className="text-[#999] material-symbols-outlined">
                                                        image
                                                    </span>
                                               </div>
                                           ) :
                                               <div className={'flex items-center gap-[4px]'}>
                                                   <p className={'text-[#999] text-[14px]'}>{_.text}</p>
                                               </div>
                                       }
                                   </div>
                                </div>
                                <div className={'cursor-pointer lmao2'}>
                                    <svg className="closeIcon-1NwtbI" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default LeftSide;
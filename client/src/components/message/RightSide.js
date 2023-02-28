import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import {GLOBALTYPES} from "../../redux/actions/globalTypes";
import {imageShow, videoShow} from "../../utils/mediaShow";
import {imageUpload} from "../../utils/imageUpload";
import {addMessage, getMessages, MESS_TYPES} from "../../redux/actions/messageAction";
import {getDataApi} from "../../utils/fetchData";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

const RightSide = () => {
    const {auth, message, socket} = useSelector(state => state)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [user, setUser] = useState([])
    const [text, setText] = useState('')
    const [loadMedia, setLoadMedia] = useState(false)
    const [media, setMedia] = useState([])
    useEffect(() => {
        const newUser = message.users.find(_ => _._id === id)
        if(newUser){
            setUser(newUser)
        }
    }, [message.users, id])
    const handleChangeMedia = (e) => {
        const files = [...e.target.files]
        let err = ""
        let newMedia = []
        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newMedia.push(file)
        })
        if(err) dispatch({ type: GLOBALTYPES.ALERT, payload: {error: err} })
        setMedia([...media, ...newMedia])
    }
    const handleDeleteMedia = index => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }
    const handleSubmit = async e => {
        e.preventDefault()
        if(!text.trim() && media.length !== 0) return;
        setText('')
        setMedia([])
        setLoadMedia(true)
        let newArr = []
        if(media.length > 0) newArr = await imageUpload(media)
        const message = {
            sender: auth.user._id,
            recipient: id,
            text,
            media: newArr,
            createdAt: new Date().toISOString()
        }
        setLoadMedia(false)
        dispatch(addMessage({user, message, socket, auth}))
    }
    useEffect(() => {
        if(id){
            const getMessage = async () => {
                dispatch({type: MESS_TYPES.GET_MESSAGES, payload: {messages: []}})
                await dispatch(getMessages({auth, id}))
            }
            getMessage()
        }
    }, [id, dispatch, auth])
    return (
        <>
            {
                    <div className={'min-h-[108vh] flex flex-col justify-between w-full bg-[#2c2f33] rounded-[4px]'}>
                        <p className={'p-[1rem] text-[#fff] font-bold'}>@ {user.username}</p>
                    {
                        <div className={'p-[1rem] h-[100%] flex flex-col items-start justify-end'}>
                            <div className={'flex flex-col'}>
                                {
                                    message.data.map((_, index) => (
                                        <div key={index}>
                                            {
                                                _.sender !== auth.user._id && <div className={'you'}>
                                                    <MsgDisplay user={user} msg={_}/>
                                                </div>

                                            }
                                            {
                                                _.sender === auth.user._id && <div className={'other'}>
                                                    <MsgDisplay user={auth.user} msg={_} />
                                                </div>

                                            }
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={'flex flex-col items-start w-full'}>
                                <form onSubmit={handleSubmit} className={'chat_input mt-[1rem] flex items-end gap-[8px] w-full'}>
                                    <div className={'p-[4px] relative bg-[#32353a] w-full'}>
                                        {media.length !==0 &&
                                            <div className="show_media grid grid-cols-3 gap-[10px]">
                                                {
                                                    media.map((_, index) => (
                                                        <div key={index} className={'relative '}>
                                                            {
                                                                _.type.match(/video/i) ? videoShow(URL.createObjectURL(_))
                                                                    : imageShow(URL.createObjectURL(_))
                                                            }
                                                            <div className={'absolute top-[10px] rounded-[4px] right-[-12px] bg-[#36393f] py-2 px-[20px]'}>
                                                                <span className={''} onClick={() => handleDeleteMedia(index)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20"
                                                                     height="20" viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor" stroke-width="2"
                                                                     stroke-linecap="round" stroke-linejoin="round"
                                                                     className="cursor-pointer text-[#e74c3c] feather feather-trash"><polyline
                                                                    points="3 6 5 6 21 6"/><path
                                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                                            </span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }
                                        <input type="text" value={text}  onChange={e => setText(e.target.value)} className={'text-[#fff] border-0 outline-0 bg-[#32353a] rounded-[4px] p-2 w-full'} placeholder={`Message @${user.username}`}/>
                                    </div>
                                    <div className={'file_upload'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                             stroke-linecap="round" stroke-linejoin="round"
                                             className="cursor-pointer text-[#fff] feather feather-upload">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                            <polyline points="17 8 12 3 7 8"/>
                                            <line x1="12" y1="3" x2="12" y2="15"/>
                                        </svg>
                                        <input type="file" name={'file'} id={'file'} multiple accept={'image/*, video/*'} onChange={handleChangeMedia}/>
                                    </div>
                                    <button type={'submit'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                             stroke-linejoin="round" className="text-[#fff] feather feather-send">
                                            <line x1="22" y1="2" x2="11" y2="13"/>
                                            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                        </svg></button>
                                </form>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default RightSide;
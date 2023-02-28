import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {isEmail, showErrMsg, showSuccessMsg} from '../utils/checkEmail'
import {getDataApi, postDataApi} from "../utils/fetchData";
import {Button} from "@mui/material";

// const {isEmail}
const intitialState = {
    email: '',
    err: '',
    success: ''
}
const ForgotPassword = () => {
    const [data, setData] = useState(intitialState)
    const {email, err, success} = data
    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]: value, err: '', success: ''})
    }
    const forgotPassword = async e => {
        if(!isEmail(email)) return setData({...data, err: 'Invalid emails', success: ''})
        try{
            const res = await postDataApi('/user/forgot', {email})
            return setData({...data, err: '', success: res.data.msg})
        }
        catch(err){
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className={'bg-[#000] h-[100vh] w-full grid place-items-center'}>
            <div className={'mx-auto text-center w-[1200px]'}>
                <p className={'text-[#Fff[ text-[16px] text-[#fff] pb-[1rem]'}>Forgot password?</p>
                <div>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(err)}
                    <div className={'flex mb-[1rem] flex-col gap-[10px] w-fit mx-auto'}>
                        <input className={'border-0 outline-0 py-[6px] px-[8px] rounded-[8px]'} placeholder={'Enter email'} type="email" name={'email'} id={'email'} value={email}
                               onChange={handleChangeInput}/>
                    </div>
                    <Button className={'mt-[10px]'} variant={'text'}  onClick={forgotPassword}>Verify email</Button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
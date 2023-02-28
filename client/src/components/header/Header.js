import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import {logout} from '../../redux/actions/authAction'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import Avatar from '../../pages/Avatar'
import {POST_TYPES} from "../../redux/actions/postAction";
import NotifyModal from "./NotifyModal";

function Header() {
    const {auth, theme, searchFilter, details, notify} = useSelector(state => state)
    const dispatch = useDispatch()
    let haha = []
    {
        notify.data.map(_ => {
            if(_.isRead === true){
                haha.push(_)
            }
        })
    }
    let gay = notify.data.length - haha.length
    console.log(gay)
    const {pathname} = useLocation()
    const isActive = (pn) => {
        if(pn === pathname) return 'active'
    }
    const navLinks = [
        {label: 'Home',  path: '/'},
        {label: 'Browse', path: '/anime'},
        {label: 'Notification', path: '/forum'},
        {label: 'Forum',  path: '/forum_real'}
    ]

  return (
    <div className='w-full header'>
        <div className='p-[20px] w-[1000px] mx-auto flex items-center justify-between'>
            <Link to='/' className='logo' >
                <img src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-CONG-NGHE-THANH-PHO-HO-CHI-MINH-HUTECH.png" style={{filter: `${theme ? 'invert(1)' : 'invert(0)'}`}} className='h-[3em]' alt="" />
            </Link>
            <div className='text-[14px] flex items-center gap-[2rem]'>
                {navLinks.map((item, index) => (
                    <Link key={index} className={`ho ${isActive(item.path)}`} to={item.path}>{item.label}</Link>
                ))}
            </div>
            <div className='users'>
                <div className='flex items-center gap-[1rem]'>
                    <span class="material-icons" onClick={() => dispatch({type: GLOBALTYPES.SHOW_SEARCH_FILTER, payload: !searchFilter})}>
                        <svg fill="currentColor" viewBox="0 0 16 16" width="20" height="20"
                             className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od"><g
                            fill-rule="evenodd" transform="translate(-448 -544)"><g fill-rule="nonzero"><path
                            d="M10.743 2.257a6 6 0 1 1-8.485 8.486 6 6 0 0 1 8.485-8.486zm-1.06 1.06a4.5 4.5 0 1 0-6.365 6.364 4.5 4.5 0 0 0 6.364-6.363z"
                            transform="translate(448 544)"></path><path
                            d="M10.39 8.75a2.94 2.94 0 0 0-.199.432c-.155.417-.23.849-.172 1.284.055.415.232.794.54 1.103a.75.75 0 0 0 1.112-1.004l-.051-.057a.39.39 0 0 1-.114-.24c-.021-.155.014-.356.09-.563.031-.081.06-.145.08-.182l.012-.022a.75.75 0 1 0-1.299-.752z"
                            transform="translate(448 544)"></path><path
                            d="M9.557 11.659c.038-.018.09-.04.15-.064.207-.077.408-.112.562-.092.08.01.143.034.198.077l.041.036a.75.75 0 0 0 1.06-1.06 1.881 1.881 0 0 0-1.103-.54c-.435-.058-.867.018-1.284.175-.189.07-.336.143-.433.2a.75.75 0 0 0 .624 1.356l.066-.027.12-.061z"
                            transform="translate(448 544)"></path><path
                            d="m13.463 15.142-.04-.044-3.574-4.192c-.599-.703.355-1.656 1.058-1.057l4.191 3.574.044.04c.058.059.122.137.182.24.249.425.249.96-.154 1.41l-.057.057c-.45.403-.986.403-1.411.154a1.182 1.182 0 0 1-.24-.182zm.617-.616.444-.444a.31.31 0 0 0-.063-.052c-.093-.055-.263-.055-.35.024l.208.232.207-.206.006.007-.22.257-.026-.024.033-.034.025.027-.257.22-.007-.007zm-.027-.415c-.078.088-.078.257-.023.35a.31.31 0 0 0 .051.063l.205-.204-.233-.209z"
                            transform="translate(448 544)"></path></g></g></svg>
                    </span>
                    <Link className={'link'} style={{textDecoration: 'none'}} to={'/message'}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="cursor-pointer feather feather-mail">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </Link>
                    <div className={'relative flex items-center cursor-pointer'}>

                        <div className="dropdown">
                            {gay > 0 &&
                                <div className={'hey bg-red-500 text-[#fff] rounded-full w-[20px] h-[20px] flex items-center justify-center text-[12px] absolute left-2 top-[-10px]'}>
                                    {gay}
                                </div>
                            }
                            <div className="dropdown ">
                                <button className="rounded-[10px] border-0 p-0 outline-0 dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    <svg viewBox="0 0 28 28" alt="" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x198g3q0"
                                         fill="currentColor" height="24" width="24">
                                        <path
                                            d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path>
                                    </svg>
                                </button>
                                <div className="dropdown-menu rounded-[8px]" aria-labelledby="dropdownMenuButton">
                                    <NotifyModal />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='user_avatar flex items-center gap-[6px]'>
                        <Avatar src={auth?.user?.avatar} />
                            <div class="dropdown">
                                <button className="border-0 outline-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="material-icons">
                                            expand_more
                                        </span>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <Link to={`/profile/${auth.user._id}`} class="dropdown-item" href="#">Profile</Link>
                                    <label htmlFor="theme" className='dropdown-item'
                                        onClick={() => dispatch({type: GLOBALTYPES.THEME, payload: !theme})}
                                    >{theme ? 'Light Mode' : 'Dark Mode'}</label>
                                    <div className="underline"></div>
                                    <a class="dropdown-item" href="#" onClick={() => dispatch(logout())}>Log out</a>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header
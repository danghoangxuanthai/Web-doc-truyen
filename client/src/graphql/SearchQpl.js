import React, {useContext, useState} from 'react';
import {PostContext} from "../context";
import Dropdown from "../components/home/Dropdown";
import DropdownYear from "../components/home/DropdownYear";
import Dropdown2 from "../components/home/Dropdown2";

const SearchQpl = ({setSearchTerm}) => {
    const {searchTerm, setStatus, status, season, setSeason, year, type} = useContext(PostContext)
    console.log({status})
    return (
        <div className={''}>
            <h2 className={'font-bold text-[#fff] text-[24px] '}>Trending Anime</h2>
            <div className={'pt-[1rem] w-full grid grid-cols-4 gap-[3rem]'}>
                <div className={'flex flex-col gap-[10px]'}>
                    <p className={'text-[#999]'}>Search</p>
                    <div className={'rounded-[6px] py-[11px] px-[16px] flex bg-[#151f2e] items-center gap-[8px]'}>
                        <svg data-v-84c4e64c="" aria-hidden="true" focusable="false" data-prefix="fas"
                             data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                             className="icon text-[#516170] left svg-inline--fa fa-search fa-w-16">
                            <path data-v-84c4e64c="" fill="currentColor"
                                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                                  className=""></path>
                        </svg>
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={'w-full text-[14px] text-[#8ba0b2] border-0 outline-0 bg-transparent'} type="text"/>
                    </div>
                </div>
                <div className={'flex flex-col gap-[10px]'}>
                    <p className={'text-[#999] flex items-center gap-[4px]'}>
                        <p>Status:</p>
                        <p className={'bg-[#fff] text-[#000] rounded-[4px] text-[12px] py-[3px] px-[6px] '}>{status}</p>
                    </p>
                    <Dropdown2 />
                </div>
                <div className={'flex flex-col gap-[10px]'}>
                    <p className={'text-[#999] flex items-center gap-[4px]'}>
                        <p>Year:</p>
                        <p className={'bg-[#fff] text-[#000] rounded-[4px] text-[12px] py-[3px] px-[6px]'}>{year}</p>
                    </p>
                    <Dropdown />
                </div>
                <div className={'flex flex-col gap-[10px]'}>
                    <p className={'text-[#999] flex items-center gap-[4px]'}>
                        <p>Format:</p>
                        <p className={'bg-[#fff] text-[#000] rounded-[4px] text-[12px] py-[3px] px-[6px]'}>{type}</p>
                    </p>
                    <DropdownYear  />
                </div>
            </div>
        </div>
    );
};

export default SearchQpl;
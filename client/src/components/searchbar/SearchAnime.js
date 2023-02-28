import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useHistory, useLocation, useParams} from "react-router-dom";

const SearchAnime = ({setType, setPage, page}) => {
    return (
        <div className={'flex pt-[1rem] w-[1200px] mx-auto items-center gap-[4px]'}>
            <div className="flex-grow">
                <input page={page} onChange={e => setPage(e.target.value)} className={'w-full bg-[#000]  rounded-[4px] border-0 outline-0 text-[#fff] p-[4px]'} type="text" placeholder={'Search your fav anime'}/>
                <option value="any">
                    <select value={'ANIME'} onClick={e => setType(e.target.value)}>ANIME</select>
                </option>
            </div>
            <div className="flex-grow">
                <button className={'bg-[#000] p-[4px] text-[#fff] rounded-[4px]'}>Search</button>
            </div>
        </div>
    );
};

export default SearchAnime;
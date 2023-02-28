import React, {useState} from 'react'
import {GET_GEN_3} from "./Query";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";
import SearchAnime from "../components/searchbar/SearchAnime";
import {GET_GEN_2} from "./Query2";
import Loading from '../utils/Loading'
import {GET_GEN_PAGE_2} from "./QueryPage2";
import {GET_GEN_MANGA2} from "./QueryManga2";
function Display() {
    const { loading, error, data } = useQuery(GET_GEN_MANGA2);
    if(data === undefined){
        return (
            <Loading />
        )
    }
    console.log({data})
    return (
        <div className={'flex flex-col justify-center items-center w-full bg-[#0b121a] '}>
            <h2 className={'max-w-[1000px] mx-auto pt-[3rem] text-[#999] font-bold'}>ALL TIME FAVORITE</h2>
            <div className="App2 gap-[2rem] max-w-[1000px] mx-auto gap-[20px] pt-[1rem]">
                <div className={'flex flex-col gap-[1rem]'}>
                    {
                        data?.trendingNow?.media.map(_ => (
                            <Link to={`/anime/${_.id}`} className={"flex items-center gap-[10px]"}>
                                <img className='h-[80px] cursor-pointer rounded-[4px] object-cover' src={_?.coverImage?.extraLarge} alt="npic" />
                                <div className={'flex flex-col gap-[10px]'}>
                                    <p className={'text-[14px] text-[#fff]'}>{_?.title.english}</p>
                                    {/*<p className={'text-[14px] text-[#999]'}>{_?.title.english}</p>*/}
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Display
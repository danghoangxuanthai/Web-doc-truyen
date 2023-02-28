import React, { useEffect, useState,useContext } from 'react'
import { useParams } from 'react-router-dom'
import {PostContext} from '../../context'
import {favorite} from '../../redux/actions/profileAction'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Favorite from '../Favorite'
import {useQuery} from "@apollo/client";
import {GET_GEN_3} from "../../graphql/Query";
import Loading from "../../utils/Loading";
import {favoriteAdd, removeFavoriteAdd} from "../../redux/actions/postAction";

function Anime2() {
    const {id} = useParams()
    const [fav, setFav] = useState(false)
    const {profile, user, auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const {data} = useQuery(GET_GEN_3)
    const data2 = data?.trendingNow?.media.find(_ => _.id === Number(id))
    const anime = data2;
    useEffect(() => {
        if(auth?.user?.favoriteAnime?.find(_ => _?.id === Number(id))){
            setFav(true)
        }
        else{
            setFav(false)
        }
    }, [auth.user.favoriteAnime, id])
    const handleFav = async () => {
        dispatch(favoriteAdd({profile, anime, id, auth}))
        setFav(true)
    }
    const handleUnfav = async () => {
        dispatch(removeFavoriteAdd({profile, anime, id, auth}))
        setFav(false)
    }

      if(data2 ===undefined){
           return (
            <Loading />
           )
      }
  return (
                  <div className='home flex flex-col  bg-[#151f2e] min-h-[100vh] relative'>
                      <div className={'relative'}>
                          <img className={'max-h-[300px]'} src={data2?.bannerImage} alt=""/>
                          <div className={'shadow'} />
                      </div>
                      <div className='w-[1000px] flex mx-auto'>
                          <div className="pt-[1.4rem] left-part flex flex-col gap-[1rem]">
                              <img className={'rounded-[4px] w-[200px]'} src={data2?.coverImage?.extraLarge} alt=""/>
                              <div>
                                  {/*<Favorite id={id} anime={data2} userFrom={auth.user._id} animeId={data2?.id} animeTitle={data2?.title?.english} animeImage={data2?.coverImage?.extraLarge} />*/}
                                  {
                                      fav === true ? ( <>
                                                  <div onClick={handleUnfav}
                                                       className="rb bg-[#ec294b] flex items-center justify-center rounded-[4px] cursor-pointer py-[8px] px-[10px]">
                                                                <span className="material-icons text-[21px] text-[#fff] flex items-center justify-center">
                                                            remove_circle
                                                        </span>
                                                  </div>
                                              </>
                                          )
                                          :
                                          <div onClick={handleFav}
                                               className="rb bg-[#74b9ff] flex items-center justify-center rounded-[4px] cursor-pointer py-[8px] px-[10px]">
                                                <span className="material-icons text-[21px] text-[#fff] flex items-center justify-center">
                                                  add_circle
                                                </span>
                                          </div>
                                  }
                              </div>
                              {/*<div className={'text-[13px] flex flex-col gap-[1rem] text-[#fff] p-[1rem] rounded-[8px] bg-[#151f2e]'}>*/}
                              {/*    <div className={'flex flex-col gap-[4px]'}>*/}
                              {/*        <h2 className={'font-500'}>Format</h2>*/}
                              {/*        <p className={'text-[#999] text-[12px]'}>{data2?.format}</p>*/}
                              {/*    </div>*/}
                              {/*    <div className={'flex flex-col gap-[4px]'}>*/}
                              {/*        <h2 className={'font-500'}>Status</h2>*/}
                              {/*        <p className={'text-[#999] text-[12px]'}>{data2?.status}</p>*/}
                              {/*    </div>*/}
                              {/*    <div className={'flex flex-col gap-[4px]'}>*/}
                              {/*        <h2 className={'font-500'}>Source</h2>*/}
                              {/*        <p className={'text-[#999] text-[12px]'}>{data2?.type}</p>*/}
                              {/*    </div>*/}
                              {/*    <div className={'flex flex-col gap-[4px]'}>*/}
                              {/*        <h2 className={'font-500'}>Genres</h2>*/}
                              {/*        {data2?.genres.map(_ => (*/}
                              {/*            <p className={'text-[#999] text-[12px]'}>*/}
                              {/*                {_}*/}
                              {/*            </p>*/}
                              {/*        ))}*/}
                              {/*    </div>*/}
                              {/*    <div className={'flex flex-col gap-[4px]'}>*/}
                              {/*        <h2 className={'font-500'}>Romaji</h2>*/}
                              {/*        <p className={'text-[#999] text-[12px]'}>{data2?.title?.romaji}</p>*/}
                              {/*    </div>*/}
                              {/*    <div className={'flex flex-col gap-[4px]'}>*/}
                              {/*        <h2 className={'font-500'}>Native</h2>*/}
                              {/*        <p className={'text-[#999] text-[12px]'}>{data2?.title?.native}</p>*/}
                              {/*    </div>*/}
                              {/*    <div className={'flex flex-col gap-[4px]'}>*/}
                              {/*        <h2 className={'font-500'}>Synonyms</h2>*/}
                              {/*        <p className={'text-[#999] text-[12px]'}>{data2?.format}</p>*/}
                              {/*    </div>*/}
                              {/*</div>*/}
                              {/*<h2 className={'text-[#fff]'}>Tags</h2>*/}
                              {/*<div className={'text-[13px] flex flex-col gap-[1rem] text-[#fff] w-full rounded-[8px]'}>*/}
                              {/*    {data2?.tags.map(_ => (*/}
                              {/*        <div className={'text-[#999] gap-[1rem] flex w-full items-center justify-between w-full px-[1rem] py-[6px] rounded-[4px] bg-[#151f2e]'}>*/}
                              {/*            <p>{_.name}</p>*/}
                              {/*            <span>{_.rank}%</span>*/}
                              {/*        </div>*/}
                              {/*    ))}*/}
                              {/*</div>*/}
                          </div>
                          <div className="right-part pl-[2rem] flex flex-col gap-[2rem] pt-[1.4rem]">
                          {/*    <div className={'flex flex-col gap-[1rem]'}>*/}
                          {/*        <h2 className={'text-[#fff] text-[20px]'}>{data2?.title?.english || data2?.title?.native}</h2>*/}
                          {/*        <p className={'italic text-[14px] text-[#999]'}>{data2?.description}</p>*/}
                          {/*    </div>*/}
                              <h2 className={'text-[#999] font-bold text-[14px]'}>Characters</h2>
                              <div className={'w-full grid grid-cols-2 gap-[1rem]'}>
                                  {
                                      data2?.characters?.edges.map(_ => (
                                          <div className={'flex items-center gap-[1rem] bg-[#151f2e]'}>
                                              <img className={'h-[100px]'} src={_?.node?.image?.medium} alt=""/>
                                              <div className={'flex py-[10px] text-[14px] flex-col justify-between h-full'}>
                                                  <p className={'text-[#fff]'}>{_?.node?.name?.full}</p>
                                                  <p className={'text-[#999] text-[12px]'}>{_?.role}</p>
                                              </div>
                                          </div>
                                      ))
                                  }
                              </div>
                          {/*    <h2 className={'text-[#999] font-bold text-[14px]'}>Staffs</h2>*/}
                          {/*    <div className={'w-full grid grid-cols-2 gap-[1rem]'}>*/}
                          {/*        {*/}
                          {/*            data2?.staff?.edges.map(_ => (*/}
                          {/*                <div className={'flex items-center gap-[1rem] bg-[#151f2e]'}>*/}
                          {/*                    <img className={'h-[100px]'} src={_?.node?.image?.large} alt=""/>*/}
                          {/*                    <div className={'flex py-[10px] text-[14px] flex-col justify-between h-full'}>*/}
                          {/*                        <p className={'text-[#fff]'}>{_?.node?.name?.full}</p>*/}
                          {/*                        <p className={'text-[#999] text-[12px]'}>{_?.role}</p>*/}
                          {/*                    </div>*/}
                          {/*                </div>*/}
                          {/*            ))*/}
                          {/*        }*/}
                              </div>
                          {/*    {*/}
                          {/*        data2?.recommendations?.edges.length !== 0 ? (*/}
                          {/*            <>*/}
                          {/*                <h2 className={'text-[#999] font-bold text-[14px]'}>Recommendations</h2>*/}
                          {/*                <div className={'w-full grid grid-cols-5 gap-[1.4rem]'}>*/}
                          {/*                    {*/}
                          {/*                        data2?.recommendations?.edges.map(_ => (*/}
                          {/*                            <div className={'flex items-center flex flex-col gap-[1rem]'}>*/}
                          {/*                                <img className={'rounded-[8px] h-[220px] object-cover'} src={_?.node?.mediaRecommendation?.coverImage?.extraLarge} alt=""/>*/}
                          {/*                                <p className={'text-[#fff] text-[12px] text-[#999]'}>{_?.node?.mediaRecommendation?.title?.english}</p>*/}
                          {/*                            </div>*/}
                          {/*                        ))*/}
                          {/*                    }*/}
                          {/*                </div>*/}
                          {/*            </>*/}
                          {/*        ) : ''*/}
                          {/*    }*/}
                          {/*</div>*/}
                      </div>
                  </div>


  )
}

export default Anime2
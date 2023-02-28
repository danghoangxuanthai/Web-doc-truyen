import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
import {PostContext} from "../../context";
import Favorite from "../Favorite";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useEffect} from "react";
import {favoriteAdd, removeFavoriteAdd, removeFavoriteAdd2} from "../../redux/actions/postAction";
import Loading from "../../utils/Loading";

const Anime22 = () => {
    const [fav, setFav] = useState(false)
    const {animeData} = useContext(PostContext)
    const {id} = useParams()
    const data2 = animeData.filter(_ => _.mal_id === Number(id))
    const anime = data2[0];
    console.log(anime)
    const dispatch = useDispatch()
    const {auth, profile} = useSelector(state => state)

    useEffect(() => {
        if(auth?.user?.favoriteAnime?.find(_ => _?.mal_id === Number(id))){
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
        dispatch(removeFavoriteAdd2({profile, anime, id, auth}))
        setFav(false)
    }
    if(data2 ===undefined){
        return (
            <Loading />
        )
    }
    return (
        <div className={'bg-[#0b121a] w-full h-[100vh]'}>
                <div className={'relative'}>
                    <div className={'h-[300px] relative'}>
                        <img className={'w-full h-[100%] object-cover blurr'} src={anime?.images?.jpg?.large_image_url} alt=""/>
                        <div className="shadow"></div>
                    </div>
                    <div className={'absolute top-20 left-20'}>
                        <div className={'max-w-[1200px] mx-auto flex items-center gap-[1rem]'}>
                            <div className={'lefts w-ful flex flex-col items-center  gap-[1rem]'}>
                                <img className={'rounded-[10px]  w-full object-cover shadows'} src={anime?.images?.jpg?.large_image_url} alt=""/>
                                <div className={'w-full'}>
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
                            </div>
                            <div className={'rights flex flex-col gap-[1.4rem]'}>
                                <h2 className={'font-bold text-[#fff] text-[24px]'}>{anime?.title}</h2>
                                <p className={'text-[#f1f1f1]'}>{anime?.background}</p>
                                <div className={'grid grid-cols-3 gap-[1rem]'}>
                                    <div className={'flex pt-[1rem] items-center gap-[1rem]'}>
                                        <p className={'text-[#fff]'}>Overall</p>
                                        <p className={'bg-[#fff] rounded-[4px] px-3 py-1 text-[12px]'}>{anime?.score}</p>
                                    </div>
                                    <div className={'flex pt-[1rem] items-center gap-[1rem]'}>
                                        <p className={'text-[#fff]'}>Status</p>
                                        <p className={'bg-[#fff] rounded-[4px] px-3 py-1 text-[12px]'}>{anime?.status}</p>
                                    </div>
                                    <div className={'flex pt-[1rem] items-center gap-[1rem]'}>
                                        <p className={'text-[#fff]'}>Type</p>
                                        <p className={'bg-[#fff] rounded-[4px] px-3 py-1 text-[12px]'}>{anime?.type.toUpperCase()}</p>
                                    </div>
                                    <div className={'flex pt-[1rem] items-center gap-[1rem]'}>
                                        <p className={'text-[#fff]'}>Genres</p>
                                      {anime?.genres.map(__ => (
                                          <p className={'bg-[#fff] rounded-[4px] px-3 py-1 text-[12px]'}>{__?.name}</p>
                                        ))}
                                    </div>
                                    <div className={'flex pt-[1rem] items-center gap-[1rem]'}>
                                        <p className={'text-[#fff]'}>Genres</p>
                                        {anime?.studios.map(__ => (
                                            <p className={'bg-[#fff] rounded-[4px] px-3 py-1 text-[12px]'}>{__?.name}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        </div>
    );
};

    export default Anime22;
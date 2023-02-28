import React, {useState} from 'react';
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import SwiperCore, {Autoplay, EffectCoverflow, Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {useQuery} from "@apollo/client";
import {GET_GEN_3} from "../graphql/Query";
import Loading from "../utils/Loading";
import {Link} from "react-router-dom";
SwiperCore.use([EffectCoverflow, Pagination]);

const Gay2 = () => {
    const [index, setIndex] = useState(0)
    const handleActive = (index) => {
        setIndex(index)
    }
    console.log('index', index)
    const { loading, error, data } = useQuery(GET_GEN_3);
    if(data === undefined){
        return (
            <Loading />
        )
    }
    console.log({data})
    return (
        <div className="main-swiper">
            <div>
                <div className={'relative'}>
                    <img src={data?.trendingNow?.media[index].bannerImage} className={'h-[500px] w-full object-cover'} alt=""/>
                    <div className={'absolute up flex flex-col gap-[1rem] top-[20%] left-40'}>
                        <p className={'text-[#fff] text-[30px] font-bold'}>{data?.trendingNow?.media[index].title.english}</p>
                        <div className={'py-[10px] flex items-center gap-[1.8rem]'}>
                            <div className={'flex items-center gap-[6px]'}>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24"
                                     className="w-6 h-6 text-green-300" height="1em" width="1em"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path>
                                </svg>
                                <p className={'text-[#fff]'}>{data?.trendingNow?.media[index].averageScore}%</p>
                            </div>
                            <div className={'flex items-center gap-[6px]'}>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                                     className="w-6 h-6 text-red-400" height="1em" width="1em"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z"></path>
                                </svg>
                                <p className={'text-[#fff]'}>{data?.trendingNow?.media[index].favourites}</p>
                            </div>
                            <div className={'flex items-center gap-[6px]'}>
                                {data?.trendingNow?.media[index].genres.map(_ => (
                                    <div className={'bg-[#fff] p-[4px] rounded-[4px] text-[12px] text-[#000]'}>{_}</div>
                                ))}
                            </div>
                        </div>
                        <div className={'w-[1200px]'}>
                            <p className={'text-[#f1f1f1]'}>{data?.trendingNow?.media[index].description}</p>
                        </div>
                    </div>
                    <div className="shadow"></div>

                </div>
            </div>
            <Swiper className={'swiper'}
                effect={"coverflow"}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={true}
                className="mySwiper"
            >
                {data?.trendingNow?.media.map((_, i) => {
                    return (
                        <SwiperSlide className={'swiper-slide'} key={i}>
                            <img onClick={() => handleActive(i)} className=' w-full cursor-pointer rounded-[4px] object-cover' src={_?.coverImage?.extraLarge} alt="npic" />
                            {/*<img src={_[index]?.coverImage} alt=""/>*/}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Gay2;
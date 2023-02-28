import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const ForumDetailedPost = () => {
    const {id} = useParams()
    const {forum} = useSelector(state => state)
    const forum_post = forum.posts.filter(_ => _._id === id)
    console.log({forum_post})
    return (
        <div className={'min-h-[100vh] bg-[#0b1622]'}>
            {
                forum_post.map(_ => (
                    <div className={'relative'}>
                       <div>
                                   <div className={'relative'}>
                                       <img className={'w-full h-[380px] object-cover'} src={_.images[0].url} alt=""/>
                                       <div className={'blurshit smal'}></div>
                                   </div>
                               ))
                       </div>
                        <div className={'relative'}>
                            <div className={'m-[1rem] rounded-[10px] p-[1rem] pb-[3rem] w-[800px] bg-[#151f2e] mx-auto text-[#fff] bis'}>
                                <p className={'text-[20px] pb-[10px] my-[10px]'}>{_.content}</p>
                                <p className={'leading-[1.8rem] text-[#9FADBD] my-[10px]'}>{_.content2}</p>
                                <div className={'flex flex-col gap-[1rem]'}>
                                    {
                                        _.images.map(__ => (
                                            <div className={'relative'}>
                                                <img className={'w-full h-[380px] object-cover'} src={__.url} alt=""/>
                                                <div className={'blurshit smal'}></div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={'w-full absolute top-[80%] mx-auto flex items-center justify-center'}>
                                <div className={'flex items-center gap-[4px] w-fit bg-[#55efc4] py-[2rem] text-[30px] px-[2rem] rounded-[10px] text-[#000] leading-[1.8rem]'}>{_.content3}
                                    <p className={'italic text-[10px]'}>/ 100</p>
                                </div>
                            </div>
                        </div>
                        <div className={'w-full flex pt-[5rem]  items-center justify-center'}>
                            <div className={'flex items-center justify-center gap-[1rem] p-[1rem] rounded-[10px] w-[400px] mx-auto bg-[#151f2e]'}>
                                <div className={'p-[10px] rounded-[4px] cursor-pointer bg-[#e85d75]'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="#fff" stroke="currentColor" stroke-width="1" stroke-linecap="round"
                                         stroke-linejoin="round" className="feather feather-thumbs-down">
                                        <path
                                            d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                                    </svg>
                                </div>
                                <div className={'p-[10px] rounded-[4px] cursor-pointer bg-[#7bd555]'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="#fff" stroke="currentColor" stroke-width="1" stroke-linecap="round"
                                         stroke-linejoin="round" className="feather feather-thumbs-up">
                                        <path
                                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

    export default ForumDetailedPost;
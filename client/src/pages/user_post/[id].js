import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getOnePost} from "../../redux/actions/postAction";
import {useParams} from "react-router-dom";
import Loading from '../../utils/Loading'
import {Link} from "react-router-dom";
import {Comment} from "postcss";
import CommentOnePost from "./CommentOnePost";
import DisplayCommentOnePost from "./DisplayCommentOnePost";
import DisplayContainer from "./DisplayContainer";
import CommentMenuShit from "./CommentMenuShit";
import CommentMenuShit2 from "./CommentMenuShit2";
import {savePost, removeSavedPost} from '../../redux/actions/postAction'
import RightSuggest from "../../components/RightSuggest";
const PostDetails = () => {
    const dispatch = useDispatch()
    const {id}= useParams()
    const [post, setPost] = useState([])
    const {auth,details} = useSelector(state => state)
    const [onEdit, setOnEdit] = useState(false)
    const [save, setSave] = useState(false)

    useEffect(() => {
        dispatch(getOnePost({details, id, auth}))
            const chosenOne = details[details?.length - 1]
            setPost(chosenOne)
    }, [details, dispatch, details[details?.length - 1]?.comments])

    useEffect(() => {
        if(auth.user.saved.find(_ => _[0]?._id === post?._id) || auth.user.saved.find(_ => _?.post?._id === post?._id)){
            setSave(true)
        }
        else{
            setSave(false)
        }
    }, [auth.user.saved, post?._id])

    if(details?.length === 0){
        return <Loading />
    }
    return (
        <div className={'bg-[#000] min-h-[100vh]'}>
            <div className={'pt-[1rem]  max-w-[1200px] mx-auto flex items-start gap-[1rem]'}>
                <div className={'bg-[#1A1A1B] rounded-[10px] right-part'}>
                  <div className={'flex items-center gap-[10px] p-[10px] rounded-[4px]'}>
                      <img src={post?.user2?.avatar} className={'w-[3rem] h-[3rem] object-cover rounded-[4px]'} alt=""/>
                      <p className={'flex items-center gap-[4px] text-[#818384] text-[12px]'}>
                          <p>Posted by</p>
                          <Link className={"text-[#999]"} to={`/profile/${post?.user2?._id}`}>{post?.user2?.username}</Link>
                      </p>
                  </div>
                    <div className={'flex flex-col items-start  gap-[10px] pl-[22px] rounded-[4px]'}>
                       <h2 className={'text-[24px] text-[#fff]'}>{post?.content}</h2>
                       <div className={'cursor-pointer mx-auto w-[800px] pb-[2rem]'}>
                           <img src={details[details.length -1]?.images[0]?.url} className={'w-[300px] mx-auto object-cover rounded-[4px]'} alt=""/>
                       </div>
                    </div>
                    <div className={'flex items-center'}>
                        <div className={'pl-[20px] pb-[2rem]'}>
                            <div className={'flex items-center gap-[1rem]'}>
                                <div className={'flex items-center gap-[4px]'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                         className="text-[#999] feather feather-message-circle">
                                        <path
                                            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                                    </svg>
                                    <h2 className={'text-[14px] text-[#999]'}>{post?.comments?.length}</h2>
                                    <p className={'text-[14px] text-[#999]'}>Comments</p>
                                </div>
                                <div className={'flex items-center gap-[4px]'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                         stroke-linejoin="round" className="text-[#999] feather feather-thumbs-up">
                                        <path
                                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                                    </svg>
                                    <h2 className={'text-[14px] text-[#999]'}>{post?.likes?.length}</h2>
                                    <p className={'text-[14px] text-[#999]'}>Likes</p>
                                </div>
                                {
                                    save ?  <div onClick={() => dispatch(removeSavedPost({post, auth}))} className={'flex cursor-pointer hover:bg-[#d7dadc1a] px-[6px] py-[3px] rounded-[3px] items-center gap-[4px]'}>
                                                <span className="text-[#999] material-symbols-outlined">bookmark_remove</span>
                                                <p className={'text-[14px] text-[#999]'}>Unshare</p>
                                            </div>
                                        :  <div onClick={() => dispatch(savePost({post, auth}))} className={'flex cursor-pointer hover:bg-[#d7dadc1a] px-[6px] py-[3px] rounded-[3px] items-center gap-[4px]'}>
                                            <svg viewBox="0 0 24 24" aria-hidden="true" fill={"#999"}
                                                 className="w-[24px] h-[24px] r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi">
                                                <g>
                                                    <path
                                                        d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                                                </g>
                                            </svg>
                                            <p className={'text-[14px] text-[#999]'}>Share</p>
                                        </div>
                                }
                            </div>
                        </div>

                        {post?.user2?._id === auth?.user?._id &&
                            <div className={'pb-[2rem] ml-[1rem] flex text-[#999] items-center gap-[4px]'}>
                                <div className='pr-[1.8rem] cursor-pointer flex items-center justify-center'>
                                    <CommentMenuShit2 item={post}/>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={'bg-[#000] w-full h-[10px]'} />
                    <div className={'p-[10px] pl-[20px] mt-[1rem] bg-[#1A1A1B]'}>
                        <CommentOnePost />
                    </div>
                    <div className={'pl-[20px] flex flex-col gap-[1rem]'}>
                        {
                            post?.comments?.slice(0).reverse().map(_ => (
                               <DisplayContainer setOnEdit={setOnEdit} onEdit={onEdit} item={post} value={_}/>
                            ))
                        }
                    </div>
                </div>
                <div className={'flex w-full flex-col'}>
                    <div className={' bg-[#1A1A1B] flex flex-col gap-[1rem] rounded-[4px] w-full'}>
                        <div className={'w-full discord'}>
                            <img className={'rounded-[4px] h-[100%] w-full object-cover'} src="https://styles.redditmedia.com/t5_388p4/styles/bannerBackgroundImage_plntm9perxy61.png?width=4000&s=134426b56d6f01c91e9598e4d3c8ddbedca18bec" alt=""/>
                        </div>
                        <div className={'w-full flex items-center gap-[1rem] px-[1rem]'}>
                            <img className={'h-[60px]'} src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-CONG-NGHE-THANH-PHO-HO-CHI-MINH-HUTECH.png" alt=""/>
                            <p className={'text-[#fff]'}>r/hutech</p>
                        </div>
                        <div className={'w-full px-[1rem] text-[14px] text-[#D7DADC] hcm'}>
                            <p>Ho Chi Minh City University of Technology - HUTECH (Trường Đại học Công nghệ TP.HCM - HUTECH)</p>
                        </div>
                        <div className={'px-[1rem] pb-[1rem] flex items-center gap-[4px]'}>
                            <span className="text-[#D7DADC] material-symbols-outlined">
                                cake
                            </span>
                            <p className={'text-[#999] text-[14px]'}>Created April 26, 1995</p>
                        </div>
                    </div>
                    <RightSuggest />
                </div>
            </div>
        </div>
    );
};

    export default PostDetails;
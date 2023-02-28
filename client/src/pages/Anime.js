import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import SingleProduct from './SingleProduct'
import {PostContext} from '../context'
import Loading from '../utils/Loading'
import SearchQpl from "../graphql/SearchQpl";
// import axios from 'axios'
function Anime() {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const {animeData, loadingAnime, setSearchTerm} = useContext(PostContext)
    console.log({animeData})
  return (
      <div className={"min-h-[100vh] bg-[#0b121a] w-full"}>
          <div className={'mx-auto w-[1200px] p-[2rem]'}>
              <SearchQpl setSearchTerm={setSearchTerm}/>
          </div>
        <div className='w-[1200px] mx-auto p-[2rem] grid grid-cols-5  gap-[1rem]'>
          {animeData?.map(item => (
              <Link to={`/anime2/${item?.mal_id}`} className='' >
                    <img src={item?.images?.webp?.large_image_url} className="h-[300px] rounded-[4px] object-cover cursor-pointer" alt="" />
                    <h2 className={'text-[#8ba0b2] p-[10px] text-[15px]'}>{item?.title}</h2>
              </Link>
          ))}
        </div>
      </div>
  )
}

export default Anime
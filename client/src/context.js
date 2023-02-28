import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {useQuery} from "@apollo/client";
import {GET_GEN_3} from "./graphql/Query";
const PostContext  = React.createContext()
const PostProvider = ({children}) => {
    const [animeData, setAnimeData] = useState([])
    const [id, setId] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(3)
    const [loadingAnime, setLoadingAnime] = useState(false)
    const [status, setStatus] = useState('Complete')
    const [season, setSeason] = useState('summer')
    const [year, setYear] = useState('2022')
    const [type, setType] = useState('movie')
    console.log({searchTerm})
    useEffect(() => {
       async function Test(){
           const res = await axios.get(`https://api.jikan.moe/v4/anime?limit=40&q=${searchTerm}&status=${status}&start_date=${year}&sfw&type=${type}`)
           setAnimeData(res?.data?.data)
           console.log(res?.data?.data)
       }
        const timer = setTimeout(() => {
            Test()
           }, 1000)
           return () => clearTimeout(timer);
    }, [searchTerm, status, season, year, type])
   // const handleScroll = () => {
   //      if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
   //          setPage(page => page + 1)
   //      }
   // }
   // useEffect(() => {
   //     window.addEventListener('scroll', handleScroll)
   //     return () => window.removeEventListener('scroll', handleScroll)
   // }, [])

   //  useEffect(() => {
   //      async function Test(){
   //          const res = await axios.get(`https://api.jikan.moe/v4/manga?limit=20&q=${searchTerm}&start_date=2019&sfw&genres_exclude=hentai`)
   //          setAnimeData(res?.data?.data)
   //          animeData.filter(_ => _.title.includes(searchTerm))
   //      }
   //      const timer = setTimeout(() => {
   //          Test()
   //      }, 1000)
   //      return () => clearTimeout(timer);
   //  }, [searchTerm])

    return (
        <PostContext.Provider value={{
            animeData,loadingAnime,setSearchTerm,searchTerm,
            setStatus,season, setSeason, status,
            setYear, year, setType, type
        }}>
        {children}
    </PostContext.Provider>
    )
}

export {PostContext, PostProvider}
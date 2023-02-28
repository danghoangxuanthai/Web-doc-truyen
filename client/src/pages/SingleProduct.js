import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function SingleProduct() {
  const {productId} = useParams()
  const [animeData, setAnimeData] = useState([])
  const [query, setQuery] = useState('')
  
  const getData = async () => {
    const res = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=20`)
    setAnimeData(res.data.data)
  }
  useEffect(() => {
    getData()
  }, [])
  let pageName = `/[id]`
  const data = animeData !== undefined && animeData.find((item) => item.mal_id === productId)
  console.log('hey', data)

  return (
    <div>
      
      {
        <img src={data?.images.jpg.image_url} alt="" />
      }
    </div>
  )
}

export default SingleProduct
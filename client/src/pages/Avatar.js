import React from 'react'
import { useSelector } from 'react-redux'

function Avatar({src}) {
    const {theme, auth} = useSelector(state => state)
  return (
    <img src={src} style={{filter: `${theme ? 'invert(1)' : 'invert(0)'}`}} className='h-[2.4em] w-[2.4em] object-cover rounded-[4px]' alt="" />
  )
}

export default Avatar
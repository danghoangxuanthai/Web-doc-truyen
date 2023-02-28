import React from 'react'
import { useSelector } from 'react-redux'

function LikeButton({isLike, handleLike, handleUnlike}) {
  const {theme} = useSelector(state => state)
  return (
    <>
     {
                isLike
                ? <i className="cursor-pointer fas fa-heart text-danger" onClick={handleUnlike}
                style={{filter: theme ? 'invert(1)' : 'invert(0)'}} />
                : <i className="cursor-pointer far fa-heart" onClick={handleLike} />
            }
    </>
  )
}

export default LikeButton
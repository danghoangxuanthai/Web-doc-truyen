import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function LikeBtn({item, setIsLike, isLike, handleLike, handleUnlike}) {
  const {theme, auth, homePost} = useSelector(state => state)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(item.likes?.find(_ => _._id === auth.user._id || _ === auth.user._id)){
      setIsLike(true)
    }
    else{
      setIsLike(false)
    }
  }, [auth.user._id, item.likes])

  return (
    <div>
        {
            isLike ? 
            (
              <div className='flex items-center gap-[4px]'>
                  {item.likes?.length !== 0 && <p>{item.likes?.length}</p>}
                  <i class="red2 fa-solid fa-heart" style={{filter: theme ? 'invert(1)' : 'invert(0)'}} onClick={handleUnlike}></i> 
              </div>
            ) : (
              <div className='flex items-center gap-[4px]'>
                {item.likes?.length !== 0 && <p>{item.likes?.length}</p>}
                <i class="fa-regular fa-heart" style={{filter: theme ? 'invert(1)' : 'invert(0)'}}  onClick={handleLike}></i>
              </div>
              )
        }
    </div>
  )
}

export default LikeBtn
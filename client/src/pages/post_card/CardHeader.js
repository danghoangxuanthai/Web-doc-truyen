import React from 'react'

function CardHeader({post}) {
  return (
    <div>
        <img src={post.user.avatar} alt="" />
    </div>
  )
}

export default CardHeader
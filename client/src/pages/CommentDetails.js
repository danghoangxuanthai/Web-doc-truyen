import React from 'react'
import { useSelector } from 'react-redux';

function CommentDetails({post, comment, setOnEdit}) {
  const {auth} = useSelector(state => state)
  const MenuItem = () => {
    return(
        <>
            <div className="dropdown-item" onClick={() => setOnEdit(true)}>
                <span className="cursor-pointer material-icons">create</span> Edit
            </div>
            <div className="dropdown-item" >
                <span className="cursor-pointer material-icons">delete_outline</span> Remove
            </div>
        </>
    )
}
  return (
    <div>
       {
                (post.user._id === auth.user._id || comment.user._id === auth.user._id) &&
                <div className="nav-item dropdown">
                    <span className="cursor-pointer material-icons" id="moreLink" data-toggle="dropdown">
                        more_vert
                    </span>

                    <div className="dropdown-menu" aria-labelledby="moreLink">
                        {
                            post.user._id === auth.user._id
                            ? comment.user._id === auth.user._id
                                ? MenuItem()
                                : <div className="dropdown-item">
                                    <span className="cursor-pointer material-icons">delete_outline</span> Remove
                                </div>
                            : comment.user._id === auth.user._id && MenuItem()
                        }
                    </div>

                </div>
            }
    </div>
  )
}

export default CommentDetails
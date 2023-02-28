import React from 'react';
import DisplayCommentOnePost from "./DisplayCommentOnePost";

const DisplayContainer = ({setOnEdit,setOnDelete, onEdit, item, value}) => {
    return (
        <div>
            <DisplayCommentOnePost setOnEdit={setOnEdit} onEdit={onEdit} item={item} value={value} commentId={value._id}/>
        </div>
    );
};

export default DisplayContainer;
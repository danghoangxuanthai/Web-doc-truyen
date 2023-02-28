import React, {useContext} from 'react';
import {PostContext} from "../context";

const SuggestHome = () => {
    const {animeData} = useContext(PostContext)
    console.log('hey', animeData)
    return (
        <div>
            SuggestHome
        </div>
    );
};

export default SuggestHome;
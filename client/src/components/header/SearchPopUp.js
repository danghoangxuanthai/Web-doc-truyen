import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GLOBALTYPES } from '../../redux/actions/globalTypes'
import {getDataApi} from '../../utils/fetchData'
import {Link} from 'react-router-dom'
import ProfileUser from './ProfileUser'
function SearchPopUp() {
    const {searchFilter, auth} = useSelector(state => state)
    const [search, setSearch] = useState('')
    const [userss, setUserss] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        if(search){
            getDataApi(`search?username=${search}`, auth.token)
            .then(res => setUserss(res.data.users))
            .catch(err => {
                dispatch({type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}})
            })
        }
    }, [search, auth.token, dispatch])

    const handleClose = () => {
        dispatch({type: GLOBALTYPES.SHOW_SEARCH_FILTER, payload: !searchFilter})
    }
  return (
    <form className='search'>
        <div className='search_search w-full text-[#fff] w-[600px] mx-auto bg-[#fff]'>
                <div className='flex bruh w-full py-[1rem] px-[2rem] items-center justify-between'>
                        <span className="material-icons cursor-pointer">
                            search
                        </span>
                        <input type="text" placeholder='Search user in HutechList' 
                            name='search' value={search} id='search'
                            onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
                        />
                        <span className="material-icons cursor-pointer" 
                            onClick={() => dispatch({type: GLOBALTYPES.SHOW_SEARCH_FILTER, payload: !searchFilter})}
                        >
                            close
                        </span>
                </div>
        </div>
        {
            search ?  <div className='search_search mt-[4rem] bg-[#fff] flex w-[300px] items-end space-between'>
            <div className='expand'>
                    {search && userss.map(user => {
                        return (
                            <Link onClick={handleClose} to={`/profile/${user._id}`}>
                                <ProfileUser user={user} />
                            </Link>
                        );
                    })}
            </div>
        </div> : ''
        }
    </form>
  )
}

export default SearchPopUp
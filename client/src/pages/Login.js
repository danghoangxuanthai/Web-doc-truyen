import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {login} from '../redux/actions/authAction'
import {useDispatch} from 'react-redux'
function Login() {
  const initialState = {
    email: '',
    password: ''
  }
  const dispatch = useDispatch()
  const [userData, setUserData] = useState(initialState)
  const {email, password} = userData
  const handleChangeInput = e => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(login(userData))
  }
  return (
    <div className='mx-auto w-[400px] bg-login-wrap'>
        <div className='bg-login'>
            <h2 className='text-center font-bold text-[1.4rem] p-[2rem]'>Login</h2>
           <form onSubmit={handleSubmit}>
              <div className="form-group flex flex-col gap-[1rem] p-[2rem]">
                  <input type="email" value={email} name={'email'} placeholder='Email' onChange={handleChangeInput}/>
                  <input type="password" value={password} name={'password'} placeholder='Password' onChange={handleChangeInput}/>
              </div>
              <div className='w-full grid place-items-center pb-[1rem]'>
                  {
                    (!email || !password) ? <button className='btn-login opacity-40' disabled>Login</button>
                    : <button className='btn-login'>Login</button>
                  }
              </div>
              <p className='text-[#fff] text-[14px] p-[2rem] light'>Don't have account ? <Link to='/register' className='link'>Register</Link></p>
           </form>
        </div>
    </div>
  )
}

export default Login
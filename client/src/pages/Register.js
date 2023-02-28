import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../redux/actions/authAction'
function Register() {
  const {auth, alert} = useSelector(state => state)
  const history = useHistory()
  useEffect(() => {
    if(auth.token) history.push('/')
  }, [auth.token, history])
  const initialState = {
    fullname: '',
    username: '',
    confirmPassword: '',
    email: '',
    password: ''
  }
  const dispatch = useDispatch()
  const [userData, setUserData] = useState(initialState)
  const {email, password, username, confirmPassword, fullname} = userData
  const handleChangeInput = e => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(register(userData))
  }
  return (
    <div className='mx-auto w-[400px] bg-login-wrap'>
    <div className='bg-login'>
        <h2 className='text-center font-bold text-[1.4rem] p-[2rem]'>Sign up to HutechList</h2>
       <form onSubmit={handleSubmit}>
          <div className="form-group flex flex-col gap-[10px] p-[2rem]">
              <input type="text" value={fullname} name={'fullname'} placeholder='Full Name' onChange={handleChangeInput}/>
              <small>{alert.fullname ? alert.fullname : ''}</small>
              <input type="email" value={email} name={'email'} placeholder='Email' onChange={handleChangeInput}/>              
              <small>{alert.email ? alert.email : ''}</small>
              <input type="text" value={username.toLowerCase().replace(/ /g, '')} name={'username'} placeholder='Username' onChange={handleChangeInput}/>
              <small>{alert.username ? alert.username : ''}</small>
              <input type="password" value={password} name={'password'} placeholder='Password' onChange={handleChangeInput}/>
              <small>{alert.password ? alert.password : ''}</small>
              <input type="password" value={confirmPassword} name={'confirmPassword'} placeholder='Confirm Password' onChange={handleChangeInput}/>
              <small>{alert.confirmPassword ? alert.confirmPassword : ''}</small>
          </div>
          <div className='w-full grid place-items-center pb-[1rem]'>
              {
                (!email || !password || !password || !confirmPassword) ? <button className='btn-login opacity-40' disabled>Sign up</button> 
                : <button className='btn-login'>Sign Up</button>
              }
          </div>
          <p className='text-[#fff] text-[14px] p-[2rem] light'>Already have an account ? <Link to='/' className='link'>Login</Link></p>
       </form>
    </div>
</div>
  )
}

export default Register
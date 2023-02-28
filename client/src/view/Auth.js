import React from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'
function Auth({authRoute}) {

    let body = (
        <>
            { authRoute === 'register' && <Register /> }
        </>
    )
    return (
        <>
            {body}
        </>
    )
}

export default Auth
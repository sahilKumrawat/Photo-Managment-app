import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useDispatch } from 'react-redux';
import { storeUser } from '../currentUserSlice';
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye } from "react-icons/fi";

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [showPass, setShowPass]= useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        console.log("....login fun")
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `http://localhost:3000/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                dispatch(storeUser([{ "jwtToken": jwtToken, "name": name }]))
                setTimeout(() => {
                    navigate('/home')
                }, 1000)

            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    const handleShowPass = ()=>{
        setShowPass(!showPass)
    }

    return (
        <div className='parent'>
            <div className='fram1'>
                <h1>Welcome to Fewerclicks!</h1>
                {/* <form onSubmit={handleLogin}> */}
                    <div className='div-form'>
                        <label className='label-custom' htmlFor='email'>Email</label><br />
                        <input
                            className='input-custom'
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                        />
                    </div>
                    <div className='div-form'>
                        <label className='label-custom' htmlFor='password'><RiLockPasswordLine /> Password</label><br />
                        <span>
                            <input
                                className='input-custom'
                                onChange={handleChange}
                                type={showPass ? 'text':'password'}
                                name='password'
                                placeholder='Enter your password...'
                                value={loginInfo.password}
                            /><button className='eye-button' onMouseDown={handleShowPass} onMouseUp={handleShowPass}><FiEye /></button></span>
                    </div>
                    <span className='span-from'>
                        <Link to="/signup">Signup</Link>
                    </span>
                    <div className='div-last-button'>
                        <button className='button-custom' onClick={handleLogin}>Login</button>
                    </div>
                {/* </form> */}


                <ToastContainer />
            </div>
            <div className='fram2' >
                <img style={{ height: "70%" }} src="../../../public/grp-pic.png" alt="" />
                <p style={{ color: "white", margin: "20px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br /> At sed mi, convallis pellentesque.</p>
            </div>
        </div>

    )
}

export default Login

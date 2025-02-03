import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye } from "react-icons/fi";


function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
            const url = `http://localhost:3000/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
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

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    return (
        <div className='parent'>
            <div className='fram1'>
                <h1>Welcome to Fewerclicks!</h1>
                {/* <form onSubmit={handleSignup}> */}
                <div className='div-form'>
                    <label className='label-custom' htmlFor='name'>Name</label><br />
                    <input
                        className='input-custom'
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                    />
                </div>
                <div className='div-form'>
                    <label className='label-custom' htmlFor='email'>Email</label><br />
                    <input
                        className='input-custom'
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                    />
                </div>
                <div className='div-form'>
                    <label className='label-custom' htmlFor='password'><RiLockPasswordLine /> Password</label><br />
                    <span>
                        <input
                            className='input-custom'
                            onChange={handleChange}
                            type={showPass ? 'text' : 'password'}
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                        /><button className='eye-button' onMouseDown={handleShowPass} onMouseUp={handleShowPass}><FiEye /></button></span>

                </div>
                <span style={{ marginLeft: "245px" }}>Already have an account ?
                    <Link to="/login"> Login</Link>
                </span>
                <div className='div-last-button'>
                    <button className='button-custom' onClick={handleSignup}>Signup</button>
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

export default Signup

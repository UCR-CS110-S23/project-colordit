import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';


function Register() {

    const navigate = useNavigate;

    const [values,setValues] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        toast.dismiss();

        if (await handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                password
            });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }

            // if (data.status === true) {
            //     localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            //     navigate("/");
            // }
        }
    };

    const handleValidation = async () => {
        const { username, password, confirmPassword } = values;
        var valid = true;
        
        if (username.length < 3) {
            toast.error(
                "Username should be at least 3 characters.",
                toastOptions
            );
            valid =  false;
        }

        if (password.length < 8) {
            toast.error(
                "Password should be at least 8 characters.",
                toastOptions
            );
            valid =  false;
        }

        if (password !== confirmPassword) {
            toast.error(
                "Password and confirm password do not match.", 
                toastOptions
            );
            valid =  false;
        }

        return valid;
    }

    const handleChange = (event) => {
        setValues({ ...values,[event.target.name]:event.target.value })
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt='logo' />
                        <h1>
                            colordit chat
                        </h1>
                    </div>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        name='username' 
                        onChange={(e) => handleChange(e)} 
                    />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        name='password' 
                        onChange={(e) => handleChange(e)} 
                    />
                    <input 
                        type='password' 
                        placeholder='Confirm Password' 
                        name='confirmPassword' 
                        onChange={(e) => handleChange(e)} 
                    />
                    <button type='submit'>Create User</button>
                    <span>already have an account? <Link to="/login">Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #26184a;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
        background-color: #1d1238;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            width: 100%;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.3s ease-in-out;
            &:hover {
                background-color: #5636a7;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Register
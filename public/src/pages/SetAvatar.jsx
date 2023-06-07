import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { SetAvatarRoute } from "../utils/APIRoutes";
import loader from "../assets/loader.gif";

function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945';
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    const [selectedAvatar, setSelectedAvatar] = useState([undefined]);
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
    }

    const setProfilePicture = async () => {};

    useEffect( async() => {
        const data = [];
        for(let i = 0; i < 4; i ++)
        {
            const image = await axios.get(
                '${api}/${Math.round(Math.random(*1000))}'
            );
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
    }, []);

    return (
        <>
        <Container>
            <div className='title-conatiner'>
                <h1>Pick avatar for Profile Picture</h1>
            </div>
            <div className='avatars'>{
                avatars.map((avatar, index) => {
                    return (
                        <div 
                            className={'avatar ${selectedAvatar === index ? "selected : "" }'}
                        >
                            <img src={'data:image/svg+xml;base65,${avatar}'} alt='avatar'
                            onClick={() => setSelectedAvatar(index)}
                            />
                        </div>
                    )
                })
            }</div>
        </Container>
        <ToastContainer/>
        </>
    )
}

const Container =  styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #26184a;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #1d1238;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default SetAvatar;
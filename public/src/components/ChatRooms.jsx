import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { chatRoomRoute } from '../utils/APIRoutes';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatRooms({currentUser, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [showChatForm, setShowChatForm] = useState(true);
  const [chatRoomName,setchatRoomName] = useState("");

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: false,
    draggable: false,
    theme: "dark",
}

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  },[currentUser]);

  const changeCurrentChat = (index, chatRoom) => {
    setCurrentSelected(index);
    changeChat(chatRoom);
  }

  const createChatroom = () => {
    setShowChatForm(!showChatForm);

    if(showChatForm){
      document.getElementById('chat-form').hidden = false;
    }
    else{
      document.getElementById('chat-form').hidden = true;
    }

    document.getElementById('chat-form-submit').addEventListener("keypress", function(event){
      if(event.key === "Enter"){
        document.getElementById('chat-form-submit').click();
      }
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.dismiss();

    if (await handleValidation()) {
      document.getElementById('chat-room-name').value = "";
      document.getElementById('chat-form').hidden = true;
      setShowChatForm(true);
      
      const { data } = await axios.post(chatRoomRoute, {chatRoomName});

      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
      else {
        var newChatRoom = document.createElement('h3');
        newChatRoom.innerHTML = chatRoomName ;   
        document.getElementById("chat-rooms").appendChild(newChatRoom);
      }
    }
  }

  const handleValidation = async () => {
    var valid = true;
    
    if (chatRoomName.length < 3) {
      toast.error(
          "Chat room name should be at least 3 characters.",
          toastOptions
      );
      valid =  false;
    }

    if (chatRoomName.length > 20) {
      toast.error(
          "Chat room name should be less than 20 characters.",
          toastOptions
      );
      valid =  false;
    }

    return valid;
  }

  const handleChange = (event) => {
    setchatRoomName(event.target.value);
  }

  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className='header'>
              <div className='brand'>
                <img src={Logo} alt='logo' />
                <h3>colordit chat</h3>
              </div>
              <button onClick={() => createChatroom()}>New Chat Room</button>
            </div>
            <div id='chat-rooms'>
              <form id='chat-form' hidden='hidden' onSubmit={(event)=>handleSubmit(event)}>
                <input id='chat-room-name' 
                      type='text' 
                      placeholder='Chat Room Name'
                      onChange={(event) => handleChange(event)}
                />
                <input id='chat-form-submit' type="submit" hidden='hidden'/>
              </form>
            </div>
            <div className="current-user">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar"/>
              </div>
              <div className="username">
                <h2>
                  {currentUserName}
                </h2>
              </div>
            </div>
            <ToastContainer />
          </Container>
        )
      }
    </>
  )
  
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 20% 65% 15%;
  overflow: hidden;
  background-color: #301e45;
  border: 5px solid #1d1238;
  border-radius: 15px;
  // justify-content: center;
  // align-items: center;

  .header{
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
    // width: 100%;
    .brand {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 1rem;
      img {
        height: 2rem;
      }
      h3 {
        color: white;
        text-transform: uppercase;
      }
    }

    button{
      background-color: #997af0;
      color: white;
      width: 100%;
      padding: 10px;
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
  }
  
  #chat-rooms {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .chatRoom {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0d0d30;
    // border-radius: 15px;
    // width: 90%;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default ChatRooms;
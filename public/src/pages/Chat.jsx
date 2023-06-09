import React, {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute , host} from '../utils/APIRoutes';
import ChatRooms from '../components/ChatRooms';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";

function Chat() {
  // const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('chat-app-user')));
  const [currentChat, setCurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const socket = useRef();

  useEffect(() => {
    (async() => {
      if (localStorage.getItem('chat-app-user') == null) {
        navigate("/login");
      }
    })();
  },[]);

  useEffect(() => {
    if (currentUser && !socket.current) {
      socket.current = io(host);
      console.log("socket.current", socket.current);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser, socket])

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <ChatRooms currentUser={currentUser} changeChat={handleChatChange}/>
        {currentUser != null ? (<>{currentChat === undefined ? 
          (<Welcome currentUser={currentUser}/>) : 
          (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>)}</>) : (<></>)
        }
      </div>
    </Container>
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
    border-radius: 15px;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px) and (max-width:1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
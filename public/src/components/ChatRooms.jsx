import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import Logo from "../assets/logo.svg";

function ChatRooms({currentUser, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

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
              <button>New Chat Room</button>
            </div>
            <div className='chat-rooms'>
            <h3>hello</h3>
              <h3>hello</h3>
              <h3>hello</h3>
              <h3>hello</h3>
              <h3>hello</h3>
              <h3>hello</h3>
              <h3>hello</h3>
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
  .header{
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center;
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
      width: 70%;
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
  
  .chat-rooms {
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
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
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
import React, {useEffect, useState} from 'react'
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { chatRoomRoute } from '../utils/APIRoutes';
import { getAllChatRoomsRoute } from '../utils/APIRoutes';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatRooms({currentUser, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [showChatForm, setShowChatForm] = useState(true);
  const [chatRoomName, setChatRoomName] = useState("");
  const [allChatRooms,  setAllChatRooms] = useState([]);

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

  useEffect(() => {
    (async() => {
      const { data } = await axios.get(getAllChatRoomsRoute);
      var chatRoomArr = [];

      for(var i = 0; i < data.chatRooms.length; i++){
        // var newChatRoom = document.createElement('div');
        // newChatRoom.id = data.chatRooms[i]._id;
        // newChatRoom.className = 'chat-room';
        // newChatRoom.innerHTML = data.chatRooms[i].name;

        /*newChatRoom.addEventListener('click', function(){
          const allChatRooms = document.getElementsByClassName('chatRoom');
          
          for(var j = 0; j < allChatRooms.length; j++){
            allChatRooms[j].style.backgroundColor = 'white';
          }

          const selectedChatRoom = document.getElementById(data.chatRooms[i]._id);
          // console.log("room", allChatRooms);
          selectedChatRoom.style.backgroundColor = 'blue';
        });*/

        var newChatRoom = {
          name: data.chatRooms[i].name,
          _id: data.chatRooms[i]._id
        }

        chatRoomArr.push(newChatRoom);
        // if(allChatRooms.find(({ _id }) => _id === data.chatRooms[i]._id) == undefined){
          // console.log(newChatRoom);
          // setAllChatRooms([...allChatRooms, newChatRoom]);
          
        // }
      }
      setAllChatRooms([...allChatRooms, chatRoomArr]);
      // setAllChatRooms(allChatRooms.push(chatRoomArr));

      console.log(allChatRooms);
    })();
  },[]);

  const createChatroom = () => {
    console.log("HERE", allChatRooms)
    console.log(allChatRooms);
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

    document.getElementById('chat-room-name').focus();

    // document.getElementById('chat-room-name').addEventListener('focusout', function(event){
    //   document.getElementById('chat-form').hidden = true;
    //   setShowChatForm(true);
    //   document.getElementById('chat-room-name').value = "";
    // });
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
        var newChatRoom = document.createElement('div');
        newChatRoom.id = data.chatRoom._id;
        newChatRoom.className = 'chat-room';
        newChatRoom.innerHTML = chatRoomName;
        newChatRoom.addEventListener('click', (event) => {
          chatUpdate(event);
          changeCurrentChat(event.target.id);
        });
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
    setChatRoomName(event.target.value);
  }

  const changeCurrentChat = (chatRoom) => {
    setCurrentSelected(chatRoom);
    changeChat(chatRoom);
  }

  const chatUpdate = (event) => {
    const chatRooms = document.getElementsByClassName('chat-room');

    for(var i = 0; i < chatRooms.length; i++){
      chatRooms[i].style.backgroundColor = '#ffffff34';
    }

    const selectedChatRoom = document.getElementById(event.target.id);
    selectedChatRoom.style.backgroundColor = 'white';
    changeCurrentChat(event.target.id);
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
              {allChatRooms.length > 0 ? 
                (<>
                  {allChatRooms[0].map((chatRoom, index) => {
                    return(
                      <div
                        key={index}
                        className='chat-room'
                        id={chatRoom._id}
                        onClick={(event) => {chatUpdate(event)}}
                      >
                        {chatRoom.name}
                      </div>
                    );
                  })}
                </>) : (<></>)
              }
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
      width: 80%;
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

  input{
    background-color: black;
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
    .chat-room {
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
    .chat-room:hover {
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
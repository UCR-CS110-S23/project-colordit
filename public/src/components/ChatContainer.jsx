import React, {useState, useEffect, useRef }from 'react'
import styled from "styled-components"
import ChatInput from './ChatInput';
import axios from 'axios';
import Logout from './Logout';
import Message from './Message';
import { getAllMessagesRoute, receiveMessageRoute, addMessageRoute, host } from '../utils/APIRoutes';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';

function ChatContainer({currentChat, currentUser, socket}) {
    const [messages, setMessages] = useState([]);
    const [like, setLike] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const navigate = useNavigate();
    const scrollRef = useRef();
    

    useEffect(() => {
        (async () => {
            if (currentUser == null) {
                navigate("/login");
            } 
            else{
                const response = await axios.post(getAllMessagesRoute, {room: currentChat});
                setMessages(response.data.projectedMessages);
            }
        })();
    }, [currentChat]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages]);

    const handleSendMsg = async (msg) => {
        await axios.post(addMessageRoute, {
          user: currentUser._id,
          room: currentChat,
          message: msg
        });

        socket.emit("chat message", {message: msg, room: currentChat});
    };
    
    socket.on("chat message", (data) => {
        console.log("SENDER ROOM",data.room)
        console.log("CURRENT ROOM",currentChat);
        if(currentChat === data.room){
            console.log("adding message");
            var msgs = [...messages];
            console.log(data);  
            msgs.push(data.message);
            console.log(msgs);
            setMessages(msgs);
        }
        else{
            console.log("NOT EQUAL");
            console.log(messages);
        }
    });

    return (
        <Container>
            <div className='chat-messages'>
                {messages.map((message) => {
                return (
                    <div ref={scrollRef} key={uuidv4()}>
                        <div>
                            <div className='message'>
                                <Message m={message} />
                            </div>
                        </div>
                    </div>
                );
                })}
            </div>
            <ChatInput handleSendMessage={handleSendMsg}/>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 90% 10%;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 85% 15%;
    }
    .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;
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
    }
    .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
        }
    }
    .message {
        display: flex;
        align-items: center;
        .content {
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: #d1d1d1;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                max-width: 70%;
            }
        }
    }
    }
`;

export default ChatContainer;
import React, {useState, useEffect, useRef }from 'react'
import styled from "styled-components"
import ChatInput from './ChatInput';
import axios from 'axios';
import Logout from './Logout';
import { getAllMessagesRoute, receiveMessageRoute, addMessageRoute } from '../utils/APIRoutes';
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from 'react-router-dom';

function ChatContainer({currentChat, currentUser, socket}) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const navigate = useNavigate();
    const scrollRef = useRef();

    useEffect(() => {
        (async () => {
            if (currentUser == null) {
                navigate("/login");
            } 
            else{
                // console.log("logged in");
                // console.log(currentUser);
                // console.log(currentChat);

                const response = await axios.post(getAllMessagesRoute, {
                    room: currentChat
                });

                setMessages(response.data.projectedMessages);
            }
        })();
    }, [currentChat]);

    const handleSendMsg = async (msg) => {
        //console.log(currentUser._id, currentChat ,msg);

        await axios.post(addMessageRoute, {
          user: currentUser._id,
          room: currentChat,
          message: msg
        });

        socket.current.emit("send-msg", {
            to: currentChat,
            from: currentUser._id,
            message: msg,
        }); 
        
        const msgs = [...messages];
        msgs.push(msg);
        setMessages(msgs);
    };

    useEffect(() => {
        console.log("current", socket.current);
        if (socket.current) {
            console.log("success");
            socket.current.on("msg-received", (msg) => {
                setArrivalMessage({fromSelf:false, message: msg});
            });
        }
        else {
            console.log("no current");
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
        console.log("arrival", arrivalMessage);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    }, [messages]);

    return (
        <Container>
            <div className='chat-messages'>
                {messages.map((message) => {
                return (
                    <div ref={scrollRef} key={uuidv4()}>
                        <div>
                            <div className='message'>
                                <p className='content'>{message}</p>
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
    grid-template-rows: 15% 70% 15%;
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
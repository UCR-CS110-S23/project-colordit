import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { MdHelpOutline } from 'react-icons/md';
import questions from '../assets/questions.txt'


export default function ChatInput({ handleSendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');
  const [loadedQuestions, setLoadedQuestions] = useState([]);
  const [showQuestionPopup, setShowQuestionPopup] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState('');

  useEffect(() => {
    fetch(questions)
      .then((response) => response.text())
      .then((data) => {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        setLoadedQuestions(lines);
      })
      .catch((error) => {
        console.error('Error loading questions:', error);
      });
  }, []);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg('');
    }
  };

  const openQuestionPopup = () => {
    if (loadedQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * loadedQuestions.length);
      const randomQuestion = loadedQuestions[randomIndex];
      setRandomQuestion(randomQuestion);
      setShowQuestionPopup(true);
    }
  };

  const closeQuestionPopup = () => {
    setShowQuestionPopup(false);
  };

  const announceQuestion = () => {
    if (loadedQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * loadedQuestions.length);
      const randomQuestion = loadedQuestions[randomIndex];
      setLoadedQuestions(randomQuestion);
      alert(randomQuestion)
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
        <div className="question-button">
          <MdHelpOutline onClick={openQuestionPopup} />
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="type message"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
      {showQuestionPopup && (
        <QuestionPopup>
            <div className="question-content">
            <div className="question-label">Random Question:</div>
            <div className="question">{randomQuestion}</div>
            <button className="close-button" onClick={closeQuestionPopup}>
                Close
            </button>
            </div>
        </QuestionPopup>
        )}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
    .help-button {
      svg {
        font-size: 1.5rem;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
        width: 90%;
        height: 60%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;

        &::selection {
        background-color: #9a86f3;
        }
        &:focus {
        outline: none;
        }
    }
    button {
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #9a86f3;
        border: none;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
            font-size: 1rem;
        }
        }
        svg {
        font-size: 2rem;
        color: white;
        }
    }
    }
`;

const QuestionPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .question-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    .question {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;
    }

    .question-label {
        font-size: 1rem;
        font-weight: bold;
    }

    .close-button {
        padding: 0.5rem 1rem;
        background-color: #997af0;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        }
`;



import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { updateMessageRoute } from '../utils/APIRoutes'; 
import axios from 'axios';

export default function Message({ m, m_id }) {
  const [like, setLike] = useState(m.like);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(m);
  const [editedMessage, setEditedMessage] = useState(m);

  useEffect(() => {
    setLike(m.like);
    setEditedMessage(m);
  }, [m]);

  const reactToMessage = () => {
    setLike(!like);
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  }

  const handleEdit = (e) => {
    setEditedMessage(e.target.value);
  }

  const saveEdit = async () => {
    setCurrentMessage(editedMessage);
    toggleEdit();
    await axios.post(updateMessageRoute, {
      message: editedMessage,
      id: m_id
    });
  }

  return (
    <Container>
      <MessageDiv>
        {!isEditing ? (
          <p onDoubleClick={reactToMessage}>{currentMessage}</p>
        ) : ( 
          <EditInput value={editedMessage} onChange={handleEdit}/>
        )}
      </MessageDiv>
      {like && <LikeEmojiDiv>♡</LikeEmojiDiv>}
      <ButtonContainer>
        <EditButton onClick={toggleEdit}>
          {!isEditing ? 'Edit' : 'Cancel'}
        </EditButton>
        {isEditing && (
          <SaveButton onClick={() => {saveEdit()}}>
            Save
          </SaveButton>
        )}
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  background-color: transparent;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const MessageDiv = styled.div`
  background-color: #ffffff;
  padding: 0.5rem;
  border-radius: 0.3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  user-select: none;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    background-color: pink;
  }
`;

const LikeEmojiDiv = styled.div`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  color: #ff69b4;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const EditButton = styled.button`
  background-color: #ffffff;
  border: none;
  font-size: 0.8rem;
  color: #000000;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ rounded }) => (rounded ? '0.3rem' : '0.3rem 0 0 0.3rem')};
  border-bottom-right-radius: ${({ rounded }) => (rounded ? '0.3rem' : '0.3rem')};
  border-top-right-radius: ${({ rounded }) => (rounded ? '0.3rem' : '0.3rem')};
`;

const SaveButton = styled.button`
  background-color: #ffffff;
  border: none;
  font-size: 0.8rem;
  color: #000000;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.3rem;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 0.25rem;
  border: none;
  outline: none;
`;

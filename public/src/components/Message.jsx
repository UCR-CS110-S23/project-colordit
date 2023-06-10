import React, {useState,useEffect} from 'react'
import styled from "styled-components"

export default function Message({m}) {

    const [like, setLike] = useState(m.like);

    useEffect(() => {
        setLike(m.like);
      }, [m.like]);

    function reactToMessage() {
        setLike(!like);
      }

    return (
        <Container>
            <MessageDiv>
                <p onDoubleClick={reactToMessage}>{m}</p>
            </MessageDiv>
            {like && <LikeEmojiDiv>♡</LikeEmojiDiv>}
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
  &:hover {
    cursor: default;
  }
`;

const LikeEmojiDiv = styled.div`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  color: #ff69b4;
`;
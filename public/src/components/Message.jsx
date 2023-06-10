import React, {useState} from 'react'
import styled from "styled-components"

export default function Message(m) {

    const [like, setLike] = useState(false);

    function reactToMessage() {
        var x = document.getElementById("likeEmoji");
        setLike(!like);
        if (like) {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }

    return (
        <Container>
            <p onDoubleClick={reactToMessage()}>{m}</p>
            <div id='likeEmoji'>
                ♡
            </div>
        </Container>
    );

}

const Container = styled.div``;
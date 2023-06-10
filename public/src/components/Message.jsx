import React, {useState} from 'react'
import styled from "styled-components"

export default function Message(m) {

    const [like, setLike] = useState(false);

    const reactToMessage = () => {
        setLike(!like);
    };

    return (
        <Container>
            <p onDoubleClick={reactToMessage()}>{m}</p>
        </Container>
    );

}

const Container = styled.div``;
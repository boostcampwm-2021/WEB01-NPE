import styled from "styled-components";

interface ImageBoxProps{
    size: number;
}

const Button = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: 8px;
    padding: 0px 8px 0px 8px;
    width: 144px;
    height: 72px;
    &:hover{
        box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
    }
`;

const ImageBox = styled.div<ImageBoxProps>`
    display: flex;
    border-radius: 50%;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    overflow: hidden;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 72px;
    height: 24px;
`;

export { Button, ImageBox, TextBox };

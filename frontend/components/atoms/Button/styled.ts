import styled from "styled-components";

interface ButtonProps{
    bgColor: string;
    textColor: string;
}
interface TextProps{
    textColor: string;
}
const StyledButton = styled.button<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 136px;
    height: 36px;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.textColor};
    transition: box-shadow .5s ease;
    cursor: pointer;
    &:hover{
        box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
    }
`;

const Icon = styled.img`
    display: block;
    width: 24px;
    height: 24px;
    margin-right: 8px;
`;

const Text = styled.div<TextProps>`
    font-size: 16px;
    color: ${(props) => props.textColor};
`;


export { StyledButton, Icon, Text };
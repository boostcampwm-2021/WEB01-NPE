import React, { FunctionComponent } from "react";
import { Icon, StyledButton, Text } from './styled';

interface Props {
    image?: string,
    text: string,
    bgColor: string
    textColor: string,
    onClick: Function
}
const Button : FunctionComponent<Props> = ({image, text, bgColor, textColor, onClick }) => {
    return (
        <StyledButton
            bgColor={bgColor}
            textColor={textColor}
            onClick={() => onClick()}
        >
            <Icon src={image} alt="아이콘" />
            <Text textColor={textColor}>{text}</Text>
        </StyledButton>
    );
}


export default Button;
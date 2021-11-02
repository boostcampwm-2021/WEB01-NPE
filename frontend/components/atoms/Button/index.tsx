import React, { FunctionComponent } from "react";
import { Icon, StyledButton, Text } from './styled';

interface Props {
    image?: string,
    text: string,
    bgColor: string
    textColor: string,
    onClick: Function,
    width?: string,
    height?: string,
}
const Button : FunctionComponent<Props> = ({image, text, bgColor, textColor, width, height, onClick }) => {
    return (
        <StyledButton
            bgColor={bgColor}
            textColor={textColor}
            width={width || "136px"}
            height={height || "36px"}
            onClick={() => onClick()}
        >
            {image && <Icon src={image} alt="아이콘" />}
            <Text textColor={textColor}>{text}</Text>
        </StyledButton>
    );
}


export default Button;
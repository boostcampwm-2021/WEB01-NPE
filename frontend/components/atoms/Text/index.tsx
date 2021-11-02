import type { NextPage } from 'next'
import { StyledText } from './styled'

interface textProps {
    text: string;
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    ellipsis?: boolean;
}

const Text: NextPage<textProps> = ({ text, color, ellipsis, fontSize, fontWeight }) => {
    return (
        <StyledText
            color={color}
            fontSize={fontSize}
            fontWeight={fontWeight}
            ellipsis={ellipsis}
        >
            {text}
        </StyledText>
    );
}

export default Text

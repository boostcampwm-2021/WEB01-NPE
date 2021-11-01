import type { NextPage } from 'next'
import { StyledText } from './styled'

interface textProps {
    text: string;
    color?: string;
}

const titleText: NextPage<textProps> = ({ text, color }) => {
    return (
        <StyledText color={color}>
            {text}
        </StyledText>
    );
}

export default titleText

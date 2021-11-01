import type { NextPage } from 'next'
import { StyledText } from './styled'

interface textProps {
    text: string;
    color?: string;
}

const headerText: NextPage<textProps> = ({ text, color }) => {
    return (
        <StyledText color={color}>
            {text}
        </StyledText>
    );
}

export default headerText

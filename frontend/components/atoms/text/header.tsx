import type { NextPage } from 'next'
import styled from 'styled-components'
import { textProps, textStyleProps } from './textInterface'

const header: NextPage<textProps> = ({ text, color }) => {
    return (
        <H1 color={color}>
            {text}
        </H1>
    );
}

const H1 = styled.h1<textStyleProps>`
    font-family: NotoSansKR;
    color: ${props => (props.color || 'black')};
`;

export default header

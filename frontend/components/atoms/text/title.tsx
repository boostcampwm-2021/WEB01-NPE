import type { NextPage } from 'next'
import styled from 'styled-components'
import { textProps, textStyleProps } from './textInterface'

const title: NextPage<textProps> = ({ text, color }) => {
    return (
        <H2 color={color}>
            {text}
        </H2>
    );
}

const H2 = styled.h2<textStyleProps>`
    font-family: NotoSansKR;
    color: ${props => (props.color || 'black')};
`;

export default title

import type { NextPage } from 'next'
import styled from 'styled-components'
import { textProps, textStyleProps } from './textInterface'

const content: NextPage<textProps> = ({ text, color }) => {
    return (
        <P color={color}>
            {text}
        </P>
    );
}

const P = styled.p<textStyleProps>`
    font-family: NotoSansKR;
    color: ${props => (props.color || 'black')};
`;

export default content

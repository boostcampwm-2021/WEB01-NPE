import type { NextPage } from 'next'
import styled from 'styled-components'
import { textProps, textStyleProps } from './textInterface'

const subTitle: NextPage<textProps> = ({ text, color }) => {
    return (
        <Span color={color}>
            {text}
        </Span>
    );
}

const Span = styled.span<textStyleProps>`
    font-family: NotoSansKR;
    color: ${props => (props.color || 'black')};
`;

export default subTitle

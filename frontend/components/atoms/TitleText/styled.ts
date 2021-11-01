import styled from 'styled-components'

interface textStyleProps {
    color?: string;
}

export const StyledText = styled.h2<textStyleProps>`
    font-family: NotoSansKR;
    color: ${props => (props.color || 'black')};
`;

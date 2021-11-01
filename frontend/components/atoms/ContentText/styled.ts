import styled from 'styled-components'

interface textStyleProps {
    color?: string;
}

export const StyledText = styled.p<textStyleProps>`
    font-family: NotoSansKR;
    color: ${props => (props.color || 'black')};
`;

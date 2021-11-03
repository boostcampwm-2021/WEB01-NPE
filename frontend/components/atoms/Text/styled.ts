import styled from 'styled-components'

interface textStyleProps {
    color?: string;
    fontSize?: number;
    fontWeight?: string;
    ellipsis?: boolean;
}

export const StyledText = styled.span<textStyleProps>`
    font-family: NotoSansKR;
    color: ${props => (props.color || 'black')};
    font-size: ${props => props.fontSize || '16'}px;
    font-weight: ${props => props.fontWeight || 'normal'};
    overflow: ${props => props.ellipsis ? 'hidden' : 'visible'};
    text-overflow: ${props => props.ellipsis ? 'ellipsis' : 'clip'};
    white-space: ${props => props.ellipsis ? 'nowrap' : 'normal'};
`;
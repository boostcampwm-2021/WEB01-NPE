import styled from "styled-components";

interface textStyleProps {
  color: string;
}

export const StyledText = styled.p<textStyleProps>`
  color: ${(props) => props.color};
`;

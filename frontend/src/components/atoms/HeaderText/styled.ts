import styled from "styled-components";

interface textStyleProps {
  color: string;
}

export const StyledText = styled.h1<textStyleProps>`
  color: ${(props) => props.color};
`;

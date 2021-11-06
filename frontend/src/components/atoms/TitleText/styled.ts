import styled from "styled-components";

interface textStyleProps {
  color?: string;
}

export const StyledText = styled.h2<textStyleProps>`
  color: ${(props) => props.color || "var(--black-primary)"};
`;

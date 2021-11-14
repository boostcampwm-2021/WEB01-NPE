import styled from "styled-components";

interface textStyleProps {
  color: string;
}

export const Text = styled.p<textStyleProps>`
  color: ${(props) => props.color};
`;

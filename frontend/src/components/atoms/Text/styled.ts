import styled from "styled-components";

interface textStyleProps {
  color: string;
  fontSize: string;
  fontWeight: string;
  ellipsis?: boolean;
}

export const Span = styled.span<textStyleProps>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  overflow: ${(props) => (props.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(props) => (props.ellipsis ? "ellipsis" : "clip")};
  white-space: ${(props) => (props.ellipsis ? "nowrap" : "normal")};
`;

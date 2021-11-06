import styled from "styled-components";

interface textStyleProps {
  fontSize: number;
  fontWeight?: string;
  ellipsis?: boolean;
}

export const Span = styled.span<textStyleProps>`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
  overflow: ${({ ellipsis }) => ellipsis && "hidden"};
  text-overflow: ${({ ellipsis }) => ellipsis && "ellipsis"};
  white-space: ${({ ellipsis }) => ellipsis && "nowrap"};
`;

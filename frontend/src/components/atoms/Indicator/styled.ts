import styled from "styled-components";

interface IndicatorProps {
  bgColor: string;
}

export const Indicator = styled.div<IndicatorProps>`
  background-color: ${(props) => props.bgColor};
  border-radius: 999px;
`;

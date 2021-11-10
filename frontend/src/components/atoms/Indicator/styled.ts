import styled from "styled-components";

interface IndicatorProps {
  bgColor: string;
  width: string;
  height: string;
}

const Indicator = styled.div<IndicatorProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgColor};
  border-radius: 999px;
`;

export { Indicator };

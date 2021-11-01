import { ChartData } from "chart.js";
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import styled from "styled-components";

type ChartProps = {
  type: String;
  data: ChartData<"doughnut"> & ChartData<"bar">;
};

const Chart: React.FC<ChartProps> = ({ type, data }) => {
  if (type === "DOUGHNUT")
    return (
      <StyledChart>
        <Doughnut data={data} width={50} height={25}></Doughnut>
      </StyledChart>
    );
  else if (type === "BAR") {
    return (
      <StyledChart>
        <Bar data={data} width={50} height={25}></Bar>
      </StyledChart>
    );
  }
  return <></>;
};

const StyledChart = styled.div`
  width: 100px;
`;

export default Chart;

import { ChartData } from "chart.js";
import React, { FunctionComponent } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { StyledChart } from "./styled";

interface ChartProps {
  type: String;
  data: ChartData<"doughnut"> & ChartData<"bar">;
}

const Chart: FunctionComponent<ChartProps> = ({ type, data }) => {
  if (type === "Doughnut")
    return (
      <StyledChart>
        <Doughnut data={data} width={50} height={25}></Doughnut>
      </StyledChart>
    );
  else if (type === "Bar") {
    return (
      <StyledChart>
        <Bar data={data} width={50} height={25}></Bar>
      </StyledChart>
    );
  }
  return <></>;
};

export default Chart;

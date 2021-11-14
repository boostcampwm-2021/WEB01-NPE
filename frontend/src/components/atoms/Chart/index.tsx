import React, { FunctionComponent } from "react";
import { ChartData } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

import * as Styled from "./styled";

interface ChartProps {
  type: String;
  data: ChartData<"doughnut"> & ChartData<"bar">;
}

const Chart: FunctionComponent<ChartProps> = ({ type, data }) => {
  if (type === "Doughnut")
    return (
      <Styled.Chart>
        <Doughnut data={data} width={50} height={25}></Doughnut>
      </Styled.Chart>
    );
  else if (type === "Bar") {
    return (
      <Styled.Chart>
        <Bar data={data} width={50} height={25}></Bar>
      </Styled.Chart>
    );
  }
  return <></>;
};

export default Chart;

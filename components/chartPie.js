import React from "react";
import { VictoryPie, VictoryLabel, VictoryTooltip } from "victory-native";
import Svg from "react-native-svg";

const CustomLabel = (props) => {
  return (
    <Svg.G>
      <VictoryLabel {...props} />
      <VictoryTooltip
        {...props}
        x={200}
        y={250}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: "black" }}
      />
    </Svg.G>
  );
};

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;

const ChartPie = () => {
  return (
    <Svg style={{ flex: 1 }}>
      <VictoryPie
        style={{ labels: { fill: "white" } }}
        innerRadius={100}
        labelRadius={120}
        labels={({ datum }) => `# ${datum.y}`}
        labelComponent={<CustomLabel />}
        data={[
          { x: 1, y: 5 },
          { x: 2, y: 4 },
          { x: 3, y: 2 },
          { x: 4, y: 3 },
          { x: 5, y: 1 },
        ]}
      />
    </Svg>
  );
};

export default ChartPie;

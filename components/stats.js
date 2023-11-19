import React from "react";
import { Text, View } from "react-native";
import {
  VictoryBar,
  VictoryPolarAxis,
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
} from "victory-native";
import { useAuth } from "../AuthContext";

export default function Chart() {
  const { categories, statsData } = useAuth();

  return (
    <View>
      {/* <Text onPress={fetchData}> click me</Text> */}
      <VictoryChart
        animate={{
          duration: 1000,
          easing: "bounce",
        }}
        polar
        width={315}
      >
        <VictoryPolarAxis
          startAngle={0}
          endAngle={360}
          tickValues={categories}
          labelPlacement="perpendicular"
          style={{
            grid: { stroke: "grey", strokeDasharray: "4, 4" },
            tickLabels: { fontSize: 18, padding: 15 },
          }}
        />
        <VictoryBar
          data={statsData}
          x="category"
          y="count"
          style={{
            data: { fill: "purple", width: 20 },
          }}
        />
      </VictoryChart>
    </View>
  );
}

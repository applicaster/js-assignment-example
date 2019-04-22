// @flow
import * as React from "react";
import { View, Text, Button } from "react-native";

import { IntervalContext } from "../Contexts/IntervalContext";

type Props = {
  reloadPhotos: any => Promise<any>,
  toggleInterval: any => void,
};

const spacerStyles = {
  margin: 12,
};

const textStyle = {
  ...spacerStyles,
  height: 36,
  paddingHorizontal: 24,
  backgroundColor: "darkgray",
  color: "white",
  fontSize: 24,
  lineHeight: 36,
  alignItems: "center",
};

const styles = {
  flex: 1,
  marginTop: 24,
  height: 60,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
};

function setIntervalFrequency(
  {
    frequency,
    setFrequency,
  }: { frequency: number, setFrequency: (?number) => void },
  increment: number
): () => void {
  const newFrequency = frequency + increment;

  return function(): void {
    if (newFrequency < 1) {
      // eslint-disable-next-line no-console
      console.warn("you shouldn't use a frequency lower than 1s");
      return;
    }

    return setFrequency(newFrequency);
  };
}

export function Controls({ reloadPhotos, toggleInterval }: Props) {
  return (
    <IntervalContext.Consumer>
      {({ frequency, setFrequency }) => (
        <View style={styles}>
          <Button title="reload photps" onPress={() => reloadPhotos()} />
          <Button
            title="-"
            onPress={setIntervalFrequency({ frequency, setFrequency }, -1)}
          />
          <Text style={textStyle}>Interval: {frequency}s</Text>
          <Button
            title="+"
            onPress={setIntervalFrequency({ frequency, setFrequency }, 1)}
          />
          <Button
            title="toggle auto refresh"
            onPress={() => toggleInterval()}
          />
        </View>
      )}
    </IntervalContext.Consumer>
  );
}

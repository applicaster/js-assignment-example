import * as React from "react";
import { View, Button } from "react-native";

import { ImageSizeContext } from "../Contexts/ImageSizeContext";

const SIZES = ["thumb", "small", "regular", "full"];

const styles = {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
};

const selectedColor = "#27DA86";
const defaultColor = "#2196F3";

export function SizeSelector() {
  return (
    <ImageSizeContext.Consumer>
      {({ imageSize, setImageSize }) => (
        <View style={styles}>
          {SIZES.map((size, key) => (
            <Button
              key={key}
              title={size}
              onPress={() => setImageSize(size)}
              color={size === imageSize ? selectedColor : defaultColor}
            />
          ))}
        </View>
      )}
    </ImageSizeContext.Consumer>
  );
}

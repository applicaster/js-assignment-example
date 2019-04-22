import * as React from "react";
import * as R from "ramda";
import { View, Image } from "react-native";
import { hot } from "react-hot-loader";

import { ImageContext } from "./Contexts/ImageContext";
import { ImageSizeContext } from "./Contexts/ImageSizeContext";
import { IntervalContext } from "./Contexts/IntervalContext";
import { ErrorBoundary } from "./Components/ErrorBoundary";
import { RandomImage } from "./Components/RandomImage";

const styles = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

const imageStyles = {
  marginTop: 48,
  width: 300,
  height: 51,
};

function App() {
  return (
    <View style={styles}>
      <Image
        source={{ uri: "/assets/applicaster_logo.png" }}
        style={imageStyles}
      />
      <ErrorBoundary>
        <RandomImage />
      </ErrorBoundary>
    </View>
  );
}

export default R.compose(
  ImageContext.withProvider,
  IntervalContext.withProvider,
  ImageSizeContext.withProvider,
  hot(module)
)(App);

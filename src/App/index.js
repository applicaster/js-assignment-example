import * as React from "react";
import { View, Text } from "react-native";

import { hot } from "react-hot-loader";

const styles = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

class App extends React.Component {
  render() {
    return (
      <View style={styles}>
        <Text>I'm a react App ! with hot-reloading \o/</Text>
      </View>
    );
  }
}

export default hot(module)(App);

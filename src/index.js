import { AppRegistry } from "react-native";
import "./main.css";

import App from "./App";

import { name, mountNode } from "../app.json";

AppRegistry.registerComponent(name, () => App);

function runApp() {
  AppRegistry.runApplication(name, {
    rootTag: document.getElementById(mountNode),
  });
}

runApp();

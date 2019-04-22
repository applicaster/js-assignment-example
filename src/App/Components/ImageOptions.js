// @flow
import * as React from "react";
import { View, Text } from "react-native";

import { Controls } from "./Controls";
// import { UserDisplay } from "./UserDisplay";
import { SizeSelector } from "./SizeSelector";

type Props = {
  label: string,
  user: {},
  reloadPhotos: any => Promise<any>,
  toggleInterval: any => void,
};

const containerStyles = {
  alignSelf: "stretch",
};

const textStyles = {
  marginVertical: 24,
  fontSize: 36,
  lineHeight: 36,
  alignItems: "center",
  textAlign: "center",
};

export function ImageOptions({
  label,
  user,
  reloadPhotos,
  toggleInterval,
}: Props) {
  return (
    <View style={containerStyles}>
      <Text style={textStyles}>{label}</Text>
      <SizeSelector />
      {/* <UserDisplay user={user} /> */}
      <Controls reloadPhotos={reloadPhotos} toggleInterval={toggleInterval} />
    </View>
  );
}

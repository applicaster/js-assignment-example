// @flow
/* global location */
import * as React from "react";
import { View, Text, Button, Image } from "react-native";

type Props = {
  error: {
    message: string,
    [string]: any,
  },
  info: ?{},
};

const sheldon_horror =
  // eslint-disable-next-line max-len
  "https://images.ecosia.org/zo0qIEjze4Bw3L5089v3HwrR9p4=/0x390/smart/http%3A%2F%2Fmedia.tumblr.com%2Ftumblr_mbg6zdDXqy1r79k9c.gif";

const styles = {
  flex: 1,
  alignItems: "center",
  justifyContent: "space-around",
};

const messageStyles = {
  alignItems: "center",
};

const textStyles = {
  margin: 12,
};

const titleStyle = {
  ...textStyles,
  fontSize: 48,
};

const imageStyles = {
  width: 435,
  height: 285,
  margin: 48,
};

function probableError(errorMessage: string): string {
  if (errorMessage.includes("403")) {
    return "Maybe you've hit the API limit, or your API key is invalid ?";
  }

  if (errorMessage.includes("401")) {
    return "Is your UNSPLASH_API_KEY defined and valid ?";
  }

  if (errorMessage.includes("404")) {
    return "It looks like you're looking for something that doesn't exist";
  }

  return "Not sure what happend, but you can try to reload the page";
}

export function ErrorDisplay({ error, info }: Props) {
  return (
    <View style={styles}>
      <Text style={titleStyle}>oh no {"\u{1F631}"} !</Text>
      <Image style={imageStyles} source={{ uri: sheldon_horror }} />
      <View style={messageStyles}>
        <Text style={textStyles}>Something went wrong: {error.message}</Text>
        <Text style={textStyles}>{probableError(error.message)}</Text>
      </View>
      <Button
        title="reload the page"
        size="big"
        onPress={() => location.reload()}
      />
    </View>
  );
}

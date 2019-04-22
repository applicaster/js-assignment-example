// @flow
import * as React from "react";
import * as R from "ramda";
import { View, Image } from "react-native";

import { withImageLoader } from "./ImageLoader";
import { withImageSelector } from "./ImageSelector";
import { ImageSizeContext } from "../Contexts/ImageSizeContext";
import { IntervalContext } from "../Contexts/IntervalContext";
import { ImageOptions } from "./ImageOptions";

type Props = {
  frequency: number,
  selectNextImage: () => void,
  loadRandomPhotos: () => Promise<any>,
  image: {
    width: number,
    height: number,
    urls: [{}],
    alt_description: string,
    user: {},
  },
};

const containerStyles = {
  flex: 1,
  padding: 48,
  alignSelf: "stretch",
  alignItems: "center",
  justifyContent: "center",
};

const imageContainer = {
  flex: 1,
  alignSelf: "stretch",
  justifyContent: "center",
  alignItems: "center",
};

function widthFromImageSize(imageSize, aspectRatio) {
  if (imageSize === "full") {
    return null;
  }

  const baseWidthsPerSize = {
    thumb: 200,
    small: 400,
    regular: 1080,
  };

  return baseWidthsPerSize[imageSize];
}

class RandomImageComponent extends React.Component<Props> {
  width: number;
  height: number;
  imageRefresh: ?any;
  onLayout: any => void;
  getImageStyles: any => {};
  setInterval: any => void;
  clearInterval: any => void;
  toggleInterval: any => void;
  reloadPhotos: any => Promise<any>;

  constructor(props) {
    super(props);
    this.onLayout = this.onLayout.bind(this);
    this.getImageStyles = this.getImageStyles.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
    this.toggleInterval = this.toggleInterval.bind(this);
    this.reloadPhotos = this.reloadPhotos.bind(this);
    this.imageRefresh = null;
  }

  componentDidMount() {
    this.setInterval();
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  componentDidUpdate(prevProps) {
    if (!R.eqProps("frequency", prevProps, this.props)) {
      this.setInterval(true);
    }
  }

  setInterval(immediate = false) {
    const { frequency, selectNextImage } = this.props;

    immediate && selectNextImage();

    this.clearInterval();

    this.imageRefresh = setInterval(selectNextImage, frequency * 1000);
  }

  clearInterval() {
    if (this.imageRefresh) {
      clearInterval(this.imageRefresh);
      this.imageRefresh = null;
    }
  }

  toggleInterval() {
    this.imageRefresh ? this.clearInterval() : this.setInterval(true);
  }

  reloadPhotos() {
    const { loadRandomPhotos } = this.props;
    loadRandomPhotos().then(this.setInterval);
  }

  getImageStyles(imageSize) {
    const {
      image: { width, height },
    } = this.props;

    const aspectRatio = height / width;
    const adjustedWidth = widthFromImageSize(imageSize, aspectRatio);

    return {
      aspectRatio,
      maxWidth: this.width,
      maxHeight: this.height,
      width: adjustedWidth || width,
      height: (adjustedWidth || width) * aspectRatio,
    };
  }

  onLayout({ nativeEvent }) {
    const {
      layout: { width, height },
    } = nativeEvent;

    this.width = width;
    this.height = height;
  }

  render() {
    const { image } = this.props;
    const { urls, alt_description, user } = image;

    return (
      <View style={containerStyles}>
        <View style={imageContainer} onLayout={this.onLayout}>
          <ImageSizeContext.Consumer>
            {({ imageSize }) => (
              <Image
                source={{ uri: urls[imageSize] }}
                style={this.getImageStyles(imageSize)}
                resizeMode="center"
              />
            )}
          </ImageSizeContext.Consumer>
        </View>
        <ImageOptions
          label={alt_description}
          user={user}
          reloadPhotos={this.reloadPhotos}
          toggleInterval={this.toggleInterval}
        />
      </View>
    );
  }
}

export const RandomImage = R.compose(
  withImageLoader,
  withImageSelector,
  IntervalContext.withConsumer
)(RandomImageComponent);

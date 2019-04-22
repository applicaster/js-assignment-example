// @flow
import * as React from "react";
import * as R from "ramda";

import { ImageContext } from "../Contexts/ImageContext";

type ImageType = {
  width: number,
  height: number,
  urls: [{ [string]: string }],
  alt_description: string,
  user: { [string]: string },
};

type Props = {
  imageList: Array<ImageType>,
  setImage: ({}) => void,
  image: ImageType,
};

export function withImageSelector(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  class WrappedWithImageSelector extends React.Component<Props> {
    selectNextImage: () => void;

    constructor(props) {
      super(props);
      const { imageList, setImage } = this.props;

      R.compose(
        setImage,
        R.head
      )(imageList);

      this.selectNextImage = this.selectNextImage.bind(this);
    }

    selectNextImage() {
      const randomIndex = Math.round(Math.random() * 30);
      const { imageList, setImage } = this.props;

      const selectedImage = imageList[randomIndex];
      setImage(selectedImage || R.head(imageList));
    }

    render() {
      const { image } = this.props;

      return (
        image && (
          <Component
            image={image}
            selectNextImage={this.selectNextImage}
            {...this.props}
          />
        )
      );
    }
  }

  return ImageContext.withConsumer(WrappedWithImageSelector);
}

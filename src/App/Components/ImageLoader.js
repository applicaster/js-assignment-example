// @flow
import * as React from "react";

import { ImageContext } from "../Contexts/ImageContext";
import { getRandomPhoto } from "../api/unsplash";
import { Loader } from "./Loader";

type Props = {
  setImageList: (?[{}]) => void,
  imageList: [{}],
};

type State = {
  error: ?{},
};

export function withImageLoader(
  Component: React.ComponentType<any>
): React.ComponentType<any> {
  class WrappedWithImageLoader extends React.Component<Props, State> {
    loadRandomPhotos: any => Promise<any>;

    constructor(props) {
      super(props);

      this.state = { error: null };

      this.loadRandomPhotos = this.loadRandomPhotos.bind(this);
    }

    componentDidMount() {
      this.loadRandomPhotos();
    }

    async loadRandomPhotos() {
      try {
        const { setImageList } = this.props;
        setImageList(null);

        const images = await getRandomPhoto();
        setImageList(images);
      } catch (error) {
        this.setState({ error });
      }
    }

    render() {
      const { error } = this.state;
      const { imageList } = this.props;

      if (error) {
        throw error;
      }

      return imageList ? (
        <Component
          imageList={imageList}
          loadRandomPhotos={this.loadRandomPhotos}
          {...this.props}
        />
      ) : (
        <Loader />
      );
    }
  }

  return ImageContext.withConsumer(WrappedWithImageLoader);
}

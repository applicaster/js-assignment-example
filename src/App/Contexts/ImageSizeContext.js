import { createContext } from "react-context-creator";

const initialState = {
  imageSize: "regular",
};

export const ImageSizeContext = createContext(initialState);

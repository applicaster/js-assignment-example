import { createContext } from "react-context-creator";

const initialState = {
  image: null,
  imageList: null,
};

export const ImageContext = createContext(initialState);

import { createContext } from "react-context-creator";

const initialState = {
  frequency: 5,
};

export const IntervalContext = createContext(initialState);

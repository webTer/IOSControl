import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const scale = {
  width: (value: number) => (width * value) / 100,
  height: (value: number) => (height * value) / 100,
};

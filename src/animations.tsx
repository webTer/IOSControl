import { Animated } from "react-native";
import { scale } from "./utils";

export const defaultSize = scale.width(29);

export const Animations = {
  pressIn: (value: Animated.Value) =>
    Animated.timing(value, {
      toValue: 0.9,
      duration: 300,
      useNativeDriver: false,
    }),
  pressOut: (value: Animated.Value) =>
    Animated.timing(value, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }),
  fadeIn: (value: Animated.Value) =>
    Animated.timing(value, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }),
  fadeAway: (value: Animated.Value) =>
    Animated.timing(value, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }),
  expand: (size: Animated.ValueXY, top: Animated.Value) =>
    Animated.parallel([
      Animated.timing(size, {
        toValue: {
          x: scale.width(68),
          y: scale.height(50),
        },
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(top, {
        toValue: scale.height(8),
        duration: 300,
        useNativeDriver: false,
      }),
    ]),
  shrink: (size: Animated.ValueXY, top: Animated.Value) =>
    Animated.parallel([
      Animated.timing(size, {
        toValue: {
          x: defaultSize,
          y: defaultSize,
        },
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(top, {
        toValue: scale.height(0),
        duration: 300,
        useNativeDriver: false,
      }),
    ]),
};

import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native";

import { Animations, defaultSize } from "./animations";
import Item from "./Item";

interface Props {
  style?: ViewStyle;
  type: "left" | "right";
  onExpandStart: (type: "left" | "right") => void;
  onExpandEnd: (type: "left" | "right") => void;
}

interface State {
  expanded: boolean;
  animationInProgress: boolean;
  showExtraItems: boolean;
}

class Block extends React.Component<Props, State> {
  private size: Animated.ValueXY;
  private press: Animated.Value;
  private top: Animated.Value;
  private opacity: Animated.Value;

  private pressInAnimation: Animated.CompositeAnimation;
  private pressOutAnimation: Animated.CompositeAnimation;
  private fadeInAnimation: Animated.CompositeAnimation;
  private fadeAwayAnimation: Animated.CompositeAnimation;
  private expandAnimation: Animated.CompositeAnimation;
  private shrinkAnimation: Animated.CompositeAnimation;

  constructor(props: Props) {
    super(props);

    this.size = new Animated.ValueXY({ x: defaultSize, y: defaultSize });
    this.press = new Animated.Value(1);
    this.top = new Animated.Value(0);
    this.opacity = new Animated.Value(1);

    this.pressInAnimation = Animations.pressIn(this.press);
    this.pressOutAnimation = Animations.pressOut(this.press);
    this.fadeInAnimation = Animations.fadeIn(this.opacity);
    this.fadeAwayAnimation = Animations.fadeAway(this.opacity);
    this.expandAnimation = Animations.expand(this.size, this.top);
    this.shrinkAnimation = Animations.shrink(this.size, this.top);

    this.state = {
      expanded: false,
      animationInProgress: false,
      showExtraItems: false,
    };
  }

  render() {
    const { style, type } = this.props;
    return (
      <Animated.View
        style={[
          styles.block,
          {
            width: this.size.x,
            height: this.size.y,
            marginTop: this.top,
            opacity: this.opacity,
            transform: [{ scale: this.press }],
          },
          type == "left"
            ? {
                left: 0,
              }
            : {
                right: 0,
              },
        ]}
      >
        <TouchableOpacity
          style={[styles.touchable, style]}
          onPressIn={() => this.pressIn()}
          onPressOut={() => this.pressOut()}
          delayLongPress={300}
          activeOpacity={1}
        >
          {type === "left" && (
            <>
              <View style={styles.row}>
                <Item color={"red"} />
                <Item color={"green"} />
              </View>
              <View style={styles.row}>
                <Item color={"blue"} />
                <Item color={"yellow"} />
              </View>
              {this.state.showExtraItems && (
                <View style={styles.row}>
                  <Item color={"orange"} />
                  <Item color={"white"} />
                </View>
              )}
            </>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }

  expand() {
    const { onExpandStart, type } = this.props;
    this.expandAnimation.start(() => {
      this.setState({ animationInProgress: false, expanded: true });
    });

    this.setState({ animationInProgress: true });
    this.showExtraItems(true);

    onExpandStart(type);
  }

  shrink() {
    const { onExpandEnd, type } = this.props;

    this.shrinkAnimation.start(() => {
      this.setState({ animationInProgress: false, expanded: false });
    });

    this.setState({ animationInProgress: true });
    this.showExtraItems(false);

    onExpandEnd(type);
  }

  pressIn() {
    if (this.state.expanded || this.state.animationInProgress) return;

    this.pressInAnimation.start(({ finished }) => {
      if (finished) {
        this.expand();
      }

      this.pressOutAnimation.start();
      this.setState({ animationInProgress: false });
    });

    this.setState({ animationInProgress: true });
  }

  pressOut() {
    this.pressInAnimation.stop();
    if (this.state.expanded || this.state.animationInProgress) return;
    this.pressOutAnimation.start(() => {
      this.setState({ animationInProgress: false });
    });

    this.setState({ animationInProgress: true });
  }

  fadeAway() {
    this.fadeAwayAnimation.start();
  }

  fadeIn() {
    this.fadeInAnimation.start();
  }

  showExtraItems(value: boolean) {
    setTimeout(() => this.setState({ showExtraItems: value }), 150);
  }

  get expanded() {
    return this.state.expanded;
  }
}

const styles = StyleSheet.create({
  block: {
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 2,
    position: "absolute",
  },
  touchable: {
    width: "100%",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Block;

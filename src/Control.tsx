import React, { Component } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Block from "./Block";
import { scale } from "./utils";

interface Props {}

class Control extends Component<Props> {
  private left: Block | null;
  private right: Block | null;

  constructor(props: Props) {
    super(props);

    this.left = null;
    this.right = null;
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={() => this.close()}
        style={styles.touchable}
      >
        <View style={styles.content}>
          <View style={styles.row}>
            <Block
              ref={(ref) => (this.left = ref)}
              style={styles.block}
              type={"left"}
              onExpandEnd={(type) => this.expandEnd(type)}
              onExpandStart={(type) => this.expandStart(type)}
            />
            <Block
              ref={(ref) => (this.right = ref)}
              style={styles.block}
              type={"right"}
              onExpandEnd={(type) => this.expandEnd(type)}
              onExpandStart={(type) => this.expandStart(type)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  expandStart(type: "left" | "right") {
    if (type === "left") {
      this.right?.fadeAway();
    } else {
      this.left?.fadeAway();
    }
  }

  expandEnd(type: "left" | "right") {
    if (type === "left") {
      this.right?.fadeIn();
    } else {
      this.left?.fadeIn();
    }
  }

  close() {
    if (this.left?.expanded) {
      this.left?.shrink();
      this.right?.fadeIn();
    }

    if (this.right?.expanded) {
      this.right?.shrink();
      this.left?.fadeIn();
    }
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: "15%",
    paddingHorizontal: scale.width(16),
    zIndex: 1,
  },
  touchable: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  block: {
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Control;

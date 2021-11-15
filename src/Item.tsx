import React, { Component } from "react";
import { ColorValue, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Props {
  color: ColorValue;
}

interface State {
  selected: boolean;
}

class Item extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    const { color } = this.props;
    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: color }]}
        onPress={() => this.select()}
      >
        <Text style={styles.text}>{this.state.selected ? "+" : "-"}</Text>
      </TouchableOpacity>
    );
  }

  select() {
    this.setState({ selected: !this.state.selected });
  }
}

const styles = StyleSheet.create({
  item: {
    width: 40,
    height: 40,
    borderRadius: 20,
    zIndex: 3,

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default Item;

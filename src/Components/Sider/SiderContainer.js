import React, { Component } from "react";
import SiderPresenter from "./SiderPresenter";

class SiderContainer extends Component {
  static propTypes = {};
  state = {};

  render() {
    return <SiderPresenter {...this.props} />;
  }
}

export default SiderContainer;

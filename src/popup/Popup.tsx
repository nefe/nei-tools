import * as React from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import MarkDown from "./MarkDown";

class Props {
  tab: chrome.tabs.Tab | { url: "" } = { url: "" };
  pageInfo? = "";
  handleClick? = () => {};
}

export default class Popup extends React.Component<Props, any> {
  static defaultProps = new Props();
  render() {
    return (
      <>
        <Header title={chrome.i18n.getMessage("popTitle")} />
        <div className="pop-content">
          {this.props.pageInfo}
          <MarkDown
            url={this.props.tab.url}
            handleClick={this.props.handleClick}
          />
        </div>
        <Footer />
      </>
    );
  }
}

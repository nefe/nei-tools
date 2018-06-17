import * as React from "react";
import Footer from "../layout/Footer";
import MarkDown from "./MarkDown";

class Props {
  tab: chrome.tabs.Tab | { url: "" } = { url: "" };
}

export default class Popup extends React.Component<Props, any> {
  static defaultProps = new Props();
  componentDidMount() {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }

  render() {
    return (
      <>
        <header>
          <h1>{chrome.i18n.getMessage("popTitle")}</h1>
        </header>
        <MarkDown url={this.props.tab.url} />
        <footer>
          <Footer />
        </footer>
      </>
    );
  }
}

import * as marked from "marked";
import * as React from "react";
import { defaultSourceUrl } from "../consts";
import { parseUrl } from "../utils";

class Props {
  /** 当前的url */
  url = "";
  /** 点击链接回调 */
  handleClick? = () => {};
}

class MarkDown extends React.Component<Props, any> {
  static defaultProps = new Props();
  state = {
    url: this.props.url,
    /** Markdown 格式字符串 */
    content: ""
  };
  loadMarkdown = () => {
    const url = localStorage.getItem("source_url") || defaultSourceUrl;
    const myRequest = new Request(url);
    const self = this;
    const errorMessage = chrome.i18n.getMessage("errorMessage");
    fetch(myRequest, { mode: "cors" })
      .then(function(response) {
        if (!response.ok) {
          this.setState({ content: chrome.i18n.getMessage("loading") });
          return errorMessage;
        }
        return response.text();
      })
      .then(function(response) {
        // 按 markdown 格式解析
        self.setState({ content: marked(response) });
      })
      .catch(err => {
        // 错误处理
        self.setState({ content: errorMessage });
      });
  };

  componentDidMount() {
    this.loadMarkdown();
    document
      .querySelector(".markdown-container")
      .addEventListener("click", this.handleClick);
  }

  handleClick = event => {
    const url = event.target.getAttribute("href");
    // 切换环境
    if (url && url.startsWith("http")) {
      chrome.tabs.update({
        url,
        active: true,
        selected: true
      });
      this.props.handleClick();
    } else if (url && url.startsWith("dingtalk")) {
      chrome.tabs.create({
        url,
        active: false,
        selected: false
      });
    }
    this.setState({ url });
  };

  render() {
    const { content, url } = this.state;
    const prefix = `${parseUrl(url, "scheme")}://${parseUrl(url, "host")}`;
    // 高亮当前访问地址
    const html = content.replace(
      `href="${prefix}`,
      `class="tag" href="${prefix}`
    );
    return (
      <div
        className="markdown-container"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}

export default MarkDown;

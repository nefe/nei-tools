import * as React from "react";
import * as ReactDOM from "react-dom";
import Popup from "./Popup";
import "./Popup.scss";

document.title = chrome.i18n.getMessage("name");
// 当前打开的选项卡
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const tab = tabs.find(item => item.active);
  ReactDOM.render(<Popup tab={tab} />, document.getElementById("popup"));
});

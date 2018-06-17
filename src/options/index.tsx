import * as React from "react";
import * as ReactDOM from "react-dom";
import OptionsForm from "./OptionsForm";

document.title = chrome.i18n.getMessage("optionsTitle");
// 当前打开的选项卡
chrome.tabs.getCurrent(tab => {
  ReactDOM.render(<OptionsForm />, document.getElementById("app-root"));
});

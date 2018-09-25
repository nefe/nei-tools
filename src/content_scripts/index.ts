import { requestEnum, actionEnum } from './../consts';
import { insertScript } from "../utils";

/** 监听 popup 页指令消息 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  try {
    request.action === actionEnum.copy && insertScript("js/info.js");
  } catch (ex) {
    console.log("insertScript Fail:", ex.message);
    chrome.runtime.sendMessage({ type: requestEnum.type, text: "" });
  }
});

/** 监听 DEBUG_INFO 消息，并把 pageInfo 传给 popup */
window.addEventListener(
  "message",
  function(event) {
    event.data.type &&
      event.data.type == requestEnum.type &&
      chrome.runtime.sendMessage(event.data);
  },
  false
);

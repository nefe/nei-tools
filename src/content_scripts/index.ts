import { insertScript } from "../utils";

/** 监听 popup 页指令消息 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  request.action === "copy" && insertScript("js/inject.js");
});

/** 监听 inject 的消息，并把 pageInfo 传给 popup */
window.addEventListener(
  "message",
  function(event) {
    event.data.type &&
      event.data.type == "FROM_PAGE" &&
      chrome.runtime.sendMessage(event.data);
  },
  false
);

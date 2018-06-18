import { pageInfoEnum, requestEnum } from "../consts";

(function(win, doc) {
  win.postMessage(
    { type: requestEnum.type, text: win[pageInfoEnum.debug] },
    "*"
  );
})(window, document);

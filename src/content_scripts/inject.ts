(function(win, doc) {
  win.postMessage({ type: "FROM_PAGE", text: win["DEBUG_INFO"] }, "*");
})(window, document);

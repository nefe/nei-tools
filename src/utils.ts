/** 解析 URL */
export function parseUrl(
  // url 字符串
  url: string,
  // 目标字段
  field:
    | "url"
    | "scheme"
    | "slash"
    | "host"
    | "port"
    | "path"
    | "query"
    | "hash"
) {
  const parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  const result = parse_url.exec(url) || [];
  const index = [
    "url",
    "scheme",
    "slash",
    "host",
    "port",
    "path",
    "query",
    "hash"
  ].indexOf(field);
  return result[index];
}

/** 向页面插入JS */
export function insertScript(jsPath) {
  jsPath = jsPath || "js/info.js";
  const temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function() {
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(temp);
}

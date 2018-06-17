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

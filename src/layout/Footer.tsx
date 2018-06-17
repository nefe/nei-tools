import * as React from "react";
import { authorLink } from "../consts";

export default function Footer() {
  return (
    <>
      © {new Date().getFullYear()}
      <a href={authorLink} target="_blank">
        {chrome.i18n.getMessage("author")}
      </a>
    </>
  );
}

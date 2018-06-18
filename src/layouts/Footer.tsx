import * as React from "react";
import { authorLink } from "../consts";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer>
      © {new Date().getFullYear()}
      <a href={authorLink} target="_blank">
        {chrome.i18n.getMessage("author")}
      </a>
    </footer>
  );
}

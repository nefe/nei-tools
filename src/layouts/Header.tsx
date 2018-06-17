import * as React from "react";
import "./Header.scss";

interface Props {
  // 标题
  title: React.ReactNode;
}

export default function Header(props: Props) {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

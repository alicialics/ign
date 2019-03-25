import React from "react";
import { Nav } from "reactstrap";
import { FiPlay } from "react-icons/fi";
import { FaRegCheckCircle, FaRegFileAlt } from "react-icons/fa";
import { LATEST, VIDEOS, ARTICLES } from "../constants";
import { SideBarItem } from "./";

export function SideBar(props) {
  const { onChange, activeMode } = props;
  return (
    <Nav vertical>
      <SideBarItem
        activeMode={activeMode}
        mode={LATEST}
        icon={FaRegCheckCircle}
        onChange={onChange}
      />
      <SideBarItem
        activeMode={activeMode}
        mode={VIDEOS}
        icon={FiPlay}
        onChange={onChange}
      />
      <SideBarItem
        activeMode={activeMode}
        mode={ARTICLES}
        icon={FaRegFileAlt}
        onChange={onChange}
      />
    </Nav>
  );
}

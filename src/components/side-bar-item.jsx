import React from "react";
import { ListGroupItem } from "reactstrap";

export function SideBarItem(props) {
  const { mode, activeMode, icon: Icon, onChange } = props;
  return (
    <ListGroupItem active={activeMode === mode} onClick={() => onChange(mode)}>
      <h1>
        <Icon className="mr-4" />
        <small>{mode}</small>
      </h1>
    </ListGroupItem>
  );
}

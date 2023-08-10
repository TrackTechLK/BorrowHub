import React from "react";
import "./Compose.css";
import ToolbarButton from "../ToolbarButton";
import SendIcon from "@mui/icons-material/Send";
export default function Compose(props) {
  return (
    <div className="compose">
      <input
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
      />

      {props.rightItems}
    </div>
  );
}

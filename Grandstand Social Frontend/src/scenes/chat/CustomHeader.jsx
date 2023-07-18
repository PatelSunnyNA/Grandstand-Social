import React from "react";

const CustomerHeader = ({ chat }) => {
  return (
    <div className="chat-header">
      <div className="flexbetween">
        <h3 className="header-text">{chat.title}</h3>
      </div>
      <div className="flexbetween">
        {chat.description !== "⬅️ ⬅️ ⬅️" ? (
          <p className="header-text">{chat.description}</p>
        ) : (
          <p className="header-text">no chat selected</p>
        )}
      </div>
    </div>
  );
};

export default CustomerHeader;
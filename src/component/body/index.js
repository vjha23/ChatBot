import React, { useState, useEffect, useRef } from "react";
import "../../css/body.scss";
import { connect } from "react-redux";
import { FaRobot } from "react-icons/fa";

function Body(props) {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [props.messages]);
  useEffect(() => {
    console.log(props.messages, "props");
  }, [props.messages]);
  return (
    <div className="body text-content">
      {props.messages &&
        props.messages.map((data, index) => {
          console.log(data, "data bot");
          return (
            <div className="botMessageContainer">
              {data.who === "user" && (
                <div className="userMessage">
                    {console.log(data.content.text.text[0])}
                  <p>{data.content.text.text}</p>
                </div>
              )}
              {data.who === "bot" && (
                <div
                  style={{
                    display: "flex",
                 
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "1.8rem" }}>
                    <FaRobot />
                  </div>
                  <div style={{ marginLeft: "1.1rem" }}>
                    <p>{data.content.text.text[0]}</p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          );
        })}
    </div>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps, null)(Body);

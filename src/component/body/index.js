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
          return (
            <div className="botMessageContainer">
              {data.who === "user" && (
                <div className="userMessage">
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
                  {data.content.text && (
                    <div
                      style={{ marginLeft: "1.1rem" }}
                      className="botMessage"
                    >
                      <p>{data.content.text.text[0]}</p>
                    </div>
                  )}
                  {data.content.payload && (
                    <div>
                      {data.content.payload.fields.card.listValue.values.map(
                        (data, index) => {
                          console.log(data.structValue.fields, "feilds");
                          return (
                            <div style={{width:'300px',height:'300px'}}>
                                <div style={{maxWidth:'100%',maxHeight:'100%'}}>
                                    <img src={data.structValue.fields.image.stringValue}/>
                                </div>
                                <div style={{marginTop:'1.2rem',fontWeight:'bold',fontSize:'1.6rem'}}><p>{data.structValue.fields.stack.stringValue}</p></div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
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

import React, { useState, useEffect, useRef } from "react";
import "../../css/body.scss";
import { connect } from "react-redux";
import { FaRobot } from "react-icons/fa";
import { BiLike, BiDislike } from "react-icons/bi";

function Body(props) {
  const messagesEndRef = useRef(null);
  const [activeLike, setActiveLike] = useState(false);
  const [activeDisLike, setActiveDisLike] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [props.messages]);
  useEffect(() => {
    console.log(props.messages, "props");
  }, [props.messages]);

  useEffect(() => {
    if (props.feedback === false) {
      setActiveDisLike(false);
      setActiveLike(false);
      const timeout = setTimeout(() => {
        props.setFeedback(true);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [props.feedback]);

  useEffect(() => {
    console.log(props.feedback, "feedback");
  }, [props.feedback]);
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
                    position: "relative",
                  }}
                >
                  <div style={{ fontSize: "1.8rem" }}>
                    <FaRobot />
                  </div>
                  {data.content.text && (
                    <>
                      <div
                        style={{ marginLeft: "1.1rem" }}
                        className="botMessage"
                      >
                        <p>{data.content.text.text[0]}</p>
                      </div>
                    </>
                  )}
                  {index === props.messages.length - 1 &&
                    index > 0 &&
                    props.feedback && (
                      <div className="feedbackContainer">
                        <BiLike
                          className={
                            activeLike
                              ? "activeFeedback feedbackIcons"
                              : "feedbackIcons"
                          }
                          onClick={() => {
                            setActiveDisLike(false);
                            setActiveLike(true);
                          }}
                        />
                        <BiDislike
                          className={
                            activeDisLike
                              ? "activeFeedback feedbackIcons"
                              : "feedbackIcons"
                          }
                          onClick={() => {
                            setActiveDisLike(true);
                            setActiveLike(false);
                          }}
                        />
                      </div>
                    )}
                  {data.content.payload && (
                    <div>
                      {data.content.payload.fields.card.listValue.values.map(
                        (data, index) => {
                          console.log(data.structValue.fields, "feilds");
                          return (
                            <div style={{ width: "300px", height: "300px" }}>
                              <div
                                style={{ maxWidth: "100%", maxHeight: "100%" }}
                              >
                                <img
                                  src={
                                    data.structValue.fields.image.stringValue
                                  }
                                />
                              </div>
                              <div
                                style={{
                                  marginTop: "1.2rem",
                                  fontWeight: "bold",
                                  fontSize: "1.6rem",
                                }}
                              >
                                <p>
                                  {data.structValue.fields.stack.stringValue}
                                </p>
                              </div>
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

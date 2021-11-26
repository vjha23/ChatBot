import React, { useState, useEffect } from "react";
import "./App.scss";
import { connect } from "react-redux";
import { eventQueryAction, textQueryAction,refreshMessage } from "./redux/action/index";
import Footer from "./component/footer";
import Header from "./component/header";
import Body from "./component/body";

function App(props) {
  const [feedback, setFeedback] = useState(false);
  const [togglebodyTransition, setToggleBodyTransition] = useState(true);
  useEffect(() => {
    props.eventQueryAction("welcometomywebsite");
  }, []);

  const handleSendMessage = (text) => {
    setFeedback(false)
    props.textQueryAction(text);
  };

  const handleBodyTransition = () => {
    setToggleBodyTransition(!togglebodyTransition);
  };

  const handleRefresh = () => {
    props.refreshMessage();
    props.eventQueryAction("welcometomywebsite");
  };

  return (
    <div className={togglebodyTransition ? "App" : "AppTransition"}>
      <div className="headerComponent">
        <Header
          handleBodyTransition={handleBodyTransition}
          handleRefresh={handleRefresh}
        />
      </div>
      {props.messages ? (
        <div className="bodyComponent">
          <Body feedback={feedback} setFeedback={setFeedback}/>

        </div>
      ) : (
        <div className='bodyComponent'>Please Wait...</div>
      )}

      <div className="footerComponent">
        <Footer handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispacthToProps = (dispatch) => {
  return {
    eventQueryAction: (payload) => dispatch(eventQueryAction(payload)),
    textQueryAction: (payload) => dispatch(textQueryAction(payload)),
    refreshMessage:()=>dispatch(refreshMessage())
  };
};

export default connect(mapStateToProps, mapDispacthToProps)(App);

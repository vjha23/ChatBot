import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector,connect } from "react-redux";
import {eventQueryAction,textQueryAction} from './redux/action/index'

function App(props) {
  const dispatch = useDispatch();
  // const messagesFromRedux = useSelector(state => state.message.messages)

  useEffect(()=>{
    props.eventQueryAction('hi')
    // props.textQueryAction('hi')
  })

  return <div className="App">hiii</div>;
}

const mapStateToProps = state => ({
  // Loading: state.task.loading
});

const mapDispacthToProps = dispatch => {
  return {
    eventQueryAction: (payload) => dispatch(eventQueryAction(payload)),
    textQueryAction:(payload)=>dispatch(textQueryAction(payload))    
  };

};

export default connect(mapStateToProps,mapDispacthToProps)(App);

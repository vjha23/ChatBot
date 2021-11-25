import Axios from "axios";

export const SAVE_MESSAGE = "save_message";
export const REFRESH_MESSAGE='refresh_message'


export function saveMessage(dataToSubmit) {
  return {
    type: SAVE_MESSAGE,
    payload: dataToSubmit,
  };
}

export function refreshMessage(){
  return{
    type:REFRESH_MESSAGE
  }
}

export const textQueryAction =  (text) => {
  let conversation = {
    who: "user",
    content: {
      text: {
        text: text,
      },
    },
  };
  return async(dispatch) => {
    dispatch(saveMessage(conversation));
    const textQueryVariables = {
      text,
    };
    try {
      const response = await Axios.post(
        "/api/dialogflow/textQuery",
        textQueryVariables
      );
      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: "bot",
          content: content,
        };
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };
};

export const eventQueryAction = (event) => {
  const eventQueryVariables = {
    event,
  };

  return async (dispatch) => {
    try {
      const response = await Axios.post(
        "/api/dialogflow/eventQuery",
        eventQueryVariables
      );
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content,
        };

        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };
};

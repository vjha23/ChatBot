import {
    SAVE_MESSAGE,
    REFRESH_MESSAGE
} from '../action';



export default function (state = {messages:[]}, action) {
    console.log(state,'state')
    switch (action.type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        case REFRESH_MESSAGE:
            return {
                messages:[]
               
            }
        default:
            return state;
    }
}
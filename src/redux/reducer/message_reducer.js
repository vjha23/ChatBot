import {
    SAVE_MESSAGE,
} from '../action';

export default function (state = {messages:[]}, action) {
    console.log(action,'action')
    switch (action.type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        default:
            return state;
    }
}
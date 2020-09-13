import { sendmsgtodb, getmsgfromdb } from "../actions/action-type"

const state = {
    messages: [],
}

const ChatReducer = (mState = clone(state), action) => {
    switch (action.type) {
        case getmsgfromdb:
            console.log("Data that get in:", action.payload)
            mState.messages = action.payload;
            return clone(mState);
        case sendmsgtodb:
            console.log("Data that send in:", action.payload)
            mState.messages.push(action.payload);
            return clone(mState);
        default:
            return clone(mState);
    }
}

export default ChatReducer;

const clone = (obj) => (JSON.parse(JSON.stringify(obj)));
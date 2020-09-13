import { addClient, loginClient, updateClient } from "../actions/action-type"

const state = {
    client:[],
    token: null
}

const clientReducer = (mState = clone(state), action) => {
    switch (action.type) {
        case addClient:
            mState.client = action.payload;
            return clone(mState);
        case loginClient:
                mState.client = action.payload.data;
                mState.token = "Bearer " + action.payload.token;
                return clone(mState);
        case updateClient:
                mState.client = action.payload.data;
                return clone(mState);
        default:
            return clone(mState);
    }
}

export default clientReducer;

const clone = (obj) => (JSON.parse(JSON.stringify(obj)));
import { sendOrderToDB, receiveOrderToDB, receiveOrderClientToDB } from "../actions/action-type"

const state = {
    orders: [],
    receivedOrders: []
}
const orderReducer = (mState = clone(state), action) => {
    switch (action.type) {
        case sendOrderToDB:
            mState.orders.push(action.payload);
            return clone(mState);
        case receiveOrderToDB:
            mState.orders = action.payload;
            return clone(mState);
        case receiveOrderClientToDB:
            mState.receivedOrders = action.payload;
            return clone(mState);
        default:
            return clone(mState);
    }
}

export default orderReducer;

const clone = (obj) => (JSON.parse(JSON.stringify(obj)));
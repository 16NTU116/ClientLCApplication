import {combineReducers} from "redux";
import posts from './post-reducer';
import clientUser from './client-reducer';
import chats from './chat-reducers';
import orders from './order-reducer';

const rootReducers = combineReducers({
    post: posts,
    user: clientUser,
    chat: chats,
    order: orders

});

export default rootReducers;
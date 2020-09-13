import { getpostsfromdb, addPostsToDB, searchpostsfromdb, getAssignedpostsfromdb } from "../actions/action-type"

const state = {
    posts: [],
    searchPost: [],
    assignedPosts: [],
}

const postReducer = (mState = clone(state), action) => {
    switch (action.type) {
        case getpostsfromdb:
            // console.log("here at post reducer: ", action.payload);
            mState.posts = action.payload;
            return clone(mState);
        case getAssignedpostsfromdb:
            // console.log("here at post reducer: ", action.payload);
            mState.assignedPosts = action.payload;
            return clone(mState);
        case addPostsToDB:
            mState.posts.push(action.payload);
            return clone(mState);
        case searchpostsfromdb:
            mState.searchPost = action.payload;
            return clone(mState);
        default:
            return clone(mState);
    }
}

export default postReducer;

const clone = (obj) => (JSON.parse(JSON.stringify(obj)));
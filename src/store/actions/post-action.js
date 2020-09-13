import { getpostsfromdb, addPostsToDB, searchpostsfromdb, getAssignedpostsfromdb } from "./action-type";
import { WEBSITE_URL } from '../helpers/misc';

export const getPosts = (id) => dispatch => {
    fetch(WEBSITE_URL + '/api/clientpost/me', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From User: ", res2);
            if (res2 !== null) {
                dispatch({ type: getpostsfromdb, payload: res2 })
            }
        }
        );
};

export const getAssignedPosts = (id) => dispatch => {
    fetch(WEBSITE_URL + '/api/clientpost/assigned', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(id)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From User: ", res2);
            if (res2 !== null) {
                dispatch({ type: getAssignedpostsfromdb, payload: res2 })
            }
        }
        );
};

export const sendPost = (data) => dispatch => {
    console.log("Dara is: ", data);
    fetch(WEBSITE_URL + '/api/clientpost', {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            if (res2.success == 0)
                return alert(res2.message);
            dispatch({ type: addPostsToDB, payload: res2.data })
        }
        );
};

export const searchPosts = (details) => dispatch => {
    fetch(WEBSITE_URL + '/api/clientpost/searchById', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From Search: ", res2);
            if (res2 !== null) {
                dispatch({ type: searchpostsfromdb, payload: res2 })
            }
        }
        );
};

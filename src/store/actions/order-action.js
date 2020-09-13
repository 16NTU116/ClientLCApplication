import { sendOrderToDB, receiveOrderToDB, receiveOrderClientToDB, sendOrderClientToDB } from "./action-type";
import { WEBSITE_URL } from '../helpers/misc.js';

export const sendOrder = (data) => dispatch => {
    fetch(WEBSITE_URL + '/api/order/', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Send Post To Order: ", res2);
            if(res2 !== null) {
                dispatch({ type: sendOrderToDB, payload: res2 })
            }
        }
        );
};

export const receiveOrder = (data) => dispatch => {
    console.log("SideMenu:  drawerApp::: ", data)
    fetch(WEBSITE_URL + '/api/order/receiveuser', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From Order User: ", res2);
            if(res2 !== null) {
                dispatch({ type: receiveOrderToDB, payload: res2 })
            }
        }
        );
};

export const receiveOrderClient = (data) => dispatch => {
    console.log("SideMenu:  drawerApp Client::: ", data)
    fetch(WEBSITE_URL + '/api/order/receiveclient', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From Order Client: ", res2);
            if(res2 !== null) {
                dispatch({ type: receiveOrderClientToDB, payload: res2 })
            }
        }
        );
};

export const sendstatus = (data) => dispatch => {
    fetch(WEBSITE_URL + '/api/order/status', {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Send Post To Order: ", res2);
            if(res2 !== null) {
                dispatch({ type: receiveOrderClientToDB, payload: res2 })
            }
        }
        );
};
import { getmsgfromdb, sendmsgtodb } from "./action-type";

import IO from 'socket.io-client';

import { WEBSITE_URL } from '../helpers/misc.js';

/** socket configurations */
const socket = IO.connect(`${WEBSITE_URL}`);
socket.on('connection', () => console.log('Connection'));

export const getPosts = () => dispatch => {
    fetch(WEBSITE_URL + '/api/clientpost/all', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }).
        then(res => res.json()).
        then(res2 => {
            console.log("Get Post From Client: ", res2);
            if (res2 !== null) {
                dispatch({ type: getpostsfromdb, payload: res2 })
            }
        }
        );
};

export const loadMessages = ({ name }) =>  dispatch => {
    // fetch(WEBSITE_URL + '/api/chat', {
    //     method: "POST",
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    // }).
    //     then(res => res.json()).
    //     then(res2 => {
    //         console.log("Chat from websocket: ", res2);
    //         if (res2 !== null) {
    //             dispatch({ type: getmsgfromdb, payload: res2 })
    //         }
    //     }
    //     );


    // if (socket != undefined) {
    //     console.log("Connection Established");

    //     socket.on('output', function (data) {
    //         console.log("Data on loadmessage is: ", data);

    //         dispatch({ type: sendmsgtodb, payload: data })
    //     })
    // }

    socket.on('outputstart', function (data) {
        console.log("Data on loadmessage 1 is: ", data);

        return dispatch({ type: getmsgfromdb, payload: data })
    })

    socket.on('output', function (data) {
        console.log("Data on loadmessage 2 is: ", data);

        return dispatch({ type: sendmsgtodb, payload: data })
    })
};

export const sendMessage = ({ name, msg, date, room }) => async dispatch => {
    if (!msg) return;
    socket.emit('input', { name, msg, date, room }, callback => {
    });
    // dispatch({ type: sendmsgtodb, payload: res2 })
};
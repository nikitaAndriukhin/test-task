import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import { getUsersRequest } from '../actions/usersActions';
const Result = (props) => {
    const dispatch = useDispatch()
    const [userId, setId] = useState()
    let his = useHistory();

    const userSelect = useSelector(state => state.users.items);

    const functionHandler = (data) => {
        props.passChildData(data);
    };

    useEffect(() => {
        setId(his.location.pathname.split('=')[1])
        if (userId) {
            dispatch(getUsersRequest(userId))
        }
    }, [userId])

    useEffect(() => { 
        functionHandler(userSelect.color) 
    }, [])

    return (
        <div>
            <p className="text-desc">Welcome, <b>{userSelect.username}</b>! Here is your favourite color, <b>{userSelect.color}</b>, displayed on our site. </p>
            <br/>
            <p className="text-desc">Thanks for joining</p>
        </div>
    )
}

export default Result
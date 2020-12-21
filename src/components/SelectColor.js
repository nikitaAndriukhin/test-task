import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auto from './Auto'
import { useHistory, Redirect } from "react-router-dom";

import history from '../history';
import { getUsersRequest, setColorRequest } from '../actions/usersActions';

const SelectColor = (props) => {
    const dispatch = useDispatch()
    const [userId, setId] = useState()
    const [userColor, setColor] = useState()
    const [url, setUrl] = useState('')

    let his = useHistory();
    const userSelect = useSelector(state => state.users.items.username);

    useEffect(() => {
        history.listen(({ location, action }) => {
            setUrl(location.pathname)
        });
    }, [history])
    const functionHandler = (data) => {
        props.passChildData(data);
    }
    useEffect(() => { 
        functionHandler('grey') 
    }, [])

    useEffect(() => {
        setId(his.location.pathname.split('=')[1])
        console.log(his.location.pathname.split('=')[1])
        if (userId) {
            dispatch(getUsersRequest(userId))
        }
    }, [userId])
    const handleSubmit = () => {
        dispatch(setColorRequest(userId, userColor))
    };

    return (
        <div>
            {url ? <Redirect to={url} /> : null}
            <p className="text-desc">Welcome, {userSelect}! Our final step is finding out your favourite color</p>
            <form>
                <div className="input-wrapper">
                    <span>Color:</span>
                    <Auto passChildData={setColor} />
                </div>
                <button className="btn-next" type="button" color="primary" onClick={handleSubmit}>Next</button>
            </form>
        </div>
    )
}

export default SelectColor
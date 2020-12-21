
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import history from '../history';
import { Redirect } from "react-router-dom";
import { createUserRequest } from '../actions/usersActions';

const SelectUser = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        history.listen(({ location, action }) => {
            setUrl(location.pathname)
        });
    }, [history])
    const handleSubmit = () => {
        dispatch(createUserRequest(name))
    };

    const onHandleChange = e => {
        setName(e.target.value);
    };
    return (
        <div>
            {url ? <Redirect to={url} /> : null}
            <form>
                <p className="text-desc">Hi there! Welcome to the site, please tell us about yourself!</p>
                <div className="input-wrapper">
                    <span>Name:</span>
                    <input className="input-user" type="text" onChange={onHandleChange} />
                </div>
                <button className="btn-next" type="button" color="primary" onClick={handleSubmit}>Next</button>
            </form>
        </div>
    )
}

export default SelectUser
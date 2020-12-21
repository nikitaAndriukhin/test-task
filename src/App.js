import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SelectUser from './components/SelectUser';
import SelectColor from './components/SelectColor';
import Result from './components/Result';

import { Switch, Route } from 'react-router-dom'
const pathname = window.location.pathname
const App = () => {
  const [childData, setChildData] = useState('grey');
  const data = useSelector(state => state.users.items.color)

  return (
    <div style={{ backgroundColor: childData }} className="main">
      <h1>Social Media Fake Site</h1>
      <Switch>
        <Route exact path="/" component={SelectUser} />
        <Route path="/example-page2/user=:id" component={() => (<SelectColor passChildData={setChildData} />)} />
        <Route path="/example-page3/user=:id" component={() => (<Result passChildData={setChildData} />)} />
      </Switch>
    </div>
  );
}

export default App;
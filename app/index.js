import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import Layout from './components/Layout';
import Timer from './components/Timer';
import Settings from './components/Settings';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRedirect to="/fortime" />
            <Route path="/fortime" component={Timer} />
            <Route path="/amrap" component={Timer} />
            <Route path="/tabata" component={Timer} />
            <Route path="/settings" component={Settings} />
        </Route>
    </Router>,
app);

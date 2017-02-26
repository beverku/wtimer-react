import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import Layout from './components/Layout';
import ForTimeTimer from './components/ForTimeTimer';
import AmrapTimer from './components/AmrapTimer';
import TabataTimer from './components/TabataTimer';
import Settings from './components/Settings';

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRedirect to="/fortime" />
            <Route path="/fortime" component={ForTimeTimer} />
            <Route path="/amrap" component={AmrapTimer} />
            <Route path="/tabata" component={TabataTimer} />
            <Route path="/settings" component={Settings} />
        </Route>
    </Router>,
app);

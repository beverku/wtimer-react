import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import { browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import HelloWorld from './HelloWorld';

// const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppContainer>
        <HelloWorld history={history} />
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./HelloWorld', () => {
        const NewHelloWorld = require('./HelloWorld').default;
        render(
            <AppContainer>
                <NewHelloWorld history={history} />
            </AppContainer>,
            document.getElementById('app')
        );
    });
}

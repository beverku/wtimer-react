import React from 'react';

import Footer from './Footer';
import Header from './Header';
import Timer from './Timer';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="layout">
                <Header />
                <Timer />
                <Footer />
            </div>
        );
    }
}

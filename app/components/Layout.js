import React from 'react';

import Footer from './Footer';
import Header from './Header';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap'

export default class Layout extends React.Component {
    render() {
        const bsStyle = "default";
        return (
            <div class="layout">
                <Header />
                <LinkContainer bsStyle={bsStyle} to="fortime"><Button>For Time</Button></LinkContainer>
                <LinkContainer bsStyle={bsStyle} to="amrap"><Button>AMRAP</Button></LinkContainer>
                <LinkContainer bsStyle={bsStyle} to="tabata"><Button>Tabata</Button></LinkContainer>
                <LinkContainer bsStyle={bsStyle} to="settings"><Button>Settings</Button></LinkContainer>
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

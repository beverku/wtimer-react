import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap'

export default class Timer extends React.Component {

    render() {
        return (
            <div>
                <Jumbotron>
                    <div class="container text-center">
                        <h1>00:00</h1>
                        <p>
                            <Button bsStyle="primary">3..2..1..Go</Button>
                            <Button bsStyle="primary">Stop</Button>
                            <Button bsStyle="primary">Reset</Button>
                        </p>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap'

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: null,
            end: null,
            time: '00:00',
            isStarted: false,
            isStopped: true,
        };
    }

    start() {
        console.log('start()')
        this.setState({
            start: Date.now(),
            end: null,
            isStarted: true,
            isStopped: false
        });
    }
    stop() {
        const end = Date.now()
        const elapsedTime = end - this.state.start;
        const displayTime = this.getDisplayTime(elapsedTime)

        this.setState({
            end: end,
            isStopped: true,
            time: displayTime,
        });
    }

    reset() {
        this.setState({
            start: null,
            end: null,
            time: '00:00',
            isStarted: false,
            isStopped: true,
        });
    }

    handleInput(e) {
        console.log(e);
        const time  = e.target.value;
        this.setState({time})
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            500
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        if (this.state.isStarted && !this.state.isStopped) {
            const elapsedTime = Date.now() - this.state.start;
            const displayTime = this.getDisplayTime(elapsedTime)

            this.setState({
                time: displayTime,
            });
        }
    }

    getDisplayTime(elapsedTime) {
        const hours = Math.floor( elapsedTime/ 3600000 );
        const minutes = Math.floor( elapsedTime/ 60000 ) % 60;
        const seconds = Math.floor( elapsedTime/ 1000 ) % 60;
        // const hundreths = Math.floor( elapsedTime/ 10 ) % 100;

        // Careful this breaks if number is bigger than the pad - but that can't happen here
        const sHours = ("0000" + hours).slice(-2);
        const sMinutes = ("0000" + minutes).slice(-2);
        const sSeconds = ("0000" + seconds).slice(-2);
        // const sHundreths = ("0000" + hundreths).slice(-2);
        // const sTenths = sHundreths % 10;

        let displayTime = '';
        if(hours >= 1) {
            displayTime = `${sHours}:`;
        }
        // displayTime += `${sMinutes}:${sSeconds}.${sHundreths}`;
        // displayTime += `${sMinutes}:${sSeconds}.${sTenths}`;
        displayTime += `${sMinutes}:${sSeconds}`;

        /* TODO - this may be a better way if we want to allow the user to tune the diplay
         displayTime.hours = hours;
         displayTime.minutes = (minutes < 10 ? `0${minutes}` : minutes) ;
         displayTime.seconds = (seconds < 10 ? `0${seconds}` : seconds) ;
         displayTime.hundreths = (hundreths < 10 ? `0${hundreths}` : hundreths) ;
         */
        return displayTime
    };

    // TODO: add start timer
    // TODO: grey out start while running?
    render() {
        return (
            <div>
                <Jumbotron>
                    <div class="container text-center">
                        <h1>{this.state.time}</h1>
                        <p>
                            <Button onClick={this.start.bind(this)} bsStyle="primary">3..2..1..Go</Button>
                            <Button onClick={this.stop.bind(this)} bsStyle="primary">Stop</Button>
                            <Button onClick={this.reset.bind(this)} bsStyle="primary">Reset</Button>
                        </p>
                        <p>
                            Temporary until remote key import is working:
                            <input value={this.state.time} onChange={this.handleInput.bind(this)} />
                        </p>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

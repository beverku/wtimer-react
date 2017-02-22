import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            start: null,
            end: null,
            time: '00:00',
            isCountdown: false,
            isStarted: false,
            isStopped: true,
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            100
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    start() {
        const start = Date.now();
        this.setState({
            start: start,
            end: null,
            inCountdown: true,
            isStarted: true,
            isStopped: false
        });
    }
    stop() {
        // already stopped
        if(this.state.isStopped) {
            return;
        }

        const end = Date.now();
        let elapsedTime;
        if(this.state.inCountdown) {
            elapsedTime = 0;
        } else {
            elapsedTime = end - this.state.start;
        }

        const displayTime = this.getDisplayTime(elapsedTime);
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
        const time  = e.target.value;
        this.setState({time});
    }

    // TODO: countdown as setting?
    tick() {
        if (this.state.inCountdown && !this.state.isStopped) {
            let elapsedTime = 10000 - (Date.now() - this.state.start);
            if(elapsedTime <= 0) {
                // Start real time
                const start = Date.now();
                this.setState({
                    inCountdown: false,
                    start: start,
                });
                elapsedTime = 0; // make sure it doesn't display negative
            }

            const displayTime = this.getDisplayTime(elapsedTime + 1000);
            this.setState({
                time: displayTime,
            });
        } else if (this.state.isStarted && !this.state.isStopped) {
            const elapsedTime = Date.now() - this.state.start;
            const displayTime = this.getDisplayTime(elapsedTime);

            this.setState({
                time: displayTime,
            });
        }
    }

    getDisplayTime(elapsedTime) {
        const hours = Math.floor( elapsedTime / 3600000 );
        const minutes = Math.floor( elapsedTime / 60000 ) % 60;
        const seconds = Math.floor( elapsedTime / 1000 ) % 60;
        // const hundreths = Math.floor( elapsedTime / 10 ) % 100;

        // Careful this breaks if number is bigger than the pad - but that can't happen here
        const sHours = ('0000' + hours).slice(-2);
        const sMinutes = ('0000' + minutes).slice(-2);
        const sSeconds = ('0000' + seconds).slice(-2);
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
        return displayTime;
    }

    // TODO:
    // header / footer info
    // other timers
    // settings
    // font
    render() {
        // Good enough for current usages
        // TODO: font-size setting?
        const headerStyle = {
            fontSize: '20vw'
        };
        return (
            <div>
                <Jumbotron>
                    <div class="container text-center">
                        <h1 style={headerStyle}>{this.state.time}</h1>
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

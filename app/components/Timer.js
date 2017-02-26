import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';


// TODO:
// other timers
// keyboard navigation
// settings
// Beep - Settings - On the minute (with spinner), Countdown(specify integers i.e. [3,2,1,0], Tabata, long beep on zero?
// font
// rounds with rest time? - or is that a tabata settings?
export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        // TODO - make sure this works
        if (this.getElapsedTime === undefined) {
            // or maybe test typeof this.method === "function"
            throw new TypeError('Must override getElapsedTime');
        }

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
        const countdownStart = this.getMsTime(this.state.time);
        this.setState({
            start: start,
            end: null,
            inCountdown: true,
            isStarted: true,
            isStopped: false,
            countdownStart: countdownStart
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
            elapsedTime = this.getElapsedTime(end);
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

    // TODO: same for now - but this should be disable on fortime
    handleInput(e) {
        const time  = e.target.value;
        this.setState({time});
    }

    // TODO: countdown as setting?
    getInitialCountdownElapsedTime(end) {
        const endTime = (typeof end !== 'undefined') ?  end : Date.now();

        const elapsedTime = 10000 - (endTime - this.state.start);
        //const elapsedTime = 3000 - (endTime - this.state.start);
        if(elapsedTime <= 0) {
            return 0; // make sure it doesn't display negative
        }
        return elapsedTime;
    }

    // different in elapsedTime in else if - probably same diff as end above
    // make this a function that needs to be provided
    // TODO: Document: After countdown it will actually display negative time - this allows to finish a workout with a time cap if desired
    tick() {
        if (this.state.inCountdown && !this.state.isStopped) {
            const elapsedTime = this.getInitialCountdownElapsedTime();
            if(elapsedTime <= 0) {
                // Start real time
                const start = Date.now();
                this.setState({
                    inCountdown: false,
                    start: start,
                });
            }

            const displayTime = this.getDisplayTime(elapsedTime, true);
            this.setState({
                time: displayTime,
            });
        } else if (this.state.isStarted && !this.state.isStopped) {
            const elapsedTime = this.getElapsedTime();
            const displayTime = this.getDisplayTime(elapsedTime);

            this.setState({
                time: displayTime,
            });
        }
    }

    getMsTime(time) {
        // TODO: if length is not two, or parts not POSITIVE integer - alert
        // TODO: help text for hours i.e. just convert it to minutes
        const timeComponents = time.split(':');
        const minutes = parseInt(timeComponents[0]);
        const seconds = parseInt(timeComponents[1]);
        const ms = (minutes * 60 * 1000) + (seconds * 1000);
        return ms;
    }


    getDisplayTime(_elapsedTime, countdown = false) {
        let elapsedTime = _elapsedTime;

        let negativeTime = false;
        if (elapsedTime < 0) {
            negativeTime = true;
        }

        // When counting up floor shows fully elapsed seconds / minutes etc.
        // When counting down ceiling shows fully elapsed seconds / minutes etc.
        let floorOrCeil = Math.floor;
        if(countdown) {
            floorOrCeil = Math.ceil;
        }

        // let hundreths = floorOrCeil( elapsedTime / 10 ) % 100;
        // elapsedTime -= hundreths * 1000;

        let seconds = floorOrCeil( elapsedTime / 1000 ) % 60;
        elapsedTime -= seconds * 1000;

        let minutes = floorOrCeil( elapsedTime / 60000 ) % 60;
        elapsedTime -= minutes * 60000;

        let hours = floorOrCeil( elapsedTime / 3600000 );
        // elapsedTime -= hours * 3600000;


        // hundreths = Math.abs(hundreths)
        seconds = Math.abs(seconds);
        minutes = Math.abs(minutes);
        hours = Math.abs(hours);


        // Careful this breaks if number is bigger than the pad - but that can't happen here
        const sHours = ('0000' + hours).slice(-2);
        const sMinutes = ('0000' + minutes).slice(-2);
        const sSeconds = ('0000' + seconds).slice(-2);
        // TODO: setting - tenths is just a different display of hundreths caluculation
        // const sHundreths = ("0000" + hundreths).slice(-2);
        // const sTenths = sHundreths % 10;

        let displayTime = '';
        if(hours >= 1) {
            displayTime = `${sHours}:`;
        }
        // displayTime += `${sMinutes}:${sSeconds}.${sHundreths}`;
        // displayTime += `${sMinutes}:${sSeconds}.${sTenths}`;
        displayTime += `${sMinutes}:${sSeconds}`;

        if (negativeTime && displayTime !== '00:00') {
            displayTime = '- ' + displayTime;
        }

        return displayTime;
    }

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

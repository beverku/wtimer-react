import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { observer } from 'mobx-react';
import store from './SettingsStore';


// TODO:
// keyboard navigation
// settings page
// remember settings
// Tabata - display rounds and/or total countdown time
// font
// rounds with rest time? - or is that a tabata settings?
// pressing stop while in initial countdown - beeps on 0
@observer
export default class Timer extends React.Component {
    constructor(props) {
        super(props);

        if ( typeof this.getElapsedTime !== 'function') {
            throw new TypeError('Must override getElapsedTime');
        }

        this.shortBeeps = new Set(store.shortBeeps);
        this.longBeeps = new Set(store.longBeeps);

        const shortBeepLength = 1000;
        const longBeepLenth = shortBeepLength * 4;
        this.shortBeepAudio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + Array(shortBeepLength).join(123));
        this.longBeepAudio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU' + Array(longBeepLenth).join(123));


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
            10
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    start() {
        const start = Date.now();
        const countdownStart = this.getMsTime(this.state.time);
        // TODO make sure this is a copy
        this.shortBeeps = new Set(store.shortBeeps);
        this.longBeeps = new Set(store.longBeeps);
        this.setState({
            start: start,
            end: null,
            inCountdown: true,
            isStarted: true,
            isStopped: false,
            countdownStart: countdownStart,
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

    handleInput(e) {
        const time  = e.target.value;
        this.setState({time});
    }

    getInitialCountdownElapsedTime(end) {
        const endTime = (typeof end !== 'undefined') ?  end : Date.now();
        const countdownTimeMs = store.countdownTimeMs;

        const elapsedTime = countdownTimeMs - (endTime - this.state.start);
        if(elapsedTime <= 0) {
            return 0; // make sure it doesn't display negative
        }
        return elapsedTime;
    }

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

        // When counting up floor shows only fully elapsed seconds / minutes etc.
        // When counting down ceiling shows only fully elapsed seconds / minutes etc.
        let floorOrCeil = Math.floor;
        if(countdown) {
            floorOrCeil = Math.ceil;
        }

        let hundredths = floorOrCeil( elapsedTime / 10 ) % 100;
        elapsedTime -= hundredths * 10;

        let seconds = floorOrCeil( elapsedTime / 1000 ) % 60;
        elapsedTime -= seconds * 1000;

        let minutes = floorOrCeil( elapsedTime / 60000 ) % 60;
        elapsedTime -= minutes * 60000;

        let hours = floorOrCeil( elapsedTime / 3600000 );
        // elapsedTime -= hours * 3600000;


        hundredths = Math.abs(hundredths);
        seconds = Math.abs(seconds);
        minutes = Math.abs(minutes);
        hours = Math.abs(hours);

        // Careful this breaks if number is bigger than the pad - but that can't happen here
        const sHours = ('0000' + hours).slice(-2);
        const sMinutes = ('0000' + minutes).slice(-2);
        const sSeconds = ('0000' + seconds).slice(-2);
        const sHundredths = ('0000' + hundredths).slice(-2);
        const sTenths = parseInt(hundredths / 10);  // just a special case of hundredths

        let displayTime = '';
        if(hours >= 1) {
            displayTime = `${sHours}:`;
        }

        displayTime += `${sMinutes}:${sSeconds}`;

        if(store.displayHundredths) {
            displayTime += `.${sHundredths}`;
        } else if(store.displayTenths) {
            displayTime += `.${sTenths}`;
        }

        if (negativeTime && displayTime !== '00:00') {
            displayTime = '- ' + displayTime;
        }

        // Beeps
        if(hours === 0 && minutes === 0) {
            if(this.shortBeeps.has(seconds)) {
                this.shortBeepAudio.play();
                // make sure it only beeps once for each second
                this.shortBeeps.delete(seconds);
            }
            if(this.longBeeps.has(seconds)) {
                this.longBeepAudio.play();
                // make sure it only beeps once for each second
                this.longBeeps.delete(seconds);
            }
        }

        return displayTime;
    }


    render() {
        // Good enough for current usages
        const headerStyle = {
            fontSize: store.displayTimerTextSize,
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
                        <p>
                            Debug: store.longBeeps={store.longBeeps}
                            Debug: store.shortBeeps={store.shortBeeps}
                        </p>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

import Timer from './Timer';

export default class AmrapTimer extends Timer {
    constructor(props) {
        super(props);
    }

    getElapsedTime(end) {
        const endTime = (typeof end !== 'undefined') ? end : Date.now();

        const elapsedTime = this.state.countdownStart - (endTime - this.state.start);
        return elapsedTime;
    }

    getDisplayTime(_elapsedTime) {
        return super.getDisplayTime(_elapsedTime, true);
    }
}


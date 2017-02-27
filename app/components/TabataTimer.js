import Timer from './Timer';

export default class AmrapTimer extends Timer {
    constructor(props) {
        super(props);

        this.round = 1;
        this.changingRound = false;
    }

    getElapsedTime(end) {
        const endTime = (typeof end !== 'undefined') ? end : Date.now();

        // TODO: settings
        const workTimeMs = 20 * 1000;
        const restTimeMs = 10 * 1000;
        const roundTimeMs = workTimeMs + restTimeMs;

        // actual elapsed time
        const elapsedTime = this.state.countdownStart - (endTime - this.state.start);

        // All Rounds are complete
        if(elapsedTime < 0) {
            return 0;
        }

        let roundElapsedTime = elapsedTime % roundTimeMs;
        roundElapsedTime = parseInt(roundElapsedTime / 1000) * 1000;

        let displayTime;
        if(roundElapsedTime > restTimeMs) {
            displayTime = roundElapsedTime - restTimeMs;
        } else {
            displayTime = roundElapsedTime;
        }

        // Check for changing round - because this method will be entered
        // for every tick and roundElapsedTime` will be 0 many times
        if (roundElapsedTime <= 0 && !this.changingRound) {
            this.round++;
            this.changingRound = true;
        } else if (this.changingRound && roundElapsedTime > 0) {
            // done changing round
            this.changingRound = false;
        }

        if (this.changingRound) {
            displayTime = workTimeMs;
        }

        return displayTime;
    }

    getDisplayTime(_elapsedTime) {
        return super.getDisplayTime(_elapsedTime, true);
    }
}

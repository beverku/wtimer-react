import Timer from './Timer';

export default class ForTimeTimer extends Timer {
    constructor(props) {
        super(props);
    }

    getElapsedTime(end) {
        const endTime = (typeof end !== 'undefined') ?  end : Date.now();

        const elapsedTime = endTime - this.state.start;
        return elapsedTime;
    }

    // eslint-disable-next-line no-unused-vars
    // TODO: handleInput(e) { // eslint-disable-line no-unused-vars
    handleInput() { // eslint-disable-line no-unused-vars
        // no-op
    }
}

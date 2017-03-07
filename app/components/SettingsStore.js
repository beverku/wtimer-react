import { computed, observable } from 'mobx';

class SettingsStore {
    // TODO: since this is a set do we need to be careful to add/remove instead of setting to a new object?
    // use xxBeeps.replace()
    @observable shortBeeps = [3, 2, 1];
    @observable longBeeps = [0];

    @observable countdownTimeSecs = 10;
    @computed get countdownTimeMs() {
        return this.countdownTimeSecs * 1000;
    }

    @observable tabataWorkTimeSecs = 20;
    @computed get tabataWorkTimeMs() {
        return this.tabataWorkTimeSecs * 1000;
    }

    @observable tabataRestTimeSecs = 10;
    @computed get tabataRestTimeMs() {
        return this.tabataRestTimeSecs * 1000;
    }

    // TODO: make mutually exclusive - radio?
    @observable displayTenths = false;
    @observable displayHundredths = false;

    @observable displayTimerTextSize = '20vw';
}

// For debug set window.store - allows changing it in console
const store = window.store = new SettingsStore;
// const store = new SettingsStore;

export default store;

import React from 'react';

export default class Timer extends React.Component {
    handleKeyPress(event) {
        console.log('Key Pressed: ');
        console.log(event);
        if(event.key === 'Enter') {
            console.log('enter press here! ');
        }
    }

    // TODO: You should use keydown and not keypress.
    // Keypress is usually used only for keys that produce a character output as per the docs

    // Keypress
    // The keypress event is fired when a key is pressed down and that key normally produces a character value

    // Keydown
    // The keydown event is fired when a key is pressed down.

    // TODO see: https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets
    render() {
        return (
            <div>
                <input type="text" id="one" onKeyPress={this.handleKeyPress} />
            </div>
        );
    }
}

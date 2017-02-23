import React from 'react';

export default class Footer extends React.Component {

    render() {
        // TODO: version hardcoded
        const version = '0.1';

        return (
            <footer>
                <div class="pull-left">
                    <h4 class="text-left">Project home: <a href="http://github.com/beverku/wtimer-react">wtimer-react</a></h4>
                </div>
                <div class="pull-right">
                    <h4 class="text-right">version: {version}</h4>
                </div>
                <div class="clearfix"></div>
            </footer>
        );
    }
}

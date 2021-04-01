import React, {Component} from 'react';

type LeveledComponentProps = {
    minimum?: number;
    maximum?: number;
}

class LeveledComponent<P, S> extends Component<P & LeveledComponentProps, S> {
    render() {
        return undefined;
    }
}

export default LeveledComponent;

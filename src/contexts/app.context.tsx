import React, {Component, createContext} from "react";

export type AppContextState = {
    mode: OperatingMode,
}

export type AppContextActions = {
    setOperatingMode: (newMode: OperatingMode) => void,
}

export enum OperatingMode {
    FORMAL = 'Formal',
    FUN = 'Fun',
    LUDICROUS = 'Ludicrous',

}

const defaultState: AppContextState = {
    mode: OperatingMode.FORMAL,
}

export const AppContext = createContext({...defaultState});


export class AppProvider extends Component<any, any> {

    state: AppContextState & AppContextActions = {
        ...defaultState,
        setOperatingMode: (newMode: OperatingMode) => {
            this.setState({
                mode: newMode,
            })
        }

    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

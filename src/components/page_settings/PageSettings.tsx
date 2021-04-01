import React, {Context} from 'react';

import './PageSettings.scoped.css';
import {AppContext, AppContextState} from '../../contexts/app.context';

const setMode = (context: A, funMode: string) => {
    context.
}

const PageSettings: React.FC<any> = () => {
    return (
        <AppContext.Consumer>
            {
                (context) => (
                    <section id={'page-settings'}>
                        <p>Mode: {context.mode}</p>
                        <label htmlFor={'fun-mode-toggle'}>
                            <input className={'input'}
                                   type={'checkbox'}
                                   id={'fun-mode-toggle'}
                                   onChange={(event) => setMode(context, event.target.value)}
                            />
                            <div className="toggle-wrapper">
                                <span className="selector"/>
                            </div>
                        </label>
                    </section>
                )
            }
        </AppContext.Consumer>
    )
}

export default PageSettings;

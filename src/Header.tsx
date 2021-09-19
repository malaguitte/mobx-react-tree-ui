import * as React from 'react';
import { observer } from "mobx-react";
import { IAppState } from "./IAppState";
import { useAppStateContext } from './AppState';

interface HeaderProps {
    appState?: IAppState
}

@observer
class HeaderRenderer extends React.Component<HeaderProps>{
    render() {
        return (
            <header className="App-header">
                {this.props.appState!.title}
            </header>
        )
    }
}

export const Header: React.FunctionComponent<{}> = (props) => {
    const appState = useAppStateContext();
    return <HeaderRenderer appState={appState} />
}

export default Header;
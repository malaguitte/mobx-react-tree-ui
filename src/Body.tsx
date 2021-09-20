import * as React from "react";
import { IAppState } from "./IAppState";
import { observer } from "mobx-react";
import { TreeInput } from "./TreeInput";
import { TreeOutput } from "./TreeOutput";
import TreeUI from "./TreeUI";
import "./Body.scss"
import { useAppStateContext } from "./AppState";
import CONFIG from "./config/config";

interface BodyProps {
    appState: IAppState
}

const BodyRenderer: React.FunctionComponent<BodyProps> = observer((props) => {
    return (
        <main className="App-body">
            {props.appState!.bodyMessage}
            <TreeInput onChange={(newVal) => {
                props.appState.setState({
                    ...props.appState,
                    treeNode: newVal
                })
            }} />

            { CONFIG.RENDER_TREE_BOX
                ?
                <div className="OutputContainer">
                    <TreeOutput treeNode={props.appState.treeNode} />
                </div>
                :
                null
            }

            { CONFIG.RENDER_TREE_UI 
                ? 
                <div className="tree">
                    <ul>
                        <TreeUI data={props.appState.treeNode} />
                    </ul>
                </div>
                :
                null
            }
            
            
        </main>
    );
})

export const Body: React.FunctionComponent<{}> = (props) => {
    const appState = useAppStateContext();
    return <BodyRenderer appState={appState} />
}

export default Body;
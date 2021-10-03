import * as React from "react";
import { IAppState } from "./IAppState";
import { observer } from "mobx-react";
import { TreeInput } from "./TreeInput/TreeInput";
import { TreeOutput } from "./TreeOutput/TreeOutput";
import TreeUI from "./TreeUI/TreeUI";
import "./Body.scss"
import { useAppStateContext } from "./AppState";
import CONFIG from "./config/config";
import { BinTreeNode } from "./TreeNode";
import { getTreeMaxDepth } from "./Utils";

interface BodyProps {
    appState: IAppState
}

const BodyRenderer: React.FunctionComponent<BodyProps> = observer((props) => {

    // What to do once the TreeInput value changes.
    const onTreeInputChange = (newVal: BinTreeNode) => {
        props.appState.setState({
            ...props.appState,
            treeNode: newVal
        });
    }

    const maxDepth: number = getTreeMaxDepth(props.appState.treeNode, 0);

    return (
        <main className="App-body">
            {props.appState!.bodyMessage}
            <TreeInput onChange={onTreeInputChange} />

            {/* Should render the "box" design */}
            { CONFIG.RENDER_TREE_BOX
                ?
                <div className="OutputContainer">
                    <TreeOutput treeNode={props.appState.treeNode} maxDepth={maxDepth} currentDepth={1} />
                </div>
                :
                null
            }

            {/* Should render the "tree" design */}
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
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
import { getRootSmallestSubTree } from "./Utils";

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

    // Finds the root of the smallest sub-tree
    const rootSubTree = getRootSmallestSubTree(props.appState.treeNode);

    return (
        <main className="App-body">
            {props.appState!.bodyMessage}
            <TreeInput onChange={onTreeInputChange} />

            {/* Should render the "box" design */}
            { CONFIG.RENDER_TREE_BOX
                ?
                <div className="OutputContainer">
                    <TreeOutput treeNode={props.appState.treeNode} rootSubTree={rootSubTree} />
                </div>
                :
                null
            }

            {/* Should render the "tree" design */}
            { CONFIG.RENDER_TREE_UI 
                ? 
                <div className="tree">
                    <ul>
                        <TreeUI data={props.appState.treeNode} rootSubTree={rootSubTree} />
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
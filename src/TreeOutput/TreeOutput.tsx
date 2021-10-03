import * as React from "react";
import { BinTreeNode } from "../TreeNode";
import "./TreeOutput.scss"

export interface TreeOutputProps {
    treeNode?: BinTreeNode | null,
    rootSubTree?: BinTreeNode // Represents the subtree we would like to highlight on the UI.
}

export const TreeOutput: React.FunctionComponent<TreeOutputProps> = (props) => {
    if (!props.treeNode || !props.treeNode.id) {
        return <></>;
    }

    // Whether the current node has children nodes or not.
    const hasChildren = props.treeNode?.left || props.treeNode?.right;

    // Check whether the current node is the root of the subtree.
    const isSubTreeRoot = props.rootSubTree === props.treeNode;

    // In case we found the subtree, we want to add the 'deepestNode' style class
    const deepestNodeStyle = isSubTreeRoot ? "deepestNode" : "";

    return (
        <div className={`treeNode ${deepestNodeStyle}`}>
            <div className="nodeId">{props.treeNode.id}</div>
            {hasChildren 
                ?
                <div className="nodeChildren">
                    <TreeOutput treeNode={props.treeNode?.left} rootSubTree={props.rootSubTree} />
                    <TreeOutput treeNode={props.treeNode?.right} rootSubTree={props.rootSubTree} />
                </div> 
                :
                null}
        </div>
    );
}
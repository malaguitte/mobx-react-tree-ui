import * as React from "react";
import { BinTreeNode } from "../TreeNode";
import "./TreeOutput.scss"

export interface TreeOutputProps {
    treeNode?: BinTreeNode | null,
    maxDepth?: number,
    currentDepth?: number
}

export const TreeOutput: React.FunctionComponent<TreeOutputProps> = (props) => {
    if (!props.treeNode || !props.treeNode.id) {
        return <></>;
    }

    // Whether the current node has children nodes or not.
    const hasChildren = props.treeNode?.left || props.treeNode?.right;
    // In case we're in the last node, we want to add the 'deepestNode' style class
    const nextLevel = props.currentDepth ? props.currentDepth + 1 : undefined;
    // Considering the current depth of the tree, in case there's children we will add 1 more.
    const deepestNodeStyle = props.currentDepth === props.maxDepth ? "deepestNode" : "";

    return (
        <div className="treeNode">
            <div className={`nodeId ${deepestNodeStyle}`}>{props.treeNode.id}</div>
            {hasChildren 
                ?
                <div className="nodeChildren">
                    <TreeOutput treeNode={props.treeNode?.left} maxDepth={props.maxDepth} currentDepth={nextLevel} />
                    <TreeOutput treeNode={props.treeNode?.right} maxDepth={props.maxDepth} currentDepth={nextLevel} />
                </div> 
                :
                null}
        </div>
    );
}
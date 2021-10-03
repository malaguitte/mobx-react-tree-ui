import React from "react";
import "./TreeUI.scss";
import { BinTreeNode } from "../TreeNode";

export interface TreeUIProps {
  data: BinTreeNode,
  rootSubTree?: BinTreeNode
}

export const TreeUI: React.FunctionComponent<TreeUIProps> = (props) => {
  const { data, rootSubTree } = props;
  if (!data) {
    return <></>;
  }

  //Check whether the current node has children nodes
  const hasChildren = data.left || data.right;
  // Check whether the current node is the root of the subtree.
  const isSubTreeRoot = rootSubTree === data;
  // In case we found the subtree, we want to add the 'deepestNode' style class
  const highlightClass = isSubTreeRoot ? "highlight" : "";
  
  return (
    <li className={highlightClass}>
      <a href="##">{data.id}</a>
      {
        hasChildren 
        ?
          <ul>
            { data.left ? <TreeUI data={data.left} rootSubTree={rootSubTree} /> : null }
            { data.right ? <TreeUI data={data.right} rootSubTree={rootSubTree} /> : null }
          </ul> 
        : 
          null
      }
    </li>
  )
 
}


export default TreeUI;

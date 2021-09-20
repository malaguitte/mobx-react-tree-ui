import React from "react";
import "./TreeUI.scss";
import { BinTreeNode } from "./TreeNode";
export interface TreeOutputProps {
  data: BinTreeNode
}

export const TreeUI: React.FunctionComponent<TreeOutputProps> = (props) => {
  const { data } = props;
  if (!data) {
    return <div className="treeNode"></div>;
  }
  
  const hasData = data.left !== undefined || data.right !== undefined;

  return (
    <li>
      <a className="active" href="#">{data.id}</a>
      {
        hasData 
        ?
          <ul>
            { data.left ? <li> <TreeUI data={data.left} /> </li> : null }
            { data.right ? <li> <TreeUI data={data.right} /> </li> : null }
          </ul> 
        : 
          null
      }
    </li>
  )
 
}


export default TreeUI;

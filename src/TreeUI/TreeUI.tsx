import React from "react";
import "./TreeUI.scss";
import { BinTreeNode } from "../TreeNode";

export interface TreeOutputProps {
  data: BinTreeNode
}

export const TreeUI: React.FunctionComponent<TreeOutputProps> = (props) => {
  const { data } = props;
  if (!data) {
    return <div></div>;
  }
  
  const hasData = data.left !== undefined || data.right !== undefined;

  return (
    <li>
      <a href="#">{data.id}</a>
      {
        hasData 
        ?
          <ul>
            { data.left ? <TreeUI data={data.left} /> : null }
            { data.right ? <TreeUI data={data.right} /> : null }
          </ul> 
        : 
          null
      }
    </li>
  )
 
}


export default TreeUI;

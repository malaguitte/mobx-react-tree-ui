import { BinTreeNode } from "./TreeNode";

export function prettyPrint(tree: BinTreeNode): string {
    const jsonTree = JSON.stringify(tree, undefined, 2);
    return jsonTree;
}
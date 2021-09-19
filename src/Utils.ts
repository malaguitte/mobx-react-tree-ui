import { BinTreeNode } from "./TreeNode";

/**
 * This method formats a given tree object into a JSON string 
 * That can be displayed to the user.
 * 
 * @param { BinTreeNode } tree: The tree object that we would like to display as JSON.
 * @returns { string }: The string representing the tree (formatted as JSON)
 */
export function prettyPrint(tree: BinTreeNode): string {
    const jsonTree = JSON.stringify(tree, undefined, 2);
    return jsonTree;
}
import { BinTreeNode } from "./TreeNode";
import { BinTreeNodeWithDepth } from "./BinTreeNodeWithDepth";

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

/**
 * Checks whether a given tree has a valid root.
 * @param {BinTreeNode} tree : The given tree that we would like to verify
 * @returns {boolean} Returns `true` when the tree's root is valid, false otherwise (root=null)
 */
export function hasValidRoot(tree: BinTreeNode): boolean {
    return tree.id !== null;
}

export function getTreeMaxDepth(tree: BinTreeNode | null, level: number = 0): number {
    let maxLevel: number = level > 0 ? level : 0;
    if (tree?.id !== null) {
        if (tree?.left) {
            maxLevel = getTreeMaxDepth(tree.left, ++level);
        }
        if (tree?.right) {
            maxLevel = getTreeMaxDepth(tree.right, ++level);
        }
    }
    return maxLevel;
}
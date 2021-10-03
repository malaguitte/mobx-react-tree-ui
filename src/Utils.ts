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

/**
 * Checks whether a given tree has a valid root.
 * @param {BinTreeNode} tree : The given tree that we would like to verify
 * @returns {boolean} Returns `true` when the tree's root is valid, false otherwise (root=null)
 */
export function hasValidRoot(tree: BinTreeNode): boolean {
    return tree.id !== null;
}

/**
 * From a given node of a tree (e.g root), it finds its "deepest level" (highest distance from the root)
 *   A
 * B   C
 *       D
 * 
 * On the example above when giving A, the value returned will be 3.
 * Explanation: A corresponds to level 1, we will check the level of its children now
 * B corresponds to level 2, C also corresponds to level 2, but C has a child D, which is at level 3.
 * Since level 3 is the highest possible for this scenario, we will return 3.
 * 
 * 
 * @param {BinTreeNode} node Where to start the search, e.g root of the tree.
 * @returns {number} The longest distance possible from the given node.
 */
function findDepth(node: BinTreeNode): number {
    if (node.id === null) return 0;

    // If the current node is a leaf node...
    if (node && !node.left && !node.right) return 1;

    const leftDepth = node.left ? findDepth(node.left) : 0;
    const rightDepth = node.right ? findDepth(node.right) : 0;
    
    //Finds the highest distance, and adds 1 since we're doing it recursively.
    return Math.max(leftDepth, rightDepth) + 1;
}

/**
 * Finds the root of the smallest sub-tree possible.
 * 
 * For every node it finds the depth of its left and right subtrees,
 * once the longest path has been found, e.g either left or right
 * We keep doing it recursively to find the deepest "common point" possible.
 * 
 * The result may be the a node that points to other nodes (left and right) that are equally as far from the root of the tree
 * Or it may be a single node, which means this is the single deepest node of the tree. 
 * 
 * @param {BinTreeNode} node : A BinTreeNode object, where we would like to find the root of the sub tree.
 * @returns {BinTreeNode | undefined}: Returns the Node which represents the longest common point from the root of the tree,
 *              it may return undefined in case we do not receive a valid tree's root to start.
 */
export function getRootSmallestSubTree(node: BinTreeNode): BinTreeNode | undefined {
    let result = undefined;
    
    if (node.id === null) return result;

    let leftDistance = 0;
    let rightDistance = 0;
    if (node.left) {
        leftDistance = findDepth(node.left);
    }
    if (node.right) {
        rightDistance = findDepth(node.right);
    }

    // If the distance of the left > right, we will go left
    if (leftDistance > rightDistance && node.left) {
        result = getRootSmallestSubTree(node.left);
    // Right distance > left, we will go right now
    } else if (rightDistance > leftDistance && node.right) {
        result = getRootSmallestSubTree(node.right);
    // Same distance, get the current node because this is the either the longest one, or it is the common point.
    } else {
        result = node;
    }

    return result;
}
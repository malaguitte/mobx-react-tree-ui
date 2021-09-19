export class BinTreeNode {
    id: string;
    // Left and right are optional because we do not want to have them when both are null.
    left?: BinTreeNode | null;
    right?: BinTreeNode | null
    constructor(id: string, left: BinTreeNode | null, right: BinTreeNode | null) {
        this.id = id;
        // Create the children nodes only when at least one of them is not null
        // We do not want both children to be `null`
        if (left !== null || right !== null) {
            this.left = left;
            this.right = right;
        }
    }
}
import { BinTreeNode } from "../TreeNode";
import { TreeInput } from "./TreeInput"

const mockTreeInputProps = {
    onChange: (treeNode: BinTreeNode): void => {}
};

it("parseArrayToTree creates an empty Tree when it receives an empty array", () => {
    const treeInput = new TreeInput(mockTreeInputProps);
    const result = treeInput.parseArrayToTree([]);
    const emptyTree = new BinTreeNode("", null, null);
    expect(result).toStrictEqual(emptyTree);
});

it("parseArrayToTree parses a simple tree correctly", () => {
    const treeInput = new TreeInput(mockTreeInputProps);
    const result = treeInput.parseArrayToTree([1, [2], [3, null, [5]]]);
    const sampleTree = new BinTreeNode("1", new BinTreeNode("2", null, null), 
                        new BinTreeNode("3", null, new BinTreeNode("5", null, null)));
    expect(result).toStrictEqual(sampleTree);
});
  
import { getRootSmallestSubTree, hasValidRoot, prettyPrint } from "./Utils";
import { BinTreeNode } from "./TreeNode";

it("hasValidRoot returns false when the root is invalid", () => {
    const emptyTree = new BinTreeNode("", null, null);
    const result = hasValidRoot(emptyTree);
    expect(result).toBe(false);
});

it("hasValidRoot true when the tree has a root value", () => {
    const sampleTree = new BinTreeNode("1", 
                        new BinTreeNode("2", null, null), 
                        new BinTreeNode("3", null, null)
                    );
    const result = hasValidRoot(sampleTree);
    expect(result).toBe(true);
});
  
it("prettyPrint transforms tree in a valid JSON", () => {
    const sampleTree = new BinTreeNode("root", null, null);
    const prettyJson = prettyPrint(sampleTree);
    let isValidJson = false; // Assume it will fail
    try {
        JSON.parse(prettyJson);
        // if there was no exception it worked well, so we change the flag.
        isValidJson = true;
    } catch (e) {
    } finally {
        expect(isValidJson).toBe(true);
    }
});

it("getRootSmallestSubTree finds the single longest node", () => {
    const sampleTree = new BinTreeNode("1", new BinTreeNode("2", null, null), 
                        new BinTreeNode("3", null, new BinTreeNode("5", null, null)));
    const expectedResult = new BinTreeNode("5", null, null);
    const result = getRootSmallestSubTree(sampleTree);
    expect(result).toStrictEqual(expectedResult);
});

it("getRootSmallestSubTree finds the common root when nodes have the same distance", () => {
    const sampleTree = new BinTreeNode("1",
                        new BinTreeNode("2", null, null),
                        new BinTreeNode("3", 
                            new BinTreeNode("4", null, null),
                            new BinTreeNode("5", null, null))
                        );

    const expectedResult = new BinTreeNode("3", 
                            new BinTreeNode("4", null, null),
                            new BinTreeNode("5", null, null)
                        );    
    const result = getRootSmallestSubTree(sampleTree);
    expect(result).toStrictEqual(expectedResult);
});


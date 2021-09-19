import * as React from "react";
import { BinTreeNode } from "./TreeNode";
import { prettyPrint } from "./Utils";

export interface TreeInputProps {
    onChange: (newTreeNode: BinTreeNode) => void
}
interface TreeInputState {
    treeInput: string,
    fileInput?: File,
    treeText: string
}

export class TreeInput extends React.Component<TreeInputProps, TreeInputState>{
    constructor(props: TreeInputProps) {
        super(props);
        this.state = {
            treeInput: "",
            fileInput: undefined,
            treeText: ""
        }
    }

    /**
     * Converts array format binary tree notation to BinTreeNode data structure
     * @param arrayFormat [id, leftChild, rightChild] for example [1, [2], [3, null, [5]]]
     * @returns TreeNode format
     * */
    parseArrayToTree(arrayFormat: any[]): BinTreeNode {
        const root = arrayFormat[0] ?? null;

        // If any of the children nodes is an array
        // It means they are a sub-tree, let's call the same method recursively.
        let left = arrayFormat[1] ?? null;
        if (Array.isArray(left)) {
            left = this.parseArrayToTree(left);
        }
      
        let right = arrayFormat[2] ?? null;
        if (Array.isArray(right)) {
            right = this.parseArrayToTree(right);
        }

        return new BinTreeNode(root, left, right);
    }

    convert = () => {
        // After you implement parseArrayToTree above, uncomment the below code
        const treeArrayFormat: any[] = JSON.parse(this.state.treeInput);
        const tree: BinTreeNode = this.parseArrayToTree(treeArrayFormat);
        this.setState({
            // pretty print helps to display the JSON nicely.
            treeText: prettyPrint(tree)
        })

        // After you implement parseArrayToTree above, comment the below code
        // const treeNodeFormat: BinTreeNode = JSON.parse(this.state.treeText);
        // this.props.onChange(treeNodeFormat);
    }

    loadAndReadFile = () => {
        // Check whether we have the filed selected.
        if (this.state.fileInput) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.result) {
                    this.setState({
                        treeInput: fileReader.result.toString()
                    });
                    // Once we have the input loaded we call convert it to a tree.
                    this.convert(); 
                }
            }
            fileReader.readAsText(this.state.fileInput);
        }
    }

    changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filesArray = event?.target?.files;
        // If we have the files array, get the first item, otherwise undefined.
        const fileInput = filesArray ? filesArray[0] : undefined;
        this.setState({
            fileInput: fileInput
        });
    }

    render() {
        return (
            <div>
                <label>Tree source</label><br/>
                <input 
                    type="file" 
                    name="treeInput" 
                    accept=".json" 
                    onChange={(event) => this.changeFileHandler(event)}
                />
                <br/>
                <button onClick={this.loadAndReadFile}>Fetch</button><br /><br />
                <p>Tree Text</p>
                <textarea rows={20} cols={120} value={this.state.treeText}></textarea>

            </div>
        )
    }
}
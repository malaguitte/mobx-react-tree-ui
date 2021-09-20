import * as React from "react";
import { BinTreeNode } from "./TreeNode";
import { prettyPrint, isValidRoot } from "./Utils";
import CONFIG from "./config/config";
import "./TreeInput.scss";

// Read config
const INPUT_ERROR_MESSAGE = CONFIG.INPUT_ERROR_MESSAGE ?? "Invalid input.";
const TEXTAREA_LABEL = CONFIG.TEXTAREA_LABEL ?? "Tree as json";
const TEXTAREA_PLACEHOLDER = CONFIG.TEXTAREA_PLACEHOLDER ?? "Tree JSON...";
const INPUT_LABEL = CONFIG.INPUT_LABEL ?? "Tree source";
const BUTTON_LABEL = CONFIG.BUTTON_LABEL ?? "Fetch";

export interface TreeInputProps {
    onChange: (newTreeNode: BinTreeNode) => void
}

interface TreeInputState {
    treeInput: string,
    fileInput?: File,
    treeText: string,
    isInputValid: boolean
}

export class TreeInput extends React.Component<TreeInputProps, TreeInputState>{
    constructor(props: TreeInputProps) {
        super(props);
        this.state = {
            treeInput: "", // Represents the input as an array, e.g [1, [2], [3]]
            fileInput: undefined, // Represents the file loaded
            treeText: "", // Represents the BinTreeNode as text,
            isInputValid: true // Represents whether the current input is valid, starts as valid.
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
        // It means they are a sub-tree... 
        // Let's call the same method recursively.
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

    /**
     * This method parse the `treeInput` value to a tree (if possible),
     * and it updates the `treeText` with its new JSON representation.
     * Once that's done we call the method that "draws" the Tree on the UI again.
     * 
     * In case the `treeInput` is not a valid Tree representation, we set the `isInputValid` to `false`
     */
    convert = () => {
        try {
            // After you implement parseArrayToTree above, uncomment the below code
            const treeArrayFormat: any[] = JSON.parse(this.state.treeInput);
            const tree: BinTreeNode = this.parseArrayToTree(treeArrayFormat);
            if (!isValidRoot(tree)) {
                throw Error("Invalid input, no root found for the tree");
            }
            this.setState({
                // In order to display the JSON nicely for the user, we call `prettyPrint` here.
                treeText: prettyPrint(tree),
                isInputValid: true // Input is now valid
            });

            // Draw the tree again
            this.props.onChange(tree);
            
        } catch (err) {
            console.error("Invalid input, error: ", err);
            this.setState({
                isInputValid: false // Input is invalid
            });
        }
    }

    /**
     * Reads the file set in the `fileInput` using the `FileReader` API.
     * If the file is successfully read, we update the `treeInput` and call `convert`
     * to complete the actions, e.g parse the data to a tree, update the textarea, and draw the tree again.
     */
    loadAndReadFile = () => {
        // Check whether we have the file selected.
        if (this.state.fileInput) {
            const fileReader = new FileReader();

            // Specify what to do once the file has been loaded.
            fileReader.onload = () => {
                if (fileReader.result) {
                    // Set the loaded contents as a string to 'treeInput'
                    this.setState({
                        treeInput: fileReader.result.toString()
                    });
                    // Once we have the input loaded we can convert it to a tree
                    // Calling convert to do that...
                    this.convert(); 
                }
            }
            // Read file
            fileReader.readAsText(this.state.fileInput);
        }
    }

    /**
     * Reads the user's event, and sets the first file selected as the `fileInput` value.
     * @param event: The user input event, e.g selecting a file
     */
    changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const filesArray = event?.target?.files;
        // If we have the files array, get the first item, otherwise undefined.
        const fileInput = filesArray ? filesArray[0] : undefined;
        // Set the new file to the current state
        this.setState({
            fileInput: fileInput
        });
    }

    /**
     * Callback watching the changes on the textarea element
     * Tries to parse the current content of the HTML element, and transform it to a `BinTreeNode`
     * if that works well, draws the new tree calling `this.props.onChange`
     * 
     * In case we are not able to parse the  text received, we set the `isInputValid` to `false`
     * @param event 
     */
    onChangeTreeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            const text = event?.target?.value;
            if (text !== undefined) {
                this.setState({
                    treeText: text,
                    isInputValid: true // Input is now valid
                });
                const treeNodeFormat: BinTreeNode = JSON.parse(text);
                if (isValidRoot(treeNodeFormat)) {
                    this.props.onChange(treeNodeFormat);
                }
            }
        } catch (err) {
            console.error("Invalid input, error: ", err);
            this.setState({
                isInputValid: false // Input is invalid
            });
        }
        
    }

    render() {
        return (
            <div>
                <label>{INPUT_LABEL}</label><br/>
                <input 
                    type="file" 
                    name="treeInput" 
                    accept=".json"
                    onChange={(event) => this.changeFileHandler(event)}
                />
                <br/>
                <button onClick={this.loadAndReadFile}>{BUTTON_LABEL}</button><br /><br />
                <p>{TEXTAREA_LABEL}</p>
                <textarea
                    className={this.state.isInputValid ? "" : "invalid"}
                    rows={20} 
                    cols={130} 
                    value={this.state.treeText} 
                    onChange={(event) => this.onChangeTreeText(event)}
                    placeholder={TEXTAREA_PLACEHOLDER}
                >
                </textarea>

                {!this.state.isInputValid ? 
                    <p className="errorMessage">{INPUT_ERROR_MESSAGE}</p>
                    : null
                }

            </div>
        )
    }
}
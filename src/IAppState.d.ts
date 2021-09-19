import { IObservable, IObservableValue } from "mobx";


interface IAppState {
    title: string;
    bodyMessage: string;
    treeNode: BinTreeNode;
    
    setState(newState: IAppState)
}
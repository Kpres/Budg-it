import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ManagementPage} from './components/ManagementPage';
import {HomePage} from './components/HomePage';
import {TransactionPage} from './components/TransactionPage'
import { TransactionItem } from './components/TransactionTracking';

import './App.css';
//App is the parent class that acts as the pipeline to send information to and from the necessary components
class App extends Component {

    constructor(props){
        super(props);
        //member variables
        this.state = ({
            totalFromManage: 15000,
            percentFromManage: 0,
            transaction: [],
        });
        //bind functions so they can set the state
        this.receiveTotal = this.receiveTotal.bind(this);
        this.receivePercentage = this.receivePercentage.bind(this);
        this.receiveTransaction = this.receiveTransaction.bind(this);
    }
    //built in function to save all pertinent info into local storage
    componentWillMount(){
        if(JSON.parse(localStorage.getItem("ls")) != null){
            var simplify = JSON.parse(localStorage.getItem("ls"));
            var tempStorage = []
                for(var i = 0; i < simplify.length; i++){
                    var wrap = (simplify[i].state);
                    tempStorage.push(new TransactionItem(wrap.amount, wrap.title, wrap.spontaneous, wrap.id));
                }
            this.setState({transaction: tempStorage});
        }
    }
  
    //Recive the total wallet amount from management so it can then be passed to home page and transaction page
    receiveTotal(total){this.setState({totalFromManage: total})}

    //receive the total percentage from management so it can then be passed to home page and trasaction page
    receivePercentage(percentage){this.setState({percentFromManage: percentage})}

    //Function that is called from the child class to recieve the transaction so the global list gets updated that other classes are observing
    receiveTransaction(newTransaction){
        var temp = this.state.transaction;
        temp.push(newTransaction);
        this.setState({transaction: temp});
        localStorage.setItem("ls", JSON.stringify(this.state.transaction)); 
    }

    //resets the purchase history in local storage if needed as well as throughout every other child component
    resetPurchaseHistory(){
        localStorage.setItem("ls",null);
        this.setState({transaction: []});
    }

    render() {
        //Adds the ability to route to the different compnent pages
        return (
        <Router>
            <Switch>
            <Route exact path = "/" 
                render = {(props) => <HomePage 
                    totalWallet = {this.state.totalFromManage} 
                    currentSavings = {this.state.percentFromManage}/>}
            />

            <Route path = "/mp" 
                render = {(props) => <ManagementPage 
                    receiveTotal = {this.receiveTotal} 
                    receivePercentage = {this.receivePercentage}
                    transactions = {this.state.transaction}
                    clearPurchaseHistory = {this.resetPurchaseHistory}/>}
            />

            <Route path = "/t"
                render = {(props) => <TransactionPage
                    receiveTransaction = {this.receiveTransaction}
                    currentSavings = {this.state.percentFromManage}
                    totalWallet = {this.state.totalFromManage}/>}
            />
            </Switch>
        </Router>
        );
    }
}

export default App;

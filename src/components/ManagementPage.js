import React, {Component} from 'react';
import './ManagementPage.css';
import { TransactionItem } from './TransactionTracking';

export class ManagementPage extends Component{
    constructor(){
        super();
        this.state = ({
            chosen_savings_threshold: 0,
            total_wallet_amount: 15000,
            savingsColor: "white"
            })
            this.transactionList = [new TransactionItem(-30, "Food", true, 0), new TransactionItem(400, "Paycheck", false, 1)];

            this.addTransaction = this.addTransaction.bind(this);
    }

    setThreshold = (e) => {
        this.setState({savingsColor: "white"});
        this.setState({chosen_savings_threshold: e.target.value});
    }

    addTransaction = (t) => {
        // takes in a transactionitem, and appends it to the transaction list
        this.transactionList.push(t);

    }

    render(){
        return(
        <div>
            <div>Rest of this to be implemented by Cole</div>
            <form>
                <div class="form-group">
                    <label for="formControlRange">Enter Savings Percentage: {this.state.chosen_savings_threshold} %</label>
                    <input onChange = {this.setThreshold} type="range" defaultValue = "0" max = "100" class="form-control-range" id="formControlRange"></input>
                    
                    <div className = "SavingsDisplay">
                        <div>Your Savings</div>
                        <div style = {{color: this.state.savingsColor}} >
                            $ {Number(this.state.chosen_savings_threshold/100 * this.state.total_wallet_amount).toFixed(0)}
                        </div>
                        
                    </div>
                    
                </div>
                <div class="TransactionTable">
                    <div align="left" style ={{color: "gray"}}><br/>History:</div>
                    <div align="left" style ={{color: "black"}}> {this.transactionList.map((trans) => <li key = {trans.state.id} style={{color: trans.state.amount < 0 ? "red" : "blue"}}>  
                    {trans.state.title + " | " + 
                        (trans.state.amount < 0 ? " - $" : " + $") + 
                        String(Math.abs(trans.state.amount)) + " | " +
                         (trans.state.spontaneous ? "Spontaneous" : "Periodic")} </li>)} </div>
                
                    </div> 
            </form>
            

        </div>
        );
    }
}
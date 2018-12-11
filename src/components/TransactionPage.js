import React, {Component} from 'react';
import './Global.css'
import './TransactionPage.css';
import {TransactionItem} from './TransactionTracking';
import { Redirect } from "react-router";
import swal from 'sweetalert2'

export class TransactionPage extends Component {
    constructor() {
        super();
        //proper member variables
        this.state = ({
            value: 0, 
            positive: false, 
            name: "Transaction", 
            spontaneous: true,
            routeManage: false,
            goBack: false,
            wallet: 0,
            posState: "",
            negState: "active",
            spontState: "active",
            regState: ""
        });
        //bind function for state setting
        this.updateWallet = this.updateWallet.bind(this);
    }

    //built in function to run when the parent state changes
    componentWillMount(){this.updateWallet();}

    //updates the spendable amount from the homepage
    updateWallet(){
        this.setState({
            wallet: ((100 - this.props.currentSavings) / 100 * this.props.totalWallet)
        });
    }

    //FOR ALL BELOW FUNCTIONS
    //These functions get run every time you press a button to simply set member variables
    //No further commenting is needed
    signChange = (e) => {
        if(e.target.value === "positive"){
            this.setState({
                positive: true,
                posState: "active",
                negState: ""
            });
        }
        else{
            this.setState({
                positive: false,
                posState: "",
                negState: "active"
            });
        }
    }

    regularityChange = (e) =>{
        if(e.target.value === "spontaneous"){
            this.setState({
                spontaneous: true,
                spontState: "active",
                regState: ""
            });
        }
        else{
            this.setState({
                spontaneous: false,
                spontState: "",
                regState: "active"
            });
        }
    }

    setValue = (e) => {this.setState({value: e.target.value});}
    setName = (e) => {this.setState({name: e.target.value});}

    //Send the transaction to the parent class
    sendTransaction = () => {   
        var temp = 0;
        if (this.state.positive){
            temp = this.state.value;
        } else {
            temp = -1 *  this.state.value;
        }
        this.props.receiveTransaction(new TransactionItem(temp, this.state.name, this.state.spontaneous, 0));
    }

    //manage routing as well as empty wallet checks to make sure you don't spend over your alotted limit
    routeManagement = () => {
        if (!this.state.positive && this.state.wallet < this.state.value){
            swal({
                title: "Warning!",
                text: "You've used up all the money in your wallet.\nThis purchase will take money from your savings.",
                type: 'warning',
                confirmButtonText: "Confirm"
            })
        }
        this.sendTransaction();
        this.setState({routeManage: true});
    }

    goBack = () => {this.setState({goBack: true});}

    render() {
        //routing applied if you want to switch pages
        if (this.state.routeManage) return <Redirect push to="/mp" />;
        if (this.state.goBack) return <Redirect push to="/" />;
        
        return (
            <div className="page">
                <span className = "Menu" onClick = {this.goBack}>≡</span>
                <span id="header">Transaction</span>
                <div className="form-group transaction">
                    <div className="row form-row name">
                        <div className="transaction-item">
                            <span className="input-group input-group-lg">
                                {/* input for the transaction name */}
                                <input 
                                    onChange = {this.setName} 
                                    type = "text" 
                                    className="form-control"
                                    placeholder = "Transaction"
                                    aria-label="Transaction Name"/>
                            </span>
                        </div>
                    </div>

                    <div className="row form-row money">
                        <div className="transaction-item">
                            <span className="input-group">
                                <span className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </span>
                                <input 
                                    onChange = {this.setValue} 
                                    type="number" 
                                    className="form-control"
                                    aria-label="Amount (to the nearest dollar)" 
                                    min="0"
                                    value={this.state.value}/>
                                <span className="input-group-append">
                                    <span className="input-group-text">.00</span>
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className="row form-row regularity">
                        <div className="transaction-item">
                            {/* Input buttons for + and - signs */}
                            <span className="btn-group btn-group-toggle" id="sign" data-toggle="buttons">
                                <button type='radio' 
                                    className={"btn btn-green " + this.state.posState}
                                    value="positive" 
                                    checked={this.state.positive} 
                                    onClick={this.signChange}>
                                    +
                                </button>

                                <button type='radio' 
                                    className={"btn btn-red " + this.state.negState}
                                    value="negative" 
                                    checked={!this.state.positive} 
                                    onClick={this.signChange}>
                                    -
                                </button>
                            </span>
                            {/* Input buttons for spontaneous vs regular */}
                            <span className="btn-group btn-group-toggle" id="reg" data-toggle="buttons">
                                <button type='radio' 
                                    className={"btn btn-blue " + this.state.spontState}
                                    value="spontaneous" 
                                    checked={this.state.spontaneous} 
                                    onClick={this.regularityChange}>
                                    Spontaneous
                                </button>

                                <button type='radio' 
                                    className={"btn btn-blue " + this.state.regState}
                                    value="regular" 
                                    checked={!this.state.spontaneous} 
                                    onClick={this.regularityChange}>
                                    Regular
                                </button>
                            </span>
                        </div>
                    </div>

                    <div className="row form-row confirm">
                        <div className="transaction-item">
                            <button type="button" 
                                className="btn btn-blue btn-lg" onClick = {this.routeManagement}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}
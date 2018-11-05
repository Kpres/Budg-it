import React, {Component} from 'react';
import {ManagementPage} from './ManagementPage.js'
import { Redirect } from "react-router";
import './HomePage.css';

export class HomePage extends Component{
    constructor(){
        super();
        this.current_savings_percent = 20,
        this.total_wallet_amount = 15000,
        this.state = ({
            wallet: ((100-this.current_savings_percent)/100 * this.total_wallet_amount),
            wallet_sign: "+",
            redirect: false,
            routeToManagement: false,
        });
    }

    updateWalletSign = () => {
        if(this.state.wallet <= 0){
            this.setState({wallet_sign: '-'});
        }else{
            this.setState({wallet_sign: '+'});
        }
    }

    placeHolder = () => {
        console.log("Will Route To Management Page");
        //this.props.setTotalAmount(this.state.wallet);
        this.setState({redirect: true})
    }

    routeToManagement = () => {
        this.setState({routeToManagement: true})
    }


    render(){
        if (this.state.redirect) {
            return <Redirect push to="/t" />;
          }
        if (this.state.routeToManagement) {
            return <Redirect push to="/mp" />;
        }
        
        return(
        <div className = "BackGround">
            <span className = "Menu" onClick = {this.routeToManagement}>=  </span>
            <span className = "Head">budge.it</span>
            <div className = "Value">{this.state.wallet_sign}${this.state.wallet}</div>
            <div className = "Footer" onClick = {this.placeHolder}>∇</div>
        </div>
        );
    }
}

import React, {Component} from 'react';
import { Redirect } from "react-router";
import './HomePage.css';

export class HomePage extends Component {
    constructor() {
        super();
        //State that holds current info (member variables)
        this.state = ({
            current_savings_percent: 0,
            total_wallet_amount: 15000,
            wallet: 15000,
            wallet_sign: "+",
            redirect: false,
            routeToManagement: false,
        });
        //bind appropriate functions so that they can set the state
        this.updateWallet = this.updateWallet.bind(this);
    }

    //built in react function that runs every time a parent class state changes
    componentWillMount() {
        this.updateWallet();
    }

    //updates the total wallet or spendable amount to be shown
    updateWallet() {
        this.setState({wallet: parseFloat((100-this.props.current_savings_percent)/100 * this.props.total_wallet_amount).toFixed(2)     });
    }

    //Updates the plus and minus sign on the home page
    updateWalletSign = () => {
        if(this.state.wallet <= 0){
            this.setState({wallet_sign: '-'});
        }else{
            this.setState({wallet_sign: '+'});
        }
    }

    //Routes to the transaction page
    routeToTransaction = () => {
        console.log("Will Route To Management Page");
        this.setState({redirect: true})
    }

    //Routes to the management page
    routeToManagement = () => {
        this.setState({routeToManagement: true})
    }

    render() {
        // Proper calls for routing purposes
        if (this.state.redirect) {
            return <Redirect push to="/t" />;
          }
        if (this.state.routeToManagement) {
            return <Redirect push to="/mp" />;
        }
        
        //return function to render the components
        return(
        <div className = "BackGround">
            <span className = "Menu" onClick = {this.routeToManagement}>≡  </span>
            <span className = "Head">budge.it</span>
            <div className = "Value">{this.state.wallet_sign}${this.state.wallet}</div>
            <div className = "Footer" onClick = {this.routeToTransaction}>∇</div>
        </div>
        );
    }
}

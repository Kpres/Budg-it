//object that contains a transaction item information
export class TransactionItem {
    constructor(_amount, _title, _spontaneous, _id){

        this.state = ({
            amount: _amount,
            title: _title,
            spontaneous: _spontaneous,
            id: _id,
        });
    }
    //getter functions to get the values throughout the rest of the program
    getAmount() {
        return this.state.amount;
    }

    getTitle() {
        return this.state.title;
    }

    getSpontaneous() {
        return this.state.spontaneous;
    }
};
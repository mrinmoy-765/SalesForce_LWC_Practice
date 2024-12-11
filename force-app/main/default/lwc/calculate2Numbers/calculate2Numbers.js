import { LightningElement, track } from 'lwc';
import getSumResult from '@salesforce/apex/CalculateNumbers.getSumResult';

export default class Calculate2Numbers extends LightningElement {
    @track fNumber;
    @track sNumber;
    @track sum;
    @track errors;

    handleClick() {
        getSumResult({ firstNumber: this.fNumber, secondNumber: this.sNumber })
            .then(result => {
                this.sum = result;
                this.errors = null; // Clear errors on success
            })
            .catch(error => {
                this.sum = null; // Clear result on error
                this.errors = error.body ? error.body.message : 'Unknown error';
            });
    }

    handleChange(event) {
        const fieldName = event.target.name;
        if (fieldName === 'fstNumber') {
            this.fNumber = event.target.value;
        } else if (fieldName === 'scdNumber') {
            this.sNumber = event.target.value;
        }
    }

    handleRefresh() {
        // Use 'this' to update reactive properties
        this.fNumber = '';
        this.sNumber = '';
        this.sum = '';
        this.errors = null; // Clear any error messages
    }
}

import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SIPCalculator extends LightningElement {
    monthlyInvestment = "";
    annualInterestRate = "";
    investmentPeriod = "";

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'monthlyInvestment') {
            this.monthlyInvestment = event.target.value;
        } else if (field === 'annualInterestRate') {
            this.annualInterestRate = event.target.value;
        } else if (field === 'investmentPeriod') {
            this.investmentPeriod = event.target.value;
        }
    }

    handleCalculate() {
        const P = parseFloat(this.monthlyInvestment);
        const annualRate = parseFloat(this.annualInterestRate) / 100;
        const r = annualRate / 12;
        const n = parseFloat(this.investmentPeriod) * 12;

        if (isNaN(P) || isNaN(annualRate) || isNaN(n)) {
            this.showToast('Error', 'Please enter valid numbers in all fields.', 'error');
            return;
        }

        const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
        this.result = futureValue.toFixed(2);

     
        this.showToast('', `Future Amount: ${this.result}`, 'success');
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    handleReset() {
        this.monthlyInvestment = "";
        this.annualInterestRate = "";
        this.investmentPeriod = "";

        
    }
}

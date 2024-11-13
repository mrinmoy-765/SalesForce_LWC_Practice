import { LightningElement, track } from 'lwc';

export default class SimpleAddFunction extends LightningElement {
    
   @track num1;
   @track num2;
   @track sum;

    numChng(event) {
        this.num1 = event.target.value;
    }

    numChng2(event) {
        this.num2 = event.target.value;
    }

    handleClick() {
       this.sum = parseInt(this.num1) + parseInt(this.num2);
  
    }

    handleReset() {
        this.num1 = '';
        this.num2 = '';
        this.sum = '';
    }
}

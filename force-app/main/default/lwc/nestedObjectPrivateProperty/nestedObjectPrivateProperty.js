import { LightningElement,track } from 'lwc';

export default class NestedObjectPrivateProperty extends LightningElement {

   @track myDetails = {fname : 'Ankit',lname: 'Jain'};
   @track myTask = ["Office", "Meeting", "Bootcamp"];

    clickHandler(event){
        this.myDetails.fname = "Amit";
    }

    addTaskHandler(event){
        this.myTask.push('Self Study');
    }

    refreshHandler(event){
        this.myDetails = {fname : 'Amit', lname : 'Jain'};
        this.task = [...this.task, 'Self Study']
    }
}
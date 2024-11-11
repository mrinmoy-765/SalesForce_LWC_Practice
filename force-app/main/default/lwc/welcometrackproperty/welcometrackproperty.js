 import { LightningElement, track} from 'lwc';

export default class Welcometrackproperty extends LightningElement {
    @track greetings;
    handleGreetingChange(event){
        this.greetings = event.target.value;
    }
}
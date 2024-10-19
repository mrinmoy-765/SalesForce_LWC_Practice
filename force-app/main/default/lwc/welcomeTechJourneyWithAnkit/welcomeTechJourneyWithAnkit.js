import { LightningElement, track } from 'lwc';

export default class WelcomeTechJourneyWithAnkit extends LightningElement {
    greeting = 'Hello';
    @track welcome = 'Tech Journey With Ankit';

    clickHandler(event){
         this.greeting = 'Namaste';
         this.welcome = 'Today is day 19 of LWC Bootcamp';
    }
}
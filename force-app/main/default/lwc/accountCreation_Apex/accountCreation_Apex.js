import { LightningElement, track } from 'lwc';
import createAccount from '@salesforce/apex/AccountCreationController.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountCreation_Apex extends LightningElement {
    @track accountid; // Store created account ID
    @track accountRecord = {
        Name: '', // Initialize as empty strings
        Type: '',
        Phone: ''
    };

    handleNameChange(event) {
        this.accountRecord.Name = event.target.value; // Update name
    }

    handleTypeChange(event) {
        this.accountRecord.Type = event.target.value; // Update type
    }

    handlePhoneChange(event) {
        this.accountRecord.Phone = event.target.value; // Update phone
    }

    handleSaveAccount() {
        // Call Apex with accountRecord object
        createAccount({ accountRecObj: this.accountRecord })
            .then(result => {
                this.accountid = result.Id; // Store created Account ID
                this.accountRecord = { Name: '', Type: '', Phone: '' }; // Reset the form
                // Show success message
                const toastEvent = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Account Record is created successfully!',
                    variant: 'success'
                });
                this.dispatchEvent(toastEvent);
            })
            .catch(error => {
                // Handle errors
                const toastEvent = new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                });
                this.dispatchEvent(toastEvent);
            });
    }
}

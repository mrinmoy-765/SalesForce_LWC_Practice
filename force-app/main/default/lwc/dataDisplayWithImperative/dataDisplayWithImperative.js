import { LightningElement,track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccountRecordList';

export default class DataDisplayWithImperative extends LightningElement {
    @track accountRecords; 
    @track errors;
    @track columns = [{label: 'Name', fieldName: 'Name',type:'text'},
                    {label: 'Industry', fieldName: 'Industry', type: 'text'},
                    {label: 'Phone', fieldName: 'Phone', type: 'phone'},
                    {label: 'Type', fieldName: 'Type', type: 'Picklist'}, 
    ]
    connectedCallback(){
        getAccounts()
        .then(result =>{
            this.accountRecords = result;
        })
        .catch(error=>{
            this.errors = error;
        })
    }
}
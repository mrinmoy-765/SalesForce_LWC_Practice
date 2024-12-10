import { LightningElement, track } from 'lwc';
import getChildAccounts from '@salesforce/apex/getChild.getChildAccounts';

export default class TreeGrid extends LightningElement {
    @track gridColumns = [
        { type: 'text', fieldName: 'name', label: 'Parent Account Name' },
        { type: 'text', fieldName: 'ChildName', label: 'Child Account Name' }
    ];

    @track gridData; 
    @track isLoading = true; 

    connectedCallback() {
        this.fetchChildAccounts();
    }

    fetchChildAccounts() {
        this.isLoading = true; 
        getChildAccounts()
            .then(result => {
                let transformedData = result.map(account => {
                    let accountData = {
                        Id: account.Id,
                        name: account.Name
                    };

             
                    if (account.ChildAccounts) {
                        accountData._children = account.ChildAccounts.map(childAccount => ({
                            Id: childAccount.Id,
                            ChildName: childAccount.Name
                        }));
                    }

                    return accountData;
                });

                this.gridData = transformedData;
            })
            .catch(error => {
                console.error('Error fetching accounts and child accounts:', error);
            })
            .finally(() => {
                this.isLoading = false; 
            });
    }
}
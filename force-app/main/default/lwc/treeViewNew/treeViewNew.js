import { LightningElement, track } from 'lwc';
import getChildAccounts from '@salesforce/apex/newTreeView.getChildAccounts';
import getChildAccountsByParentId from '@salesforce/apex/newTreeView.getChildAccountsByParentId';

export default class TreeViewNew extends LightningElement {
    @track gridData = []; // Holds parent accounts for the grid
    @track childAccounts = []; // Holds dynamically fetched child accounts
    @track showChildAccounts = false; // Controls the visibility of child accounts datatable
    @track parentAccountName = ''; // Stores the name of the selected parent account
    @track noChildAccountsMessage = ''; // Message to display when no child accounts are found

    @track columns = [
        { label: 'Account Name', fieldName: 'Name', type: 'text' },
        {
            type: 'button',
            typeAttributes: {
                label: 'View Child Accounts',
                name: 'viewDetails',
                variant: 'brand',
            },
        },
    ];

    @track childColumns = [
        { label: 'Child Account Name', fieldName: 'Name', type: 'text' },
        { label: 'Child Account ID', fieldName: 'id', type: 'text' },
    ];

    // Fetch parent accounts on component load
    connectedCallback() {
        this.fetchAccounts();
    }

    // Fetch parent accounts
    fetchAccounts() {
        getChildAccounts()
            .then((result) => {
                this.gridData = result.map((account) => ({
                    id: account.Id,
                    Name: account.Name,
                }));
                console.log('Fetched Parent Accounts:', this.gridData);
            })
            .catch((error) => {
                console.error('Error fetching parent accounts:', error);
            });
    }

    // Handle row action
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'viewDetails') {
            console.log('Selected Parent Account ID:', row.id);
            this.parentAccountName = row.Name; // Set the parent account name for display
            this.fetchChildAccounts(row.id); // Fetch child accounts for the selected parent ID
        }
    }

    // Fetch child accounts dynamically based on parent ID
    fetchChildAccounts(parentId) {
        getChildAccountsByParentId({ parentAccountId: parentId })
            .then((result) => {
                if (result.length > 0) {
                    this.childAccounts = result.map((account) => ({
                        id: account.Id,
                        Name: account.Name,
                    }));
                    this.noChildAccountsMessage = ''; // Clear the message
                } else {
                    this.childAccounts = []; // Clear the datatable
                    this.noChildAccountsMessage = 'No child accounts found for this account.'; // Set the message
                }
                this.showChildAccounts = true; // Show the child accounts section
                console.log('Fetched Child Accounts:', this.childAccounts);
            })
            .catch((error) => {
                console.error('Error fetching child accounts:', error);
            });
    }
}

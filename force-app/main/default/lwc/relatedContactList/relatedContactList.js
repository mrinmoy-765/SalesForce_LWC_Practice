// contactList.js

import { LightningElement, wire, api } from 'lwc';

import getRelatedContacts from '@salesforce/apex/ContactController.getRelatedContacts';

export default class ContactList extends LightningElement {

    @api recordId; // Id of the current Account record

    columns = [

        { label: 'Name', fieldName: 'Name', type: 'text' },

        { label: 'Email', fieldName: 'Email', type: 'email' },

      

    ];

    contacts = [];

    @wire(getRelatedContacts, { accountId: '$recordId' })

    wiredContacts({ error, data }) {

        if (data) {

            this.contacts = data;

        } 

    }

}
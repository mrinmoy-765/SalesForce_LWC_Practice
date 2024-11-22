
import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import COUNTRY_FIELD from '@salesforce/schema/Account.Country__c';
import STATE_FIELD from '@salesforce/schema/Account.State__c';

export default class FieldDependency extends LightningElement {
    @track countryOptions = [];
    @track stateOptions = [];
    @track stateFieldData = null;
    selectedCountry = '';
    selectedState = '';

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    // Fetch the Country picklist values (controlling field)
    @wire(getPicklistValues, { recordTypeId: '$accountInfo.data.defaultRecordTypeId', fieldApiName: COUNTRY_FIELD })
    wiredCountryFieldInfo({ data, error }) {
        if (data) {
            console.log('Country Picklist Data:', JSON.stringify(data));
            this.countryOptions = data.values; // Directly assign country picklist options
        } else if (error) {
            console.error('Error fetching country picklist values:', error);
        }
    }

    // Fetch the State picklist values (dependent field)
    @wire(getPicklistValues, { recordTypeId: '$accountInfo.data.defaultRecordTypeId', fieldApiName: STATE_FIELD })
    wiredStateFieldInfo({ data, error }) {
        if (data) {
            console.log('State Picklist Data:', JSON.stringify(data));
            this.stateFieldData = data; // Store the state picklist data
        } else if (error) {
            console.error('Error fetching state picklist values:', error);
        }
    }

    // Handle the Country change to filter the dependent State picklist
    handleCountryChange(event) {
        this.selectedCountry = event.target.value; // Get the selected country
        if (this.stateFieldData && this.stateFieldData.controllerValues) {
            const controllerKey = this.stateFieldData.controllerValues[this.selectedCountry]; // Map selected country to key
            this.stateOptions = this.stateFieldData.values.filter(option =>
                option.validFor.includes(controllerKey)
            ); // Filter states based on controlling country
        }
    }

    // Handle the State change
    handleStateChange(event) {
        this.selectedState = event.target.value; // Get the selected state
    }
}

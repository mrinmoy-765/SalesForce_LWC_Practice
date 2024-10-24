import { LightningElement, track } from 'lwc';
import CANDIDATE_OBJECT from '@salesforce/schema/Candidate__c';
import FIRSTNAME_FIELD from '@salesforce/schema/Candidate__c.First_Name__c';
import LASTNAME_FIELD from '@salesforce/schema/Candidate__c.Last_Name__c';
import MOBILE_FIELD from '@salesforce/schema/Candidate__c.Mobile_Number__c';
import POSTALCODE_FIELD from '@salesforce/schema/Candidate__c.Postal_Code__c';
import STRRET_FIELD from '@salesforce/schema/Candidate__c.Street__c';
import EMAIL_FIELD from '@salesforce/schema/Candidate__c.Email__c';


export default class RecordFormDemo extends LightningElement {

    @track fields = [FIRSTNAME_FIELD,  LASTNAME_FIELD, MOBILE_FIELD, POSTALCODE_FIELD, STRRET_FIELD, EMAIL_FIELD];

    objectApiName = CANDIDATE_OBJECT;
    recordId ='a04dL000000t1zaQAA';
}
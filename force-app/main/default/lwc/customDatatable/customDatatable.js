import { LightningElement, api, track, wire  } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getColumns from '@salesforce/apex/CustomDatatableUtil.convertFieldSetToColumns';
import getRecords from '@salesforce/apex/CustomDatatableUtil.getRecordsWithFieldSet';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { deleteRecord, updateRecord } from 'lightning/uiRecordApi';

export default class CustomDatatable extends NavigationMixin(LightningElement) {

}
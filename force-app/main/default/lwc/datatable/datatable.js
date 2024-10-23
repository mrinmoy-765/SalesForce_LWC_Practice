import { LightningElement,track,wire } from 'lwc';
import getDetails from '@salesforce/apex/getDetails.getAccountRecords';

export default class Datatable extends LightningElement {
    @track columns = [
    {label: 'Name', fieldName: 'Name', type: 'Name', sortable: true, editable: true},
    {label: 'Owner', fieldName: 'OwnerId', type: 'Lookup', sortable: true },
    {label: 'Phone', fieldName: 'Phone', type: 'Phone',editable: true },
    {label: 'Website', fieldName: 'Website', type: 'URL',editable: true },
    {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'Currency', sortable: true, editable: true}
];



    records;
    error;
    searchKey='';
    refreshTable;

    @wire(getDetails,{filterVal:'$searchKey'}) getRecordData(result){
        this.refreshTable = result;
        if(result.data){
            this.records = result.data;
            this.error = undefined;
            console.log('records///'+this.records);
        }else if(result.error){
            this.error = result.error;
            this.records = undefined;
            console.log('error///'+this.error);
        }
    }
}
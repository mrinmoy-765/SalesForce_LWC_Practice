import { LightningElement,wire } from 'lwc';
import getDatainLDT from '@salesforce/apex/learnLDTController.conList';
const columns = [
    {label : 'Contact Name', fieldName: 'Name'},
    {label : 'Contact Phone No', fieldName: 'Phone'},
    {label : 'Contact Email', fieldName: 'Email'}

];
export default class LightningDataTableLearn extends LightningElement {
    columnList = this.columns;
    dataList = [];
@wire(getDatainLDT)
wiredData({error,data}){
    if(data){
        this.dataList =data;
        console.log(data);
    }else if(error){
        console.error('Error:',error);
    }
}

}
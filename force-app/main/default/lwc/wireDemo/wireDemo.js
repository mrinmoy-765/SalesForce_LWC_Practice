import { LightningElement, wire, track } from 'lwc';
import getCandidateList from '@salesforce/apex/wireDemo.getCandidateList';

const columns = [
    {label:'First Name', fieldName:"First_Name__c"},
    {label: "Candidate ID" , fieldName: 'Id'},
]

export default class WireDemo extends LightningElement {

    @track columns = columns;
    @track data = [];


    @wire(getCandidateList)
    wiredCandidates({data, error}){
        if(data){
             this.data = data;
        }else if(error){
            console.log("error occured");
        }
    }
}
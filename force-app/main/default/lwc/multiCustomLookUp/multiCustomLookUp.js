import { LightningElement, wire, api } from 'lwc';
import fetchLookUpData from "@salesforce/apex/customLookUpController.fetchLookUpData";
import {ShowToastEvent} from "lightning/platformShowToastEvent";
const DELAY = 300; //miliseconds
export default class MultiCustomLookUp extends LightningElement {
    searchKey;
    @api objectApiName = "Account";
    @api label = 'Account';
    @api placeholder = "Search Account";
    @api iconName= "standard:account";
    hasRecords = false;
    searchOutput = [];
    selectedRecords = [];
    delayTimeout;
    @wire(fetchLookUpData,{
        searchKey : "$searchKey",
        objectApiName: "$objectApiName"
    }) searchResult({data,error}){
        if(data){
            console.log(data)
            this.hasRecords = data.length  >  0 ? true : false;
            this.searchOutput = data;
        }else if(error){
            console.log(error)
        }
    }

    changeHandler(event){
        clearTimeout(this.delayTimeout)
        let value = event.target.value;
        this.delayTimeout = setTimeout(() =>{
            this.searchKey = value;
        },DELAY)
    }

    clickHandler(event){
        let recId = event.target.getAttribute("data-recid");
        console.log('recId', recId);
        if(this.validateDuplicate(recId)){
            let selectedRecord = this.searchOutput.find(
            (currItem) => currItem.Id === recId
        );
        let pill = {
            type: 'icon',
            label: 'selectedRecord.Name',
            name: recId,
            iconName: this.iconName,
            alternativeText: selectedRecord.Name
        };
        this.selectedRecords = [...this.selectedRecords,pill];
        }
        
    }

    
    handleItemRemove(event){
        const index = event.detail.index;
        this.selectedRecords.splice(index, 1);
    }


    get showPillContainer(){
        return this.selectedRecords.length > 0 ? true : false;
    }

    validateDuplicate(selectedRecord){
        let isValid = true;
        let isRecordAlreadySelected = this.selectedRecords.find(currItem => currItem.name === selectedRecord)
        if(isRecordAlreadySelected){
            isValid = false;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error',
                message: 'Pill is already selected',
                variamt: 'error'
            }))
        }else{
            isValid = true;
        }
        return isValid;
    }
}
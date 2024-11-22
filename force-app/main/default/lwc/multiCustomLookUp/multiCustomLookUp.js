import { LightningElement, api, wire } from 'lwc';
import fetchLookupdata from "@salesforce/apex/customLookupController.fetchLookupData";
import {ShowToastEvent} from "lightning/platformShowToastEvent";
const  DELAY = 3000;

export default class MultiCustomLookup extends LightningElement {
    searchKey;
    @api objectApiName = "Account";
    hasRecords = false;
    searchOutput = [];
    selectedRecords = [];
    @api label = "Account";
    @api placeholder = "Search Account";




    @wire(fetchLookupdata,{
        searchKey: "$searchKey",
        objectApiName : "$objectApiName"
    })searchResult({data,error}){
        if(data){
            console.log(data)
            this.hasRecords = data.length > 0 ? true : false;
            this.searchOutput = data;
        }else if(error){
            console.log(error);
        }
    }

    changeHandler(event){
        clearTimeout(this.clearTimeout);
      let value = event.target.value;
      this.delayTimeout = setTimeout(()=>{
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
        let pill =  {
            type: "icon",
            label: selectedRecord.Name,
            name: recId,
            iconName: this.iconName,
            alternativeText: selectedRecord.Name,
        };
        this.selectedRecords = [...this.selectedRecords,pill];
        }
        
    }

    handleItemremove(event){
        const index = event.detail.index;
        this.items.splice(index, 1);
    }

    get showPillContainer(){
        return this.selectedRecords.length > 0 ? true : false;
    }

    validateDuplicate(selectedRecord){
        let isValid = true;
        let isRecordAlreadySelected = this.selectedRecords.find((currItem) => currItem.name === selectedRecord)
            
        if(isRecordAlreadySelected){
            isValid = false;
            this.dispatchEvent(new ShowToastEvent({
                title: 'Error!',
                message : 'Pill is Already Selected',
                variant: 'error'
            }));
        }else{
            isValid = true;
        }
        return isValid;
    }
}
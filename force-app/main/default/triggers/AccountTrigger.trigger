trigger AccountTrigger on Account (before insert, after insert, before update, after update, before delete, after undelete) {
         //Trigger.new returns all the value present in the sObject field
         system.debug('trigger called'+Trigger.new);
         
    if(Trigger.isInsert){ //trigger will call due to insert operation
        if(Trigger.isBefore){
         //  AccountTriggerHandler.updateAccountNumberField(Trigger.new); 
        }else if(Trigger.isAfter){
           AccountTriggerHandler.createRelatedContact(Trigger.new);
        }
    }
         
    if(Trigger.isUpdate){
        if(Trigger.isBefore){
            AccountTriggerHandler.updateAccNumber(Trigger.oldMap,Trigger.new); 
        }else if(Trigger.isAfter){
            AccountTriggerHandler.updateRelatedContactPhone(Trigger.oldMap,Trigger.new);
        }
    }
    
    if(Trigger.isDelete){
        if(Trigger.isBefore){
            AccountTriggerHandler.preventAccountDeletion(Trigger.old);
        }
    }
    
    if(Trigger.isUndelete){
        AccountTriggerHandler.updateundeletedAccount(Trigger.new);
    }
    
        
}
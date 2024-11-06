public with sharing class toDoAppController {
    @AuraEnabled(cacheable=true)
    public static  List<Task_Manager__c> loadAllIncompleteRecords(){
        return [SELECT Id, Name, Task_Date__c, from Task_Manager__c WHERE  ownerId = :userInfo.getUserId()
        AND Is_Completed__c = False WITH USER_MODE ORDER BY Task_Date__c];
    }


     @AuraEnabled(cacheable=true)
    public static  List<Task_Manager__c> loadAllIncompleteRecords(){
        return [SELECT Id, Name, Task_Date__c, from Task_Manager__c WHERE  ownerId = :userInfo.getUserId()
        AND Is_Completed__c = False WITH USER_MODE ORDER BY Completed_Date__c DESC];
    }
}
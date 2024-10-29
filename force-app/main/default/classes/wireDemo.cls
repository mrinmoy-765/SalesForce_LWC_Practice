public with sharing class wireDemo {

   @auraEnabled(cacheable=true)
   public static List<Candidate__c> getCandidateList(){
       
    List<Candidate__c> candidateDetails = [Select Id, First_Name__c from Candidate__c];
    system.debug('candidatedetails'+candidateDetails);
    return candidateDetails;

   }
}
public with sharing class getDetails {
    @AuraEnabled(cacheable = true)
    public static List<account> getAccountRecords(String filterVal){
        String key = '%'+filterVal+'%';
        List<Account> accList = [select Id,Name,Owner.Name,OwnerId,Phone,Website,AnnualRevenue from Account where name like : key];
        system.debug('accList///'+accList);
        return accList;
    }
}
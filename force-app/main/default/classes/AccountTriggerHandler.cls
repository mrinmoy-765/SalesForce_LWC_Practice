public class AccountTriggerHandler {
    public static void updateAccountNumberField(List<Account> newAccList){
        
        system.debug('newAccList'+newAccList); 
        
        for(Account acc : newAccList){
        system.debug('Industry:'+acc.Industry);
        system.debug('isAvailable'+acc.isAvailable__c);
        
        if(acc.Industry !=null && acc.isAvailable__c == true){
            acc.AccountNumber = '1234';
        }else{
            acc.AccountNumber = '0000';
        }
    } 
    }
    
    public static void createRelatedContact(List<Account> newAccCountList){
        List<Contact> conList = new List <Contact>();
        
        for(Account acc : newAccCountList){
            contact conObj = new Contact();
            conObj.AccountId = acc.Id;
            conObj.LastName = acc.Name;
            conList.add(conObj);
        }
        
        if(!conList.isEmpty()){
            insert conList;
        }
    }
    
    public static void updateAccNumber(Map<Id,Account> oldAccountMap,List<Account> newAccountList){
        for(Account acc: newAccountList){
            if(oldAccountMap != null && acc.Industry != oldAccountMap.get(acc.Id).Industry 
               && acc.isAvailable__c == true){
                acc.AccountNumber = '1020';
                    }else{
                        acc.AccountNumber = '3040';
                    }
        }
        
    }
    
    public static void updateRelatedContactPhone(Map<Id,Account> oldAccountMap, List<Account>newAccountList){
        
        Map<Id,Account> accountMap = new Map<Id, Account>();
        List<Contact> contactList = new List<Contact>();
        
        for(Account acc : newAccountList){
            if(oldAccountMap != null && acc.phone != oldAccountMap.get(acc.Id).phone && acc.rating == 'Hot'){
                 accountMap.put(acc.Id,acc);
                
            }
        }
        List<Contact> conlist = [ Select Id, Name, AccountId from Contact 
                                 Where AccountId IN : accountMap.keySet()];
        for(Contact con: conList) {
            Contact conObj = new Contact();
            if(accountMap.containsKey(con.AccountId)){
                conObj.Phone = accountMap.get(con.AccountId).Phone;
                conObj.Id = con.Id;
                contactList.add(conObj);
            }
        }
        if(!contactList.isEmpty()){
            update contactList;
        }
    }
    
    public static void preventAccountDeletion(List<Account> oldAccountList){
          for(Account acc : oldAccountList){
             if(acc.isAvailable__c == true && acc.Phone != null){
                 acc.addError('Account can not be deleted');
            }
        }
    }
    
    public static void updateundeletedAccount(List<Account> newAccList){
        system.debug('newAccList'+newAccList);
        
        List<Account> accList = new List<Account>();
        
        for(Account acc : newAccList){
            Account accobj = new Account();
            accobj.Id = acc.Id;
            accobj.isAvailable__c = true;
            accList.add(accobj);
        }
        if(!accList.isEmpty()){
            system.debug('accList:'+accList);
             update accList;
        }
    }
}
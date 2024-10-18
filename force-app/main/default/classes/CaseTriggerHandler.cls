public class CaseTriggerHandler {
         public static Map<String, String> findTheContactNumber(Set<Id> conIds)
         {
             Map<String, String> cotactIdWithContactNumberMap = new Map<String, String>();
             List<Contact> conList = new List<Contact>();
             conList = [Select id, phone, name from Contact where Id IN: conIds];
             
             for(Contact con : conList)
             {
              cotactIdWithContactNumberMap.put(con.Id, con.phone);   
             }
             return cotactIdWithContactNumberMap;
         }
    
    public static void UpdateContactInfoInCase(Boolean isBefore, Boolean isInsert, Boolean isUpdate, List<Case> newCases)
    {
        Set<id> conIds = new Set<Id>();
        Map<String, String> cotactIdWithContactNumberMap = new Map<String, String>();
        
        if(isBefore == true)
        {
            if(isInsert == true || isUpdate == true)
            {
                for(Case c: newCases)
                {
                    conIds.add(c.contactId);
                }
                cotactIdWithContactNumberMap = findTheContactNumber(conIds);
                System.debug('--cotactIdWithContactNumberMap--'+cotactIdWithContactNumberMap);
                for(Case c: newCases)
                {
                    c.Contact_Info__c = cotactIdWithContactNumberMap.get(c.ContactId);
                }
            }
        }
    }
}
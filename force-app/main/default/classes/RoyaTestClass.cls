public with sharing class AccountRelatedContactController {

    public class ContactWrapper{

        @AuraEnabled
        public String accConRelationshipId {get; set;}

        @AuraEnabled
        public String contactId {get; set;}

        @AuraEnabled
        public String contactName {get; set;}

        @AuraEnabled
        public String contactEmail {get; set;}

        @AuraEnabled
        public String contactRole {get; set;}

        @AuraEnabled
        public String contactBevPortalUserId {get; set;}
        
        @AuraEnabled
        public String contactPhone {get; set;}

        @AuraEnabled
        public String contactType {get; set;}

        @AuraEnabled
        public boolean isEmailBounced {get; set;}

        @AuraEnabled
        public String emailBouncedReason  {get; set;}

        @AuraEnabled
        public String  contactStatus {get; set;}

    }

    @AuraEnabled(cacheable=true)
    public static List<ContactWrapper> getRelatedContacts(String accountId) {

        Set<Id> uniqueContactIds = new Set<Id>(); 

        List<ContactWrapper> uniqueContacts = new List<ContactWrapper>();

        List<AccountContactRelation> acrList = [
            SELECT Id, AccountId, ContactId, Contact.Name, Contact.Email, Roles, 
            Contact.Bev_Portal_User_ID__c, Contact.Phone, Contact.Status__c, 
            Contact.Contact_Type1_del__c, Contact.isEmailBounced, Contact.emailBouncedReason
            FROM AccountContactRelation 
            WHERE AccountId =: accountId 
            ORDER BY Contact.Name
        ];

        for (AccountContactRelation acr : acrList) {
            if (acr.ContactId != null && !uniqueContactIds.contains(acr.ContactId)) {

                uniqueContactIds.add(acr.ContactId);

                ContactWrapper wrapper = new ContactWrapper();
                    wrapper.accConRelationshipId = acr.Id;
                    wrapper.contactId = acr.ContactId;
                    wrapper.contactName = acr.Contact.Name;
                    wrapper.contactEmail = acr.Contact.Email;
                    wrapper.contactRole = acr.Roles;
                    wrapper.contactBevPortalUserId = acr.Contact.Bev_Portal_User_ID__c;
                    wrapper.contactPhone = acr.Contact.Phone;
                    wrapper.contactStatus = acr.Contact.Status__c;
                    wrapper.contactType = acr.Contact.Contact_Type1_del__c;
                    wrapper.isEmailBounced = acr.Contact.isEmailBounced;
                    wrapper.emailBouncedReason = acr.Contact.emailBouncedReason;
                    uniqueContacts.add(wrapper);
            }
        }


        String accountTerritoryId = [SELECT Id, Region__c from Account WHERE Id =: accountId].Region__c;

        List<TerritoryContact__c> territoryContact = [
            SELECT Contact__c, Territory__c, Contact__r.Name, Contact__r.Email, 
            Contact__r.Bev_Portal_User_ID__c, Contact__r.Phone, Contact__r.Status__c, 
            Contact__r.Contact_Type1_del__c, Contact__r.isEmailBounced, Contact__r.emailBouncedReason 
            FROM TerritoryContact__c 
            WHERE Territory__c =: accountTerritoryId];
        
        for (TerritoryContact__c tc : territoryContact) {
            if (tc.Contact__c != null && !uniqueContactIds.contains(tc.Contact__c)) {

                uniqueContactIds.add(tc.Contact__c);

                ContactWrapper wrapper = new ContactWrapper();
                    wrapper.accConRelationshipId = null;
                    wrapper.contactId = tc.Contact__c;
                    wrapper.contactName = tc.Contact__r.Name;
                    wrapper.contactEmail = tc.Contact__r.Email;
                    wrapper.contactRole = null;
                    wrapper.contactBevPortalUserId = tc.Contact__r.Bev_Portal_User_ID__c;
                    wrapper.contactPhone = tc.Contact__r.Phone;
                    wrapper.contactStatus = tc.Contact__r.Status__c;
                    wrapper.contactType = tc.Contact__r.Contact_Type1_del__c;
                    wrapper.isEmailBounced = tc.Contact__r.isEmailBounced;
                    wrapper.emailBouncedReason = tc.Contact__r.emailBouncedReason;
                    uniqueContacts.add(wrapper);
                
            }
        }

        return uniqueContacts;
    }

}




























//final

@isTest
public class AccountRelatedContactControllerTest {

    @isTest
    static void testGetRelatedContacts() {
        
           Territories__c territory = new Territories__c(
            Code__c = 'BRUSH',
       //   FULL18ID__c = 'Smith',
           Name = 'BRUSH'
);
insert territory;

        Account testAccount = new Account(
            Name = 'Test Account',
            BillingStreet = '123 street',
            BillingCity = 'SpringField',
            BillingState = 'NY',
            BillingCountry = 'US',
            BillingPostalCode = '10001',
            TMG_Sales_Tier__c = 'A',
            payment_method__c = 'Bev Null',
            payment_Terms__c = '',
            Billing_Address_2__c = 'apt 6',
            Region__c = territory.Id
        );
        insert testAccount;

        System.debug('Account created: ' + testAccount.Id);


     Contact contact = new Contact(
            AccountId = testAccount.Id,
            lastname = 'Contact-Roya',
            firstname = 'Test',
            phone = '7727140464', 
            MobilePhone = '7727140462',
            Contact_Type1_del__c = 'Main Contact',
            Email = 'test.contact@example.com.test',
            Title = 'Contact',
            Bev_Portal_User_ID__c = '',
            status__c = 'Active',
           // IsEmailBounced = false,
            EmailBouncedReason = '');
        insert contact;
        
        
        Account testAccount2 = new Account(
            Name = 'Test Account 2',
            BillingStreet = '123 street',
            BillingCity = 'SpringField',
            BillingState = 'NY',
            BillingCountry = 'US',
            BillingPostalCode = '10001',
            TMG_Sales_Tier__c = 'A',
            payment_method__c = 'Bev Null',
            payment_Terms__c = '',
            Billing_Address_2__c = 'apt 6'
        );
        insert testAccount2;
        
        Contact contact2 = new Contact(
            AccountId = testAccount2.Id,
            lastname = 'Contact-Roya',
            firstname = 'Test22',
            phone = '7727140464', 
            MobilePhone = '7727140462',
            Contact_Type1_del__c = 'Main Contact',
            Email = 'testtt.contact@example.com.test',
            Title = 'Contact',
            Bev_Portal_User_ID__c = '',
            status__c = 'Active',
           // IsEmailBounced = false,
            EmailBouncedReason = '');
        insert contact2;
        System.debug('contactId--->'+contact.Id);
        


        List<AccountContactRelation> acr = [select id, AccountId, ContactId, Account.Name from AccountContactRelation where AccountId =: testAccount.Id];
        System.debug('arc--->'+acr);


   
        
     

        System.debug('TerritoryContact__c records created.');

   TerritoryContact__c tc1 = new TerritoryContact__c(Contact__c = contact2.Id, Territory__c = territory.Id);
      
        insert tc1;


     
		AccountRelatedContactController.getRelatedContacts(testAccount.Id);

        
    }
}
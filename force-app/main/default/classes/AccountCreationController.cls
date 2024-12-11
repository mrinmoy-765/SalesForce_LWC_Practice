public with sharing class AccountCreationController {
  @AuraEnabled
  public static Account createAccount(Account accountRecObj) {
    if (accountRecObj == null) {
      throw new AuraHandledException('Account data is required');
    }
    try {
      insert accountRecObj;
      return accountRecObj;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

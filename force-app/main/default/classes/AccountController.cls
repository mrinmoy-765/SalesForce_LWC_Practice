public with sharing class AccountController {
  public AccountController() {
  }
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    return [SELECT Id, Name, Type, Industry FROM Account LIMIT 3];
  }
}
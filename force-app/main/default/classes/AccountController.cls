public with sharing class AccountController {
  public AccountController() {
  }
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccounts() {
    return [SELECT Id, Name, Type, Industry, Phone FROM Account LIMIT 3];
  }

  @AuraEnabled
  public static List<Account> getAccountRecordList() {
    return [SELECT Id, Name, Type, Industry, Phone FROM Account LIMIT 10];
  }
}

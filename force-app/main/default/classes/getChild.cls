public class getChild {
  @AuraEnabled
  public static List<Account> getChildAccounts() {
    // Query to fetch Accounts and their Contacts
    return [
      SELECT Id, Name, (SELECT Id, Name FROM ChildAccounts)
      FROM Account
    ];
  }
}

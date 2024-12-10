public class newTreeView {
  @AuraEnabled
  public static List<Account> getChildAccounts() {
    // Query to fetch Accounts
    return [
      SELECT Id, Name
      FROM Account
    ];
  }

  @AuraEnabled
  public static List<Account> getChildAccountsByParentId(
    String parentAccountId
  ) {
    // Validate input to avoid SOQL injection
    if (String.isBlank(parentAccountId)) {
      throw new AuraHandledException('Parent Account ID cannot be blank.');
    }

    // Query to fetch child accounts
    return [
      SELECT Id, Name
      FROM Account
      WHERE ParentId = :parentAccountId
    ];
  }
}

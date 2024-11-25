// public with sharing class treeGrid {
//   @AuraEnabled
//   public static List<Account> getContactDetails() {
//     List<Account> accList = [
//       SELECT Id, Name, (SELECT Name, FirstName, LastName FROM Contacts)
//       FROM Account
//       LIMIT 5
//     ];

//     if (!accList.isEmpty()) {
//       return accList;
//     }
//     return null;
//   }
// }

public with sharing class treeGrid {
  @AuraEnabled(cacheable=true)
  public static List<Account> getContactDetails() {
    List<Account> accList = [
      SELECT Id, Name, (SELECT Id, Name, FirstName, LastName FROM Contacts)
      FROM Account
      LIMIT 10
    ];

    if (!accList.isEmpty()) {
      return accList;
    }
    return null;
  }
}

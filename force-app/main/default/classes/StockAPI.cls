public with sharing class StockAPI {
  @AuraEnabled
  public static string getStock() {
    Http http = new Http();
    HttpRequest req = new HttpRequest();
    req.setEndpoint(
      'callout:StockAPI/?function=OVERVIEW&symbol=IBM&apikey=OPHGLGZT81MNTM00'
    );
    req.setMethod('GET');
    HttpResponse res = http.send(req);
    return res.getBody();
  }
}

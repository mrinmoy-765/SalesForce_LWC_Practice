public class learnLDTController{
    @AuraEnabled(Cacheable=true)
    public static List<contact> conList(){
        return [Select id, Name, Phone, Email from Contact where AccountId = '001dL00000PviqxQAB'];
    }
}
public class hashTagFinderChooserCtrl {
    @Auraenabled
    public static List<HashTags__c> getAllHashTags(){
        return [Select id,Tag_Name__c From HashTags__c];
    }
}
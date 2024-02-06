public inherited sharing class ServiceCaseQueueService {
    @AuraEnabled(cacheable=true)
    public static List<Case> getUserCases() {
        return [    
            SELECT Id, CaseNumber, OwnerId, Status, Priority, Origin, CreatedDate
            FROM Case
            //here we should extract only cases of current user
            WITH SECURITY_ENFORCED
            ORDER BY ContactId, Priority ASC, CreatedDate DESC
            LIMIT 25
        ];
    }
}
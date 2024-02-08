public inherited sharing class ServiceCaseQueueService {
    @AuraEnabled(cacheable=true)
    public static List<Case> getUserCases() {
        return [    
            SELECT Id, CaseNumber, OwnerId, Owner.FirstName, Owner.LastName, Status, Priority, Origin, CreatedDate
            FROM Case
            //here we should extract only cases of current user
            WITH SECURITY_ENFORCED
            ORDER BY OwnerId, Priority ASC, CreatedDate DESC
            LIMIT 25
        ];
    }
}
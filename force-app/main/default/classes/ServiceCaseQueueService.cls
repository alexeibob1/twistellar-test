public inherited sharing class ServiceCaseQueueService {
    private static final Integer QUERY_LIMIT = 25;

    @AuraEnabled(cacheable=true)
    public static List<Case> getUserCases() {
        String currentUserId = UserInfo.getUserId();
        List<Case> currentUserCases = [    
            SELECT Id, CaseNumber, OwnerId, Owner.FirstName, Owner.LastName, Status, Priority, Origin, CreatedDate
            FROM Case
            WHERE OwnerId = :currentUserId
            WITH SECURITY_ENFORCED
            ORDER BY OwnerId ASC, Priority ASC, CreatedDate DESC
            LIMIT :QUERY_LIMIT
        ];

        Integer casesRemainder = QUERY_LIMIT - currentUserCases.size();
        List<Case> othersUserCases = [    
            SELECT Id, CaseNumber, OwnerId, Owner.FirstName, Owner.LastName, Status, Priority, Origin, CreatedDate
            FROM Case
            WHERE Id IN (
                SELECT CaseId
                FROM CaseShare
                WHERE UserOrGroupId = :currentUserId
            ) AND OwnerId != :currentUserId
            WITH SECURITY_ENFORCED
            ORDER BY OwnerId ASC, Priority ASC, CreatedDate DESC
            LIMIT :caseRemainder
        ];

        currentUserCases.addAll(othersUserCases);
        return currentUserCases;
    }
}